import { ContainerPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Container extends Block<ContainerPropsType> {
  constructor(tag = 'div', props?: ContainerPropsType) {
    super(tag, props);
  }

  render() {
    const source = `{{{ items }}}`;

    return compileComponent(source, this._props);
  }
}
