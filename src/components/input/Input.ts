import { InputPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

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
      autocomplete="off"
      {{#if inputValue}}value="{{ inputValue }}"{{else}}{{/if}}
    />
    `;

    return compileComponent(source, this.props);
  }
}
