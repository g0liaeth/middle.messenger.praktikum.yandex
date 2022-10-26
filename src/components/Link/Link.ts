import { LinkPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export default class Link extends Block<LinkPropsType> {
  constructor(props: LinkPropsType) {
    super(props);
  }

  render() {
    const source = `<a href={{ path }} class={{ className }}>{{ text }}</a>`;

    return compileComponent(source, this.props);
  }
}
