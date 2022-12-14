import { MessagePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Message extends Block<MessagePropsType> {
  render() {
    const source = `
    <div class="{{ className }}">
      <div class="message-text">
        {{ text }}
      </div>
      <div class="message-meta">
        {{#if readed}}
          <img src="{{ readMarkImg }}" alt="readed" class="message-meta-img">
        {{else}}
          <img src="{{ readMarkImg }}" alt="not readed" class="message-meta-img">
        {{/if}}
        <time datetime="{{ sendTime }}">{{ sendTime }}</time>
      </div>
    </div>
    `;

    return compileComponent(source, this.props);
  }
}
