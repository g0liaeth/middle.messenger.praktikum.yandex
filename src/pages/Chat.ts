import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Link from '../components/Link/Link';
import Text from '../components/Text/Text';
import UserAvatar from '../components/UserAvatar/UserAvatar';
import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';
import avatarImg from '../static/mock-ava.png';
import attachBtnImg from '../static/paperclip-solid.svg';
import NewMessageForm from '../components/NewMessageForm/NewMessageForm';

export type ChatPropsType = {
  className?: string;
  backgroundColor?: string;
};

export default class Chat extends Block<ChatPropsType> {
  constructor(props: ChatPropsType) {
    super(props);
  }

  componentDidMount(props: any): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
    document.addEventListener('DOMContentLoaded', () => {
      const mainContainer = document.querySelector('.main-container') as HTMLElement;
      mainContainer.classList.remove('main-container');
      mainContainer.classList.add('new-main-container');
    });
  }

  render() {
    const source = `
    <div class="chat-wrapper">
      <div class="left-container">
        <div class="profile-link-container">
          {{{ profileLink }}}
        </div>
        <div class="search-container">
          {{{ searchInput }}}
        </div>
        <div class="chat-list-container">
          <ul class="chat-list">
            list of chats
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
            list of messages
          </div>
        </div>
        <div class="chat-footer">
          {{{ newMessageForm }}}
        </div>
      </div>
    </div>
    `;

    const profileLink = new Link({
      className: 'profile-link',
      path: 'http://localhost:4321/profile',
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
      label: 'chat menu',
    });

    const newMessageForm = new NewMessageForm({ attachBtnImg });

    return compileComponent(source, {
      ...this.props,
      profileLink,
      searchInput,
      currentUserAvatar,
      currentUserName,
      chatMenu,
      newMessageForm,
    });
  }
}
