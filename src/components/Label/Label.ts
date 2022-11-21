import { LabelPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Label extends Block<LabelPropsType> {
  render() {
    const source = `<label for={{ labelFor }} class={{ className }}>{{ text }}</label>`;

    return compileComponent(source, this.props);
  }
}
