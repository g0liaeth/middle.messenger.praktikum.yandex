import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export type LabelPropsType = {
  className?: string;
  text: string;
  labelFor: string;
};

export default class Label extends Block<LabelPropsType> {
  constructor(props: LabelPropsType) {
    super(props);
  }

  render() {
    const source = `<label for={{ labelFor }} class={{ className }}>{{ text }}</label>`;

    return compileComponent(source, this.props);
  }
}
