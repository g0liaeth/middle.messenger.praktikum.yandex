import Button from '../../components/Button/Button';
import Dialog from '../../components/Dialog/Dialog';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Link from '../../components/Link/Link';
import Message from '../../components/Message/Message';
import NewMessageForm from '../../components/NewMessageForm/NewMessageForm';
import Text from '../../components/Text/Text';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import readedMessageImg from '../../static/check2-all.svg';
import newMessageImg from '../../static/check2.svg';
import avatarImg from '../../static/mock-ava.png';
import attachBtnImg from '../../static/paperclip-solid.svg';
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import connect from '../../utils/Store/connect';
import ChatController from './ChatController';

class Chat<T extends BasePropsType> extends Block<T> {
  protected _chatController: ChatController;

  constructor(props: T) {
    super(props);
    this._chatController = new ChatController();
    // this._chatController.fetchUser();
    this._chatController.getChats();
    // console.log(this._chatController.getState());
  }

  componentDidMount(): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
    document.addEventListener('DOMContentLoaded', () => {
      const mainContainer = document.querySelector('.main-container') as HTMLElement;
      mainContainer.classList.remove('main-container');
      mainContainer.classList.add('new-main-container');
    });
    // console.log(this.props);
  }

  render() {
    // console.log('render chats');
    const chatController = this._chatController;
    const source = `
    <main class="chat-wrapper">
      <div class="left-container">
        <div class="profile-link-container">
          {{{ newChatForm }}}
          {{{ profileLink }}}
        </div>
        <div class="search-container">
          {{{ searchInput }}}
        </div>
        <div class="chat-list-container">
          <ul class="chat-list">
            {{{ dialogsList }}}
          </ul>
        </div>
      </div>
      <div class="right-container">
        <div class="chat-header">
          <div class="chat-header-left">
            {{{ currentUserAvatar }}}
            {{{ currentUserName }}}
          </div>
          <div class="chat-header-right">
            {{{ chatMenu }}}
          </div>
        </div>
        <div class="chat-body">
          <div class="message-list">
            {{{ messagesList }}}
          </div>
        </div>
        <div class="chat-footer">
          {{{ newMessageForm }}}
        </div>
      </div>
    </main>
    `;

    const newChatTitle = new Input({
      className: 'new-chat-title',
      inputType: 'text',
      inputId: 'new_chat_title',
      inputName: 'new_chat_title',
      inputPlaceholder: 'Заголовок чата...',
    });

    const addChatBtn = new Button({
      className: 'btn-add-chat',
      label: 'создать',
      type: 'submit',
    });

    const newChatForm = new Form({
      formItems: [newChatTitle, addChatBtn],
      className: 'new-chat-form',
      events: {
        submit(event) {
          event.preventDefault();
          const target = event.target as HTMLFormElement;
          const data = new FormData(target);
          if (!data.get('new_chat_title')) {
            return;
          }
          chatController.createChat(data.get('new_chat_title') as string);
          target.reset();
        },
      },
    });

    const profileLink = new Link({
      className: 'profile-link',
      path: 'profile',
      text: 'Профиль >',
    });

    const searchInput = new Input({
      className: 'search-textinput',
      inputType: 'text',
      inputPlaceholder: 'Поиск',
      inputName: 'search',
      inputId: 'search',
    });

    const currentUserAvatar = new UserAvatar({
      imgPath: avatarImg,
    });

    const currentUserName = new Text({
      className: 'avatar-name',
      value: 'Вадим',
    });

    const chatMenu = new Button({
      className: 'btn-menu',
      label: '',
      type: 'button',
    });

    const newMessageForm = new NewMessageForm({ attachBtnImg });

    const dialogsList: Dialog[] = [];
    this.props.chatsList.forEach((chat) => {
      dialogsList.push(
        new Dialog({
          hasNewMessages: chat.unread_count > 0,
          lastMessageSender: true,
          senderUserName: chat.title,
          lastMessageText: chat.last_message?.content,
          lastMessageTime: chat.last_message?.time,
          newMessagesCount: chat.unread_count,
          dialogAvatar: new UserAvatar({
            imgPath: chat.avatar,
          }),
        }),
      );
    });

    const messagesList: Message[] = [];
    // for (let i = 0; i < 5; i++) {
    //   messagesList.push(
    //     new Message({
    //       className: 'incoming-message',
    //       readed: true,
    //       sendTime: '15:47',
    //       readMarkImg: readedMessageImg,
    //       text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque tenetur qui laudantium autem omnis. Quod ex omnis, totam impedit tempore cupiditate laboriosam fugit, minima commodi assumenda excepturi inventore eaque exercitationem! Possimus voluptates numquam dignissimos natus atque vero iure sed ut adipisci eligendi! Voluptas quas vel quos, amet nemo omnis sit, recusandae iusto laudantium minus iure porro assumenda praesentium saepe ipsa!',
    //     }),
    //   );
    // }
    // messagesList.push(
    //   new Message({
    //     className: 'outgoing-message',
    //     readed: false,
    //     sendTime: '12:00',
    //     text: 'Круто!!!',
    //     readMarkImg: newMessageImg,
    //   }),
    // );

    return compileComponent(source, {
      ...this.props,
      profileLink,
      searchInput,
      currentUserAvatar,
      currentUserName,
      chatMenu,
      newMessageForm,
      dialogsList,
      messagesList,
      newChatForm,
      // addChatBtn,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    chatsList: state.chatState.chats,
  };
}

export default connect<BasePropsType>(mapStateToProps)(Chat);
