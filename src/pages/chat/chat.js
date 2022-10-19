import Handlebars from 'handlebars';
import template from './chat.tmpl';
import popupTmpl from '../../components/popup/popup.tmpl';
import '../../components';
import avatarImg from '../../static/mock-ava.png';
import paperclipImg from '../../static/paperclip-solid.svg';
import ellipsis from '../../static/ellipsis-vertical-solid.svg';

window.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template);
  const root = document.getElementById('root');

  root.innerHTML = compiled({
    profileLink: '#',
    profileLinkClass: 'profile-link',
    profileLinkText: 'Профиль >',
    searchInputType: 'text',
    searchInputPlaceholder: 'Поиск',
    searchInputClassName: 'search-textinput',
    avatarImg: avatarImg,
    mainMenuImg: ellipsis,
    mainMenuClass: 'menu-img',
    chatList: [
      {
        userAvatar: avatarImg,
        userName: 'Вадим',
        lastMessageSender: true,
        lastMessageText: 'Lorem ipsum dolor sit amet consectetur adi...',
        lastMessageTime: '12:45',
        hasNewMessages: true,
        newMessagesCount: 4,
      },
      {
        userAvatar: avatarImg,
        userName: 'Петр',
        lastMessageSender: false,
        lastMessageText: 'Lorem ipsum dolor sit amet consectetur adi...',
        lastMessageTime: '12:24',
        hasNewMessages: false,
      },
      {
        userAvatar: avatarImg,
        userName: 'Вадим',
        lastMessageSender: true,
        lastMessageText: 'Lorem ipsum dolor sit amet consectetur adi...',
        lastMessageTime: '12:45',
        hasNewMessages: true,
        newMessagesCount: 4,
      },
      {
        userAvatar: avatarImg,
        userName: 'Петр',
        lastMessageSender: false,
        lastMessageText: 'Lorem ipsum dolor sit amet consectetur adi...',
        lastMessageTime: '12:24',
        hasNewMessages: false,
      },
      {
        userAvatar: avatarImg,
        userName: 'Вадим',
        lastMessageSender: true,
        lastMessageText: 'Lorem ipsum dolor sit amet consectetur adi...',
        lastMessageTime: '12:45',
        hasNewMessages: true,
        newMessagesCount: 4,
      },
      {
        userAvatar: avatarImg,
        userName: 'Петр',
        lastMessageSender: false,
        lastMessageText: 'Lorem ipsum dolor sit amet consectetur adi...',
        lastMessageTime: '12:24',
        hasNewMessages: false,
      },
    ],
    messageList: [
      {
        date: '01-02-2022',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque tenetur qui laudantium autem omnis. Quod ex omnis, totam impedit tempore cupiditate laboriosam fugit, minima commodi assumenda excepturi inventore eaque exercitationem! Possimus voluptates numquam dignissimos natus atque vero iure sed ut adipisci eligendi! Voluptas quas vel quos, amet nemo omnis sit, recusandae iusto laudantium minus iure porro assumenda praesentium saepe ipsa!',
      },
    ],
    newMessageInputType: 'text',
    newMessageInputId: 'message',
    newMessageInputName: 'message-input',
    newMessageInputPlaceholder: 'Сообщение...',
    newMessageInputClass: 'new-message-textinput',
    sendButtonClass: 'btn-black',
    sendButtonLabel: 'Отправить',
    attachButtonImg: paperclipImg,
    attachButtonClass: 'attach-file-img',
  });
});
