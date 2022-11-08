import { LinkPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils//Block/compileComponent';

export default class Link extends Block<LinkPropsType> {
  render() {
    const source = `<a href={{ path }} class={{ className }}>{{ text }}</a>`;

    return compileComponent(source, this.props);
  }
}
