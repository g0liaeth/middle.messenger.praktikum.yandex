import { FormGroupPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export default class FormGroup extends Block<FormGroupPropsType> {
  constructor(props: FormGroupPropsType) {
    super(props);
  }

  render() {
    const errorId = `${this.props.input.props.inputId}-error`;

    const source = `
    <div class={{ className }}>
      {{{ label }}}
      {{{ input }}}
      <span id="{{errorId}}" class="error" aria-live="polite"></span>
    </div>
    `;

    return compileComponent(source, { ...this.props, errorId });
  }
}
