import { DialogPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Dialog extends Block<DialogPropsType> {
  constructor(props: DialogPropsType) {
    super('li', props);
  }

  render() {
    const source = `
      <div class="chat-item-left">
        {{{ dialogAvatar }}}
        <div class="chat-info">
          <div class="sender"><b>{{data.senderUserName}}</b></div>
          <div>
            <span class="last-message-sender">{{#if data.lastMessageSender}}Вы:{{else}}{{null}}{{/if}}</span>
            {{data.lastMessageText}}
          </div>
        </div>
      </div>
      <div class="chat-item-right">    
          <div class="last-message-time">
            <time datetime={{data.lastMessageTime}}>
              {{data.lastMessageTime}}
            </time>
          </div>
          {{#if data.hasNewMessages}}
          <div class="new-messages">
            {{data.newMessagesCount}}
          </div>
          {{/if}}
      </div>
    `;

    return compileComponent(source, this._props);
  }
}
