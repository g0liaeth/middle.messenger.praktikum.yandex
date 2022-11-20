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
import ListItem from '../../components/ListItem/ListItem';
import { UPLOAD_URL } from '../../constants/apiConstants';
import { UserData, wsMessageType } from '../../types/commonTypes';
import Popup from '../../components/Popup/Popup';
import Label from '../../components/Label/Label';
import List from '../../components/List/List';

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
    // console.log(this.props);
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
          {{{ profileLink }}}
        </div>
        <div class="search-container">
          {{{ newChatForm }}}
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
      {{{ chatMenuContainer }}}
      {{{ newUserPopup }}}
      {{{ deleteUserPopup }}}
      {{{ uploadChatAvatarPopup }}}
    </main>
    `;

    const newChatTitle = new Input({
      className: 'new-chat-input',
      inputType: 'text',
      inputId: 'new_chat_title',
      inputName: 'new_chat_title',
    });

    const addChatBtn = new Button({
      className: 'btn-add-chat',
      label: '',
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

    const deleteChatTitle = new Text({
      className: 'chat-menu-item-title',
      value: 'Удалить чат',
    });

    const onDeleteButtonClick = () => {
      const menu = document.getElementById('chat_menu_container');
      menu?.classList.remove('active');
      //@ts-expect-error problem typing props from HOC
      chatController.deleteChat(this.props.currentChat);
    };

    const deleteChatBtn = new Button({
      className: 'delete-chat-btn',
      type: 'button',
      events: {
        click: onDeleteButtonClick,
      },
    });

    const deleteChatItem = new Container({
      className: 'chat-menu-item',
      items: [deleteChatTitle, deleteChatBtn],
    });

    const addUserTitle = new Text({
      className: 'chat-menu-item-title',
      value: 'Добавить пользователя',
    });

    const onAddUserButtonClick = () => {
      const menu = document.getElementById('chat_menu_container');
      menu?.classList.remove('active');
      newUserPopup.show();
    };

    const addUserBtn = new Button({
      className: 'add-chat-user-btn',
      type: 'button',
      events: {
        click: onAddUserButtonClick,
      },
    });

    const addUserItem = new Container({
      className: 'chat-menu-item',
      items: [addUserTitle, addUserBtn],
    });

    const deleteUserTitle = new Text({
      className: 'chat-menu-item-title',
      value: 'Удалить пользователя',
    });

    const onDeleteUserButtonClick = () => {
      const menu = document.getElementById('chat_menu_container');
      menu?.classList.remove('active');
      deleteUserPopup.show();
    };

    const deleteUserBtn = new Button({
      className: 'delete-chat-user-btn',
      type: 'button',
      events: {
        click: onDeleteUserButtonClick,
      },
    });

    const deleteUserItem = new Container({
      className: 'chat-menu-item',
      items: [deleteUserTitle, deleteUserBtn],
    });

    const changeChatAvatarTitle = new Text({
      className: 'chat-menu-item-title',
      value: 'Сменить аватар чата',
    });

    const onChangeChatAvatarBtnClick = () => {
      const menu = document.getElementById('chat_menu_container');
      menu?.classList.remove('active');
      uploadChatAvatarPopup.show();
    };

    const changeChatAvatarBtn = new Button({
      className: 'change-chat-avatar-btn',
      type: 'button',
      events: {
        click: onChangeChatAvatarBtnClick,
      },
    });

    const changeChatAvatar = new Container({
      className: 'chat-menu-item',
      items: [changeChatAvatarTitle, changeChatAvatarBtn],
    });

    const chatMenuContainer = new Container({
      className: 'chat-menu-container',
      id: 'chat_menu_container',
      items: [addUserItem, deleteUserItem, changeChatAvatar, deleteChatItem],
    });

    const onChatMenuBtnClick = (event: Event) => {
      const sourceElRect = event.target.getBoundingClientRect();
      const menu = document.getElementById('chat_menu_container');

      menu!.style.right = `${sourceElRect.right - sourceElRect.left}px`;
      menu!.style.top = `${sourceElRect.bottom}px`;
      if (menu?.classList.contains('active')) {
        menu?.classList.remove('active');
      } else {
        menu?.classList.add('active');
      }
    };

    const chatMenu = new Button({
      className: 'btn-menu',
      type: 'button',
      events: {
        click: onChatMenuBtnClick,
      },
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

    const onSearchInputKeyUp = (event: Event) => {
      //@ts-expect-error problem typing event
      // if (event.which === 13) {
      event.preventDefault();

      const currVal = event.target.value;
      this.setProps({ ...this.props, searchUserValue: currVal });
      //@ts-expect-error problem typing event
      chatController.findUsers(event?.target?.value);
      // }
    };

    const searchInput = new Input({
      className: 'search-textinput',
      inputType: 'text',
      inputPlaceholder: 'Поиск',
      inputName: 'search',
      inputId: 'search',
      inputValue: this.props.searchUserValue,
      events: {
        keyup: onSearchInputKeyUp,
      },
    });

    const searchResults = new Container({
      className: '',
      items: [
        new List({
          className: '',
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
        }),
      ],
    });

    const addUserForm = new Form({
      className: 'add-user-form',
      formItems: [searchInput, searchResults],
    });

    const newUserPopup = new Popup({
      popupItems: [addUserForm],
      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            newUserPopup.hide();
            this.setProps({ ...this.props, searchUserValue: '' });
            this._chatController.clearFindedUsers();
          }
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

    const deleteUserBtn2 = new Button({
      className: 'btn-delete-user',
      label: 'Удалить',
      type: 'submit',
    });

    const deleteUserForm = new Form({
      className: 'delete-user-form',
      formItems: [deleteUserLogin, deleteUserBtn2],
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

    const deleteUserPopup = new Popup({
      popupItems: [deleteUserForm],
      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            deleteUserPopup.hide();
          }
        },
      },
    });

    const changeAvatarHeader = new Text({
      className: 'header-form-md',
      value: 'Загрузить файл',
    });

    const changeAvatarFormContent = new FormGroup({
      className: '',
      label: new Label({
        labelFor: 'myfile',
        text: '',
      }),
      input: new Input({
        inputType: 'file',
        inputId: 'myfile',
        inputName: 'myfile',
      }),
    });

    const changeAvatarBtn = new Button({
      label: 'Поменять',
      className: 'btn-black-w100',
      type: 'submit',
    });

    const onUploadChatAvatarFormSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const inputs = target.querySelectorAll('input');

      // @ts-expect-error because of ??? need to research
      this._chatController.changeChatAvatar(this.props.currentChat, inputs[0].files[0]);
    };

    const uploadChatAvatarForm = new Form({
      className: 'upload-photo-form',
      formItems: [changeAvatarHeader, changeAvatarFormContent, changeAvatarBtn],
      events: {
        submit: onUploadChatAvatarFormSubmit,
      },
    });

    const uploadChatAvatarPopup = new Popup({
      popupItems: [uploadChatAvatarForm],
      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            uploadChatAvatarPopup.hide();
          }
        },
      },
    });

    if (this.props.findedUsers.length > 0 || this.props?.searchUserValue?.length > 0) {
      newUserPopup.show();
      setTimeout(function () {
        const input = document.getElementById('search');
        input?.focus();
        input.selectionStart = input.value.length;
      }, 100);
    } else {
      newUserPopup.hide();
    }

    deleteUserPopup.hide();
    uploadChatAvatarPopup.hide();

    return compileComponent(source, {
      ...this.props,
      profileLink,
      currentChatAvatar,
      currentChatTitle,
      chatMenu,
      newMessageForm,
      dialogsList,
      messagesList,
      newChatForm,
      chatMenuContainer,
      newUserPopup,
      deleteUserPopup,
      uploadChatAvatarPopup,
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
