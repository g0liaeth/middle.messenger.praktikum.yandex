import { ContainerPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Container extends Block<ContainerPropsType> {
  render() {
    const source = `
    <div id="{{ id }}" class="{{ className }}">
      {{{ items }}}
    </div>
    `;

    return compileComponent(source, this.props);
  }
}
