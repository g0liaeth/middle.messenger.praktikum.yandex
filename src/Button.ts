import Block from './utils/Block';
import compileComponent from './utils/compileComponent';

export type ButtonProps = {
  className?: string;
  label: string;
};

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const source = `<button class={{ className }}>{{ label }}</button>`;

    return compileComponent(source, this.props);
  }
}
