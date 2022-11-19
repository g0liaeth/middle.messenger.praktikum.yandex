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
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import connect from '../../utils/Store/connect';
import Validator from '../../utils/Validator';
import ChatController from './ChatController';
import Dropdown from '../../components/Dropdown/Dropdown';
import ListItem from '../../components/ListItem/ListItem';
import { UPLOAD_URL } from '../../constants/apiConstants';
import { UserData, wsMessageType } from '../../types/commonTypes';

class Chat<T extends BasePropsType> extends Block<T> {
  protected _chatController: ChatController;
  private _events = {};

  constructor(props: T) {
    super(props);
    this._chatController = new ChatController();
    this._chatController.fetchUser();
    this._chatController.getChats();
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
            {{{ currentChatAvatar }}}
            {{{ currentChatTitle }}}
          </div>
          <div class="chat-header-right">
            {{{ deleteUserForm }}}
            {{{ deleteChatBtn }}}
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

    const deleteUserLogin = new Input({
      className: 'delete-user-login',
      inputType: 'text',
      inputId: 'delete_user_login',
      inputName: 'delete_user_login',
      inputPlaceholder: 'Логин пользователя',
    });

    const deleteUserBtn = new Button({
      className: 'btn-delete-user',
      label: 'Удалить',
      type: 'submit',
    });

    const deleteUserForm = new Form({
      className: 'delete-user-form',
      formItems: [deleteUserLogin, deleteUserBtn],
      events: {
        submit(event) {
          event.preventDefault();
          const target = event.target as HTMLFormElement;
          const data = new FormData(target);
          if (!data.get('delete_user_login')) {
            return;
          }
          chatController.deleteUser(data.get('delete_user_login') as string);
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
        keypress(event) {
          //@ts-expect-error problem typing event
          if (event.which === 13) {
            event.preventDefault();
            //@ts-expect-error problem typing event
            chatController.findUsers(event?.target?.value);
          }
        },
      },
    });
    const searchResults = new Dropdown({
      //@ts-expect-error problem typing props from HOC
      className: this.props.findedUsers.length > 0 ? 'dropdown-active' : '',
      //@ts-expect-error problem typing props from HOC
      listItems: this.props.findedUsers.map(
        (item: UserData) =>
          new ListItem({
            id: item.id,
            className: 'dropdown-list-item',
            content: item.login,
            events: {
              click(event) {
                //@ts-expect-error problem typing event click on <div>
                chatController.addUser(event?.target?.id);
                chatController.clearFindedUsers();
              },
            },
          }),
      ),
    });

    const currentChatAvatar = new UserAvatar({
      imgPath:
        // @ts-expect-error problem typing props from HOC
        this.props?.chatsList.find((chat) => chat.id === this.props.currentChat)?.avatar &&
        UPLOAD_URL +
          // @ts-expect-error problem typing props from HOC
          this.props?.chatsList.find((chat) => chat.id === this.props.currentChat)?.avatar,
    });

    const currentChatTitle = new Text({
      className: 'avatar-name',
      //@ts-expect-error problem typing props from HOC
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
          const target = event.target as HTMLFormElement;
          const data = new FormData(target);
          if (!data.get('message')) {
            return;
          }
          chatController.sendMessage(data.get('message') as string);
          chatController.getChats();
          target.reset();
        },
      },
    });

    const dialogsList: Dialog[] = [];
    //@ts-expect-error problem typing props from HOC
    this.props.chatsList.forEach((chat) => {
      const msgTime = new Date(chat.last_message?.time);
      const hours = msgTime.getHours();
      const minutes = msgTime.getMinutes();
      const timeStr = hours || minutes ? `${hours}:${minutes}` : '';
      dialogsList.push(
        new Dialog({
          //@ts-expect-error problem typing props from HOC
          className: this.props.currentChat === chat.id ? 'active' : '',
          id: chat.id,
          hasNewMessages: chat.unread_count > 0,
          lastMessageSender: true,
          senderUserName: chat.title,
          lastMessageText: chat.last_message?.content,
          lastMessageTime: timeStr,
          newMessagesCount: chat.unread_count,
          dialogAvatar: new UserAvatar({
            imgPath: chat.avatar && UPLOAD_URL + chat.avatar,
          }),
          events: {
            click(event) {
              //@ts-expect-error problem typing props from HOC
              const selectedChat = Number(event.currentTarget?.id);
              chatController.setCurrentChat(selectedChat);
              chatController.connectToChat(selectedChat);
            },
          },
        }),
      );
    });

    //@ts-expect-error problem typing props from HOC
    const messagesList: Message[] = this.props.messages
      //@ts-expect-error problem typing props from HOC
      .filter((msg: wsMessageType) => msg.chat_id === this.props.currentChat)
      .map((msg: wsMessageType) => {
        const msgTime = new Date(msg.time);
        const timeStr = `${msgTime.getHours()}:${msgTime.getMinutes()}`;
        const msgClass =
          //@ts-expect-error problem typing props from HOC
          this.props.currentUser === msg.user_id ? 'outgoing-message' : 'incoming-message';
        return new Message({
          className: msgClass,
          readed: false,
          sendTime: timeStr,
          readMarkImg: '',
          text: msg.content,
        });
      });

    const onDeleteButtonClick = (event: Event) => {
      chatController.deleteChat(this.props.currentChat);
    };

    const deleteChatBtn = new Button({
      label: 'Удалить чат',
      type: 'button',
      events: {
        click: onDeleteButtonClick,
      },
    });

    return compileComponent(source, {
      ...this.props,
      profileLink,
      searchInput,
      currentChatAvatar,
      currentChatTitle,
      chatMenu,
      newMessageForm,
      dialogsList,
      messagesList,
      newChatForm,
      searchResults,
      deleteUserForm,
      deleteChatBtn,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    chatsList: state.chatState.chats,
    currentChat: state.chatState.currentChat,
    messages: state.chatState.messages,
    findedUsers: state.chatState.findedUsers,
    currentUser: state.profileState.user.id,
  };
}

export default connect<BasePropsType>(mapStateToProps)(Chat);
