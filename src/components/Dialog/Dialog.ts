import { DialogPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Dialog extends Block<DialogPropsType> {
  render() {
    const source = `
    <li class="chat-item {{ className }}" id="{{ id }}">
      <div class="chat-item-left">
        {{{ dialogAvatar }}}
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

    return compileComponent(source, this.props);
  }
}
