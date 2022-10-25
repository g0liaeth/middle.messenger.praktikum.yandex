import Button from '../components/Button/Button';
import FormGroup from '../components/FormGroup/FormGroup';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Link from '../components/Link/Link';
import Text from '../components/Text/Text';
import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export type LoginPropsType = {
  className?: string;
};

export default class Login extends Block<LoginPropsType> {
  constructor(props: LoginPropsType) {
    super(props);
  }

  render() {
    const source = `
    <div class="login-form-container">
      <form class="login-form">
        {{{ formHeader }}}
        <div>
          {{{ loginFormGroup }}}
          {{{ passwordFormGroup }}}
        </div>
        {{{ loginBtn }}}
        {{{ registerLink }}}
      </form>
    </div>
    `;

    const formHeader = new Text({
      className: 'header-form',
      value: 'Вход',
    });

    const loginFormGroup = new FormGroup({
      className: 'form-group',
      label: new Label({
        className: 'login-label',
        labelFor: 'login',
        text: 'Логин',
      }),
      input: new Input({
        className: 'login-input',
        inputType: 'text',
        inputId: 'login',
        inputName: 'user_login',
      }),
    });

    const passwordFormGroup = new FormGroup({
      className: 'form-group',
      label: new Label({
        className: 'login-label',
        labelFor: 'password',
        text: 'Пароль',
      }),
      input: new Input({
        className: 'login-input',
        inputType: 'password',
        inputId: 'password',
        inputName: 'user_password',
      }),
    });

    const loginBtn = new Button({
      className: 'btn-black',
      label: 'Войти',
    });

    const registerLink = new Link({
      className: 'simple-link',
      path: 'http://localhost:4321/signin',
      text: 'Нет аккаунта?',
    });

    return compileComponent(source, {
      ...this.props,
      formHeader,
      loginFormGroup,
      passwordFormGroup,
      loginBtn,
      registerLink,
    });
  }
}
