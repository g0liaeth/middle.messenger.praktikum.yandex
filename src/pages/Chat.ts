import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export type ChatPropsType = {};

export default class Chat extends Block<ChatPropsType> {
  constructor(props: ChatPropsType) {
    super(props);
  }

  render() {
    const source = `<div>Chats stub</div>`;

    return compileComponent(source, this.props);
  }
}
