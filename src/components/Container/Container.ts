import { ContainerPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Container extends Block<ContainerPropsType> {
  constructor(props: ContainerPropsType) {
    super('div', props);
  }

  render() {
    const source = `{{{ items }}}`;

    return compileComponent(source, this._props);
  }
}
