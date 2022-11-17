import { InputPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Input extends Block<InputPropsType> {
  render() {
    const source = `
    <input
      type={{ inputType }}
      id={{ inputId }}
      name={{ inputName }}
      {{ disabled }}
      class={{ className }}
      placeholder={{#if inputPlaceholder}}"{{inputPlaceholder}}"{{else}}""{{/if}}
      autocomplete="off"
      {{#if inputValue}}value="{{ inputValue }}"{{else}}{{/if}}
    />
    `;

    return compileComponent(source, this.props);
  }
}
