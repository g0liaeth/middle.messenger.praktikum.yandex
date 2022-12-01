import { MessagePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Message extends Block<MessagePropsType> {
  constructor(props: MessagePropsType) {
    super('div', props);
  }

  render() {
    const source = `
      <div class="message-text">
        {{ data.text }}
      </div>
      <div class="message-meta">
        {{#if data.readed}}
          <img src="{{ data.readMarkImg }}" alt="readed" class="message-meta-img">
        {{else}}
          <img src="{{ data.readMarkImg }}" alt="not readed" class="message-meta-img">
        {{/if}}
        <time datetime="{{ data.sendTime }}">{{ data.sendTime }}</time>
      </div>
    `;

    return compileComponent(source, this._props);
  }
}
