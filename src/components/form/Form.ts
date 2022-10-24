import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';
import Button from '../Button/Button';
import FormGroup from '../FormGroup/FormGroup';
import Link from '../Link/Link';
import Text from '../Text/Text';

export type FormPropsType = {
  className?: string;
  formHeader: Text;
  loginFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  button: Button;
  link: Link;
};

export default class Form extends Block<FormPropsType> {
  constructor(props: FormPropsType) {
    super(props);
  }

  render() {
    const source = `
    <form>
      {{{ formHeader }}}
      <div>
        {{{ loginFormGroup }}}
        {{{ passwordFormGroup }}}
      </div>
      {{{ button }}}
      {{{ link }}}
    </form>
    `;

    return compileComponent(source, this.props);
  }
}
