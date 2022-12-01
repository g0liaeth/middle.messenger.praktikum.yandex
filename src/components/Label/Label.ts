import { LabelPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Label extends Block<LabelPropsType> {
  constructor(props: LabelPropsType) {
    super('label', props);
  }

  render() {
    const source = `{{ data.text }}`;

    return compileComponent(source, this._props);
  }
}
