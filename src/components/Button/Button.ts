import { ButtonPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Button extends Block<ButtonPropsType> {
  constructor(tag = 'button', props?: ButtonPropsType) {
    super(tag, props);
  }

  render() {
    const source = `{{ data.label }}`;

    return compileComponent(source, this._props);
  }
}
