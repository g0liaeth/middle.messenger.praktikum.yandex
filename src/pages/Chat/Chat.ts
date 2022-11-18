import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Dialog from '../../components/Dialog/Dialog';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Link from '../../components/Link/Link';
import Message from '../../components/Message/Message';
import FormGroup from '../../components/FormGroup/FormGroup';
import Text from '../../components/Text/Text';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import readedMessageImg from '../../static/check2-all.svg';
import newMessageImg from '../../static/check2.svg';
import avatarImg from '../../static/mock-ava.png';
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import connect from '../../utils/Store/connect';
import Validator from '../../utils/Validator';
import ChatController from './ChatController';
import Dropdown from '../../components/Dropdown/Dropdown';
import ListItem from '../../components/ListItem/ListItem';

class Chat<T extends BasePropsType> extends Block<T> {
  protected _chatController: ChatController;
  private _events = {};

  constructor(props: T) {
    super(props);
    this._chatController = new ChatController();
    // this._chatController.fetchUser();
    this._chatController.getChats();
    // console.log(this._chatController.getState());
    this._events = {
      blur: this._onFocusChange.bind(this),
      focus: this._onFocusChange.bind(this),
    };
  }

  componentDidMount(): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
    document.addEventListener('DOMContentLoaded', () => {
      const mainContainer = document.querySelector('.main-container') as HTMLElement;
      mainContainer.classList.remove('main-container');
      mainContainer.classList.add('new-main-container');
    });
    console.log(this.props);
  }

  private _onFocusChange(event: Event) {
    const validator = new Validator();
    const input = event.target as HTMLInputElement;
    const errors = validator.validateInput(input);

    const errorMessage = document.querySelector(`#${input.getAttribute('id')}-error`);

    if (!errorMessage) {
      throw new Error('Нет спана для ошибки');
    }

    if (errors.length !== 0) {
      errorMessage.textContent = errors.join('/n');
      input.classList.add('invalid');
    } else {
      errorMessage.textContent = '';
      input.classList.remove('invalid');
    }
  }

  render() {
    // console.log('render chats');
    const chatController = this._chatController;
    const self = this;
    const source = `
    <main class="chat-wrapper">
      <div class="left-container">
        <div class="profile-link-container">
          {{{ newChatForm }}}
          {{{ profileLink }}}
        </div>
        <div class="search-container">
          {{{ searchInput }}}
          {{{ searchResults }}}
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
      events: {
        // focus: (event) => {
        //   const sourceElRect = event?.target?.getBoundingClientRect();
        //   const dropdownEl = document.getElementById('dropdown');
        //   dropdownEl!.classList.add('dropdown-active');
        //   dropdownEl!.style.top = `${sourceElRect.bottom}px`;
        //   dropdownEl!.style.left = `${sourceElRect.left}px`;
        // },
        keypress(event) {
          if (event.which === 13) {
            event.preventDefault();
            // const sourceElRect = event?.target?.getBoundingClientRect();
            // const dropdownEl = document.getElementById('dropdown');
            // dropdownEl!.classList.add('dropdown-active');
            // dropdownEl!.style.top = `${sourceElRect.bottom}px`;
            // dropdownEl!.style.left = `${sourceElRect.left}px`;
            chatController.findUsers(event.target.value);
          }
        },
      },
    });

    // const mockData = [
    //   {
    //     id: 123,
    //     first_name: 'Petya',
    //     second_name: 'Pupkin',
    //     display_name: 'Petya Pupkin',
    //     login: 'Petya Login',
    //     email: 'my@email.com',
    //     phone: '89223332211',
    //     avatar: '/path/to/avatar.jpg',
    //   },
    //   {
    //     id: 124,
    //     first_name: 'Vasya',
    //     second_name: 'Pupkin',
    //     display_name: 'Petya Pupkin',
    //     login: 'Vasya Login',
    //     email: 'my@email.com',
    //     phone: '89223332211',
    //     avatar: '/path/to/avatar.jpg',
    //   },
    // ];

    const searchResults = new Dropdown({
      className: this.props.findedUsers.length > 0 ? 'dropdown-active' : '',
      listItems: this.props.findedUsers.map(
        (item) =>
          new ListItem({
            id: item.id,
            className: 'dropdown-list-item',
            content: item.login,
            events: {
              click(event) {
                // console.log(event.target.parentNode);
                // const dropdown = document.getElementById('dropdown');
                // dropdown!.style.display = 'none';
                chatController.addUser(event.target.id);
                chatController.clearFindedUsers();
                // console.log(event.target.id);
              },
            },
          }),
      ),
    });

    const currentChatAvatar = new UserAvatar({
      imgPath: this.props?.chatsList.find((chat) => chat.id === this.props.currentChat)?.avatar,
    });

    const currentChatTitle = new Text({
      className: 'avatar-name',
      value: this.props?.chatsList.find((chat) => chat.id === this.props.currentChat)?.title,
    });

    const chatMenu = new Button({
      className: 'btn-menu',
      type: 'button',
    });

    const messageInput = new Input({
      className: 'new-message-textinput',
      inputType: 'text',
      inputId: 'message',
      inputName: 'message',
      inputPlaceholder: 'Сообщение...',
      events: this._events,
    });

    const newMessageInput = new FormGroup({
      className: 'form-group-new-message',
      input: messageInput,
    });

    const attachFileBtn = new Button({
      className: 'btn-attach-file',
      type: 'button',
    });

    const sendMessageBtn = new Button({
      className: 'btn-black',
      label: 'Отправить',
      type: 'submit',
    });

    const btnsBlock = new Container({
      className: 'send-message-container',
      items: [attachFileBtn, sendMessageBtn],
    });

    const newMessageForm = new Form({
      className: 'form-new-message',
      formItems: [newMessageInput, btnsBlock],
      events: {
        submit(event) {
          event.preventDefault();
          console.log(event.target);
        },
      },
    });

    const dialogsList: Dialog[] = [];
    this.props.chatsList.forEach((chat) => {
      dialogsList.push(
        new Dialog({
          className: this.props.currentChat === chat.id ? 'active' : '',
          id: chat.id,
          hasNewMessages: chat.unread_count > 0,
          lastMessageSender: true,
          senderUserName: chat.title,
          lastMessageText: chat.last_message?.content,
          lastMessageTime: chat.last_message?.time,
          newMessagesCount: chat.unread_count,
          dialogAvatar: new UserAvatar({
            imgPath: chat.avatar,
          }),
          events: {
            click(event) {
              chatController.setCurrentChat(Number(event.currentTarget?.id));
            },
          },
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
      currentUserAvatar: currentChatAvatar,
      currentUserName: currentChatTitle,
      chatMenu,
      newMessageForm,
      dialogsList,
      messagesList,
      newChatForm,
      searchResults,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    chatsList: state.chatState.chats,
    currentChat: state.chatState.currentChat,
    findedUsers: state.chatState.findedUsers,
  };
}

export default connect<BasePropsType>(mapStateToProps)(Chat);
