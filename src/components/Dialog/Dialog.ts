import userAvatarImg from '../../static/mock-ava.png';
import { DialogPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';
import UserAvatar from '../UserAvatar/UserAvatar';

export default class Dialog extends Block<DialogPropsType> {
  constructor(props: DialogPropsType) {
    super(props);
  }

  render() {
    const source = `
    <li class="chat-item">
      <div class="chat-item-left">
        {{{ userAvatar }}}
        <div class="chat-info">
          <div class="sender"><b>{{senderUserName}}</b></div>
          <div>
            <span class="last-message-sender">{{#if lastMessageSender}}Вы:{{else}}{{null}}{{/if}}</span>
            {{lastMessageText}}
          </div>
        </div>
      </div>
      <div class="chat-item-right">    
          <div class="last-message-time">
            <time datetime={{lastMessageTime}}>
              {{lastMessageTime}}
            </time>
          </div>
          {{#if hasNewMessages}}
          <div class="new-messages">
            {{newMessagesCount}}
          </div>
          {{/if}}
      </div>
    </li>
    `;

    const userAvatar = new UserAvatar({
      imgPath: userAvatarImg,
    });

    return compileComponent(source, { ...this.props, userAvatar });
  }
}
