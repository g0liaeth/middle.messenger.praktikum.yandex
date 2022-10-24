import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export type TextPropsType = {
  className?: string;
  value: string;
};

export default class Text extends Block<TextPropsType> {
  constructor(props: TextPropsType) {
    super(props);
  }

  render() {
    const source = `<span class={{ className }}>{{ value }}</span>`;

    return compileComponent(source, this.props);
  }
}
