import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export type ButtonPropsType = {
  className?: string;
  label: string;
  type?: string;
  events?: {
    click: (e: Event) => void;
  };
};

export default class Button extends Block<ButtonPropsType> {
  constructor(props: ButtonPropsType) {
    super(props);
  }

  render() {
    const source = `<button class={{ className }}>{{ label }}</button>`;

    return compileComponent(source, this.props);
  }
}
