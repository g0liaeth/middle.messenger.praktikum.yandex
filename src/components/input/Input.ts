import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export type InputPropsType = {
  className?: string;
  inputType: string;
  inputId: string;
  inputName: string;
  disabled?: string;
  inputValue?: string;
  inputPlaceholder?: string;
  events?: {
    blur?: () => void;
    focus?: () => void;
  };
};

export default class Input extends Block<InputPropsType> {
  constructor(props: InputPropsType) {
    super(props);
  }

  render() {
    const source = `
    <input
      type={{ inputType }}
      id={{ inputId }}
      name={{ inputName }}
      {{ disabled }}
      class={{ className }}
      placeholder={{#if inputPlaceholder}}{{inputPlaceholder}}{{else}}""{{/if}}
    />
    `;

    return compileComponent(source, this.props);
  }
}
