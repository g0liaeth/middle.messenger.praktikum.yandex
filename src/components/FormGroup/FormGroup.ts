import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';
import Input from '../Input/Input';
import Label from '../Label/Label';

export type FormGroupPropsType = {
  className?: string;
  label: Label;
  input: Input;
};

export default class FormGroup extends Block<FormGroupPropsType> {
  constructor(props: FormGroupPropsType) {
    super(props);
  }

  render() {
    const source = `
    <div class={{ className }}>
      {{{ label }}}
      {{{ input }}}
    </div>
    `;

    return compileComponent(source, this.props);
  }
}
