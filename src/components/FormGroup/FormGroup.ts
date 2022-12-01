import { FormGroupPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class FormGroup extends Block<FormGroupPropsType> {
  constructor(props: FormGroupPropsType) {
    super('div', props);
  }

  render() {
    const errorId = `${this._props.input?._props.id}-error`;

    const source = `  
      {{{ label }}}
      {{{ input }}}
      <span id="{{errorId}}" class="error" aria-live="polite"></span>
    `;

    return compileComponent(source, { ...this._props, errorId });
  }
}
