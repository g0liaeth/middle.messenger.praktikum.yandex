import { ListPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class List extends Block<ListPropsType> {
  constructor(tag = 'ul', props?: ListPropsType) {
    super(tag, props);
  }

  render() {
    const source = `
      {{{ listItems }}}
    `;

    return compileComponent(source, this._props);
  }
}
