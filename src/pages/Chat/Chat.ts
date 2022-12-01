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
// import { BasePropsType } from '../../types/componentTypes';
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

class Chat extends Block<any> {
  protected _controller: ChatController;

  constructor(props: any) {
    super('main', { ...props, class: 'chat-wrapper' });
    this._controller = new ChatController();
    this._controller.fetchUser();
    this._controller.getChats();
  }

  render() {
    const chatController = this._controller;
    const source = `
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
    `;

    const onFocusChange = (event: Event) => {
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
    };

    const newChatTitle = new Input({
      class: 'new-chat-input',
      type: 'text',
      id: 'new_chat_title',
      name: 'new_chat_title',
    });

    const addChatBtn = new Button({
      class: 'btn-add-chat',
      type: 'submit',
    });

    const newChatForm = new Form({
      formItems: [newChatTitle, addChatBtn],
      class: 'new-chat-form',
      onSubmit(event) {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const data = new FormData(target);
        if (!data.get('new_chat_title')) {
          return;
        }
        chatController.createChat(data.get('new_chat_title') as string);
        target.reset();
      },
    });

    const profileLink = new Link({
      class: 'profile-link',
      href: 'profile',
      data: {
        text: 'Профиль >',
      },
    });

    const currentChatAvatar = new UserAvatar({
      class: 'avatar-shield',
      data: {
        imgPath:
          // @ts-expect-error problem typing props from HOC
          this._props?.chatsList.find((chat) => chat.id === this._props.currentChat)?.avatar &&
          UPLOAD_URL +
            // @ts-expect-error problem typing props from HOC
            this._props?.chatsList.find((chat) => chat.id === this._props.currentChat)?.avatar,
      },
    });

    const currentChatTitle = new Text({
      class: 'avatar-name',
      data: {
        //@ts-expect-error problem typing props from HOC
        value: this._props?.chatsList.find((chat) => chat.id === this._props.currentChat)?.title,
      },
    });

    const deleteChatTitle = new Text({
      class: 'chat-menu-item-title',
      data: {
        value: 'Удалить чат',
      },
    });

    const onDeleteButtonClick = () => {
      const menu = document.getElementById('chat_menu_container');
      menu?.classList.remove('active');
      chatController.deleteChat(this._props.currentChat);
    };

    const deleteChatBtn = new Button({
      class: 'delete-chat-btn',
      type: 'button',
      onClick: onDeleteButtonClick,
    });

    const deleteChatItem = new Container({
      class: 'chat-menu-item',
      items: [deleteChatTitle, deleteChatBtn],
    });

    const addUserTitle = new Text({
      class: 'chat-menu-item-title',
      data: {
        value: 'Добавить пользователя',
      },
    });

    const onAddUserButtonClick = () => {
      const menu = document.getElementById('chat_menu_container');
      menu?.classList.remove('active');
      newUserPopup.show();
    };

    const addUserBtn = new Button({
      class: 'add-chat-user-btn',
      type: 'button',
      onClick: onAddUserButtonClick,
    });

    const addUserItem = new Container({
      class: 'chat-menu-item',
      items: [addUserTitle, addUserBtn],
    });

    const deleteUserTitle = new Text({
      class: 'chat-menu-item-title',
      data: {
        value: 'Удалить пользователя',
      },
    });

    const onDeleteUserButtonClick = () => {
      const menu = document.getElementById('chat_menu_container');
      menu?.classList.remove('active');
      deleteUserPopup.show();
    };

    const deleteUserBtn = new Button({
      class: 'delete-chat-user-btn',
      type: 'button',
      onClick: onDeleteUserButtonClick,
    });

    const deleteUserItem = new Container({
      class: 'chat-menu-item',
      items: [deleteUserTitle, deleteUserBtn],
    });

    const changeChatAvatarTitle = new Text({
      class: 'chat-menu-item-title',
      data: {
        value: 'Сменить аватар чата',
      },
    });

    const onChangeChatAvatarBtnClick = () => {
      const menu = document.getElementById('chat_menu_container');
      menu?.classList.remove('active');
      uploadChatAvatarPopup.show();
    };

    const changeChatAvatarBtn = new Button({
      class: 'change-chat-avatar-btn',
      type: 'button',
      onClick: onChangeChatAvatarBtnClick,
    });

    const changeChatAvatar = new Container({
      class: 'chat-menu-item',
      items: [changeChatAvatarTitle, changeChatAvatarBtn],
    });

    const chatMenuContainer = new Container({
      class: 'chat-menu-container',
      id: 'chat_menu_container',
      items: [addUserItem, deleteUserItem, changeChatAvatar, deleteChatItem],
    });

    const onChatMenuBtnClick = (event: Event) => {
      //@ts-expect-error ???
      const sourceElRect = event.target.getBoundingClientRect();
      const menu = document.getElementById('chat_menu_container');

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      menu!.style.right = `${sourceElRect.right - sourceElRect.left}px`;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      menu!.style.top = `${sourceElRect.bottom}px`;
      if (menu?.classList.contains('active')) {
        menu?.classList.remove('active');
      } else {
        menu?.classList.add('active');
      }
    };

    const chatMenu = new Button({
      class: 'btn-menu',
      type: 'button',
      onClick: onChatMenuBtnClick,
    });

    const messageInput = new Input({
      class: 'new-message-textinput',
      type: 'text',
      id: 'message',
      name: 'message',
      placeholder: 'Сообщение...',
      onBlur: onFocusChange,
      onFocus: onFocusChange,
      onKeyup: onFocusChange,
    });

    const newMessageInput = new FormGroup({
      class: 'form-group-new-message',
      input: messageInput,
    });

    const attachFileBtn = new Button({
      class: 'btn-attach-file',
      type: 'button',
    });

    const sendMessageBtn = new Button({
      class: 'btn-black',
      type: 'submit',
      data: {
        label: 'Отправить',
      },
    });

    const btnsBlock = new Container({
      class: 'send-message-container',
      items: [attachFileBtn, sendMessageBtn],
    });

    const newMessageForm = new Form({
      class: 'form-new-message',
      formItems: [newMessageInput, btnsBlock],
      onSubmit(event) {
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
    });

    const dialogsList: Dialog[] = [];
    //@ts-expect-error problem typing props from HOC
    this._props.chatsList.forEach((chat) => {
      const msgTime = new Date(chat.last_message?.time);
      const hours = msgTime.getHours();
      const minutes = msgTime.getMinutes();
      const timeStr = hours || minutes ? `${hours}:${minutes}` : '';
      dialogsList.push(
        new Dialog({
          class: 'chat-item ' + this._props.currentChat === chat.id ? 'active' : '',
          id: chat.id,
          hasNewMessages: chat.unread_count > 0,
          lastMessageSender: true,
          senderUserName: chat.title,
          lastMessageText: chat.last_message?.content,
          lastMessageTime: timeStr,
          newMessagesCount: chat.unread_count,
          dialogAvatar: new UserAvatar({
            data: {
              imgPath: chat.avatar && UPLOAD_URL + chat.avatar,
            },
          }),
          onClick: (event) => {
            //@ts-expect-error problem typing props from HOC
            const selectedChat = Number(event.currentTarget?.id);
            chatController.setCurrentChat(selectedChat);
            chatController.connectToChat(selectedChat);
          },
        }),
      );
    });

    const messagesList: Message[] = this._props.messages
      .filter((msg: wsMessageType) => msg.chat_id === this._props.currentChat)
      .map((msg: wsMessageType) => {
        const msgTime = new Date(msg.time);
        const timeStr = `${msgTime.getHours()}:${msgTime.getMinutes()}`;
        const msgClass =
          this._props.currentUser === msg.user_id ? 'outgoing-message' : 'incoming-message';
        return new Message({
          class: msgClass,
          data: {
            readed: false,
            sendTime: timeStr,
            readMarkImg: '',
            text: msg.content,
          },
        });
      });

    const onSearchInputKeyUp = (event: Event) => {
      event.preventDefault();
      //@ts-expect-error problem typing event
      const currVal = event.target.value;
      this.setProps({ ...this._props, searchUserValue: currVal });
      //@ts-expect-error problem typing event
      chatController.findUsers(event?.target?.value);
      // }
    };

    const searchInput = new Input({
      class: 'search-textinput',
      type: 'text',
      placeholder: 'Поиск',
      name: 'search',
      id: 'search',
      //@ts-expect-error problem typing props from HOC
      inputValue: this._props.searchUserValue,
      events: {
        keyup: onSearchInputKeyUp,
      },
    });

    const searchResults = new Container({
      class: '',
      items: [
        new List({
          listItems: this._props.findedUsers.map(
            (item: UserData) =>
              new ListItem({
                id: item.id,
                class: 'dropdown-list-item',
                data: {
                  content: item.login,
                },
                onClick: (event) => {
                  //@ts-expect-error problem typing event click on <div>
                  chatController.addUser(event?.target?.id);
                  chatController.clearFindedUsers();
                },
              }),
          ),
        }),
      ],
    });

    const addUserForm = new Form({
      class: 'add-user-form',
      formItems: [searchInput, searchResults],
    });

    const newUserPopup = new Popup({
      popupItems: [addUserForm],
      onClick: (event) => {
        if (event.target === event.currentTarget) {
          newUserPopup.hide();
          this.setProps({ ...this._props, searchUserValue: '' });
          this._controller.clearFindedUsers();
        }
      },
    });

    const deleteUserLogin = new Input({
      class: 'delete-user-login',
      type: 'text',
      id: 'delete_user_login',
      name: 'delete_user_login',
      placeholder: 'Логин пользователя',
    });

    const deleteUserBtn2 = new Button({
      class: 'btn-delete-user',
      type: 'submit',
      data: {
        label: 'Удалить',
      },
    });

    const deleteUserForm = new Form({
      class: 'delete-user-form',
      formItems: [deleteUserLogin, deleteUserBtn2],
      onSubmit(event) {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const data = new FormData(target);
        if (!data.get('delete_user_login')) {
          return;
        }
        chatController.deleteUser(data.get('delete_user_login') as string);
        target.reset();
      },
    });

    const deleteUserPopup = new Popup({
      popupItems: [deleteUserForm],
      onClick: (event) => {
        if (event.target === event.currentTarget) {
          deleteUserPopup.hide();
        }
      },
    });

    const changeAvatarHeader = new Text({
      class: 'header-form-md',
      data: {
        value: 'Загрузить файл',
      },
    });

    const changeAvatarFormContent = new FormGroup({
      label: new Label({
        for: 'myfile',
        data: {
          text: '',
        },
      }),
      input: new Input({
        type: 'file',
        id: 'myfile',
        name: 'myfile',
      }),
    });

    const changeAvatarBtn = new Button({
      class: 'btn-black-w100',
      type: 'submit',
      data: {
        label: 'Поменять',
      },
    });

    const onUploadChatAvatarFormSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const inputs = target.querySelectorAll('input');

      // @ts-expect-error because of ??? need to research
      this._controller.changeChatAvatar(this._props.currentChat, inputs[0].files[0]);
    };

    const uploadChatAvatarForm = new Form({
      class: 'upload-photo-form',
      formItems: [changeAvatarHeader, changeAvatarFormContent, changeAvatarBtn],
      onSubmit: onUploadChatAvatarFormSubmit,
    });

    const uploadChatAvatarPopup = new Popup({
      popupItems: [uploadChatAvatarForm],
      onClick: (event) => {
        if (event.target === event.currentTarget) {
          uploadChatAvatarPopup.hide();
        }
      },
    });

    if (this._props.findedUsers.length > 0 || this._props?.searchUserValue?.length > 0) {
      newUserPopup.show();
      setTimeout(function () {
        const input = document.getElementById('search');
        input?.focus();
        //@ts-expect-error ???
        input.selectionStart = input.value.length;
      }, 100);
    } else {
      newUserPopup.hide();
    }

    deleteUserPopup.hide();
    uploadChatAvatarPopup.hide();

    return compileComponent(source, {
      ...this._props,
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

export default connect<any>(mapStateToProps)(Chat);
