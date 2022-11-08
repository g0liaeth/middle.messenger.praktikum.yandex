import Button from '../components/Button/Button';
import Dialog from '../components/Dialog/Dialog';
import Input from '../components/Input/Input';
import Link from '../components/Link/Link';
import Message from '../components/Message/Message';
import NewMessageForm from '../components/NewMessageForm/NewMessageForm';
import Text from '../components/Text/Text';
import UserAvatar from '../components/UserAvatar/UserAvatar';
import readedMessageImg from '../static/check-double-solid.svg';
import newMessageImg from '../static/check-solid.svg';
import avatarImg from '../static/mock-ava.png';
import attachBtnImg from '../static/paperclip-solid.svg';
import Block from '../utils/Block/Block';
import compileComponent from '../utils/Block/compileComponent';

export default class Chat extends Block {
  componentDidMount(): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
    document.addEventListener('DOMContentLoaded', () => {
      const mainContainer = document.querySelector('.main-container') as HTMLElement;
      mainContainer.classList.remove('main-container');
      mainContainer.classList.add('new-main-container');
    });
  }

  render() {
    const source = `
    <main class="chat-wrapper">
      <div class="left-container">
        <div class="profile-link-container">
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
    for (let i = 0; i < 9; i++) {
      dialogsList.push(
        new Dialog({
          hasNewMessages: true,
          lastMessageSender: true,
          senderUserName: 'Вадим',
          lastMessageText: 'Lorem ipsum dolor sit amet consectetur adi...',
          lastMessageTime: '12:45',
          newMessagesCount: 4,
        }),
      );
    }

    const messagesList: Message[] = [];
    for (let i = 0; i < 5; i++) {
      messagesList.push(
        new Message({
          className: 'incoming-message',
          readed: true,
          sendTime: '15:47',
          readMarkImg: readedMessageImg,
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque tenetur qui laudantium autem omnis. Quod ex omnis, totam impedit tempore cupiditate laboriosam fugit, minima commodi assumenda excepturi inventore eaque exercitationem! Possimus voluptates numquam dignissimos natus atque vero iure sed ut adipisci eligendi! Voluptas quas vel quos, amet nemo omnis sit, recusandae iusto laudantium minus iure porro assumenda praesentium saepe ipsa!',
        }),
      );
    }
    messagesList.push(
      new Message({
        className: 'outgoing-message',
        readed: false,
        sendTime: '12:00',
        text: 'Круто!!!',
        readMarkImg: newMessageImg,
      }),
    );

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
    });
  }
}
