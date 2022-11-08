import { ButtonPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Button extends Block<ButtonPropsType> {
  render() {
    const source = `<button class={{ className }} type={{ type }}>{{ label }}</button>`;

    return compileComponent(source, this.props);
  }
}
