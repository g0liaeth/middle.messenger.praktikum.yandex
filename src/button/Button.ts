import Block from '../utils/Block';

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

    return this.generateTemplate(source, this.props);
  }
}
