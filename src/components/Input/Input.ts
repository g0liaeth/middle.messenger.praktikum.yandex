import { InputPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Input extends Block<InputPropsType> {
  constructor(tag = 'input', props?: InputPropsType) {
    super(tag, props);
  }

  render() {
    const source = ``;

    return compileComponent(source, this._props);
  }
}
