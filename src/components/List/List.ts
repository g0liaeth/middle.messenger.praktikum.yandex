import { ListPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class List extends Block<ListPropsType> {
  render() {
    const source = `
    <ul class="{{ className }}">
      {{{ listItems }}}
    </ul>
    `;

    return compileComponent(source, this.props);
  }
}
