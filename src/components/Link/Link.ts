import { LinkPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils//Block/compileComponent';

export default class Link extends Block<LinkPropsType> {
  constructor(tag = 'a', props?: LinkPropsType) {
    super(tag, props);
  }

  render() {
    const source = `{{ data.text }}`;

    return compileComponent(source, this._props);
  }
}
