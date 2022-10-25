import Button from '../components/Button/Button';
import FormGroup from '../components/FormGroup/FormGroup';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Link from '../components/Link/Link';
import Text from '../components/Text/Text';
import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';
import Validator from '../utils/Validator';

export type LoginPropsType = {
  className?: string;
};

export default class Login extends Block<LoginPropsType> {
  constructor(props: LoginPropsType) {
    super(props);
  }

  private _onFocusChange(event: Event) {
    const validator = new Validator();
    const input = event.target as HTMLInputElement;
    const errors = validator.validateInput(input);
    const errorMessage = document.querySelector(`#${input.getAttribute('id')}-error`);

    if (!errorMessage) {
      throw new Error('Нет спана для ошибки');
    }

    if (errors.length !== 0) {
      errorMessage.textContent = errors.join('/n');
      input.classList.add('invalid');
    } else {
      errorMessage.textContent = '';
      input.classList.remove('invalid');
    }
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
        events: {
          blur: this._onFocusChange.bind(this),
          focus: this._onFocusChange.bind(this),
        },
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
        events: {
          blur: this._onFocusChange.bind(this),
          focus: this._onFocusChange.bind(this),
        },
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
