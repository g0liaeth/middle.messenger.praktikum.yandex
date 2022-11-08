import { TextPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Text extends Block<TextPropsType> {
  render() {
    const source = `<span class={{ className }}>{{ value }}</span>`;

    return compileComponent(source, this.props);
  }
}
