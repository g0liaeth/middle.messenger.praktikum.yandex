import { LabelPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export default class Label extends Block<LabelPropsType> {
  constructor(props: LabelPropsType) {
    super(props);
  }

  render() {
    const source = `<label for={{ labelFor }} class={{ className }}>{{ text }}</label>`;

    return compileComponent(source, this.props);
  }
}