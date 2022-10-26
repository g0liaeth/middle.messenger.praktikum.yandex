import { TextPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export default class Text extends Block<TextPropsType> {
  render() {
    const source = `<span class={{ className }}>{{ value }}</span>`;

    return compileComponent(source, this.props);
  }
}
