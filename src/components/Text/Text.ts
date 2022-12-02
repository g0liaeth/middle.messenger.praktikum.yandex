import { TextPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Text extends Block<TextPropsType> {
  constructor(tag = 'span', props?: TextPropsType) {
    super(tag, props);
  }

  render() {
    const source = `{{ data.value }}`;

    return compileComponent(source, this._props);
  }
}
