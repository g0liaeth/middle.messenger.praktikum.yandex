import { TextPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Text extends Block<TextPropsType> {
  constructor(props: TextPropsType) {
    super('span', props);
  }

  render() {
    const source = `{{ data.value }}`;

    return compileComponent(source, this._props);
  }
}
