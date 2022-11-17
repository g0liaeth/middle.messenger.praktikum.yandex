import { FormPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Form extends Block<FormPropsType> {
  render() {
    const source = `
    <form class="{{ className }}">
      {{{ formItems }}}
    </form>
    `;

    return compileComponent(source, this.props);
  }
}
