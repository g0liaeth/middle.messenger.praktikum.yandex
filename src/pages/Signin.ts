import Button from '../components/Button/Button';
import FormGroup from '../components/FormGroup/FormGroup';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Link from '../components/Link/Link';
import Text from '../components/Text/Text';
import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export type SigninPropsType = {
  className?: string;
};

export default class Signin extends Block<SigninPropsType> {
  constructor(props: SigninPropsType) {
    super(props);
  }

  render() {
    const source = `
    <div class="register-form-container">
      <form class="register-form">
        {{{ formHeader }}}
        <div>
          {{{ emailFormGroup }}}
          {{{ loginFormGroup }}}
          {{{ firstNameFormGroup }}}
          {{{ secondNameFormGroup }}}
          {{{ phoneFormGroup }}}
          {{{ passwordFormGroup }}}
          {{{ repeatPasswordFormGroup }}}
        </div>
        {{{ registerBtn }}}
        {{{ loginLink }}}
      </form>
    </div>
    `;

    const formHeader = new Text({
      className: 'header-form',
      value: 'Регистрация',
    });

    const emailFormGroup = new FormGroup({
      className: 'form-group',
      label: new Label({
        className: 'login-label',
        labelFor: 'email',
        text: 'Почта',
      }),
      input: new Input({
        className: 'login-input',
        inputType: 'email',
        inputId: 'email',
        inputName: 'user_email',
      }),
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

    const firstNameFormGroup = new FormGroup({
      className: 'form-group',
      label: new Label({
        className: 'login-label',
        labelFor: 'first_name',
        text: 'Имя',
      }),
      input: new Input({
        className: 'login-input',
        inputType: 'text',
        inputId: 'first_name',
        inputName: 'user_first_name',
      }),
    });

    const secondNameFormGroup = new FormGroup({
      className: 'form-group',
      label: new Label({
        className: 'login-label',
        labelFor: 'second_name',
        text: 'Фамилия',
      }),
      input: new Input({
        className: 'login-input',
        inputType: 'text',
        inputId: 'second_name',
        inputName: 'user_second_name',
      }),
    });

    const phoneFormGroup = new FormGroup({
      className: 'form-group',
      label: new Label({
        className: 'login-label',
        labelFor: 'phone',
        text: 'Телефон',
      }),
      input: new Input({
        className: 'login-input',
        inputType: 'tel',
        inputId: 'phone',
        inputName: 'user_phone',
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

    const repeatPasswordFormGroup = new FormGroup({
      className: 'form-group',
      label: new Label({
        className: 'login-label',
        labelFor: 'repeat_password',
        text: 'Пароль (ещё раз)',
      }),
      input: new Input({
        className: 'login-input',
        inputType: 'password',
        inputId: 'repeat_password',
        inputName: 'user_repeat_password',
      }),
    });

    const registerBtn = new Button({
      className: 'btn-black',
      label: 'Зарегистрироваться',
    });

    const loginLink = new Link({
      className: 'simple-link',
      path: 'http://localhost:4321/login',
      text: 'Войти',
    });

    return compileComponent(source, {
      ...this.props,
      formHeader,
      emailFormGroup,
      loginFormGroup,
      firstNameFormGroup,
      secondNameFormGroup,
      phoneFormGroup,
      passwordFormGroup,
      repeatPasswordFormGroup,
      registerBtn,
      loginLink,
    });
  }
}
