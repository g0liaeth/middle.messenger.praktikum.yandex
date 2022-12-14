import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Form from '../../components/Form/Form';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import Link from '../../components/Link/Link';
import Text from '../../components/Text/Text';
import { RegistrationData } from '../../types/commonTypes';
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import connect from '../../utils/Store/connect';
import Validator from '../../utils/Validator';
import RegistrationController from './RegistrationController';

class Registration<T extends BasePropsType> extends Block<T> {
  private _events = {};
  private _registrationController: RegistrationController;

  constructor(props: T) {
    super(props);
    this._registrationController = new RegistrationController();
  }

  componentDidMount(): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
    this._events = {
      blur: this._onFocusChange.bind(this),
      focus: this._onFocusChange.bind(this),
    };
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

  private _chekPasswordRepeat(event: Event) {
    const input = event.target as HTMLInputElement;
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    const errorMessage = document.querySelector(`#${input.getAttribute('id')}-error`);
    if (!errorMessage) {
      throw new Error('Нет спана для ошибки');
    }

    if (passwordInput.value !== input.value) {
      errorMessage.textContent = 'Пароли не совпадают';
      input.classList.add('invalid');
    } else if (!passwordInput.value) {
      errorMessage.textContent = 'Пароль не заполнен';
      input.classList.add('invalid');
    } else {
      errorMessage.textContent = '';
      input.classList.remove('invalid');
    }
  }

  render() {
    const source = `
    <main class="register-form-container">
      {{{ registerForm }}}
    </main>
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
        events: this._events,
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
        inputName: 'login',
        events: this._events,
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
        inputName: 'first_name',
        events: this._events,
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
        inputName: 'second_name',
        events: this._events,
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
        inputName: 'phone',
        events: this._events,
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
        inputName: 'password',
        events: this._events,
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
        inputName: 'repeat_password',
        events: {
          blur: this._chekPasswordRepeat.bind(this),
          focus: this._chekPasswordRepeat.bind(this),
        },
      }),
    });

    const registerBtn = new Button({
      className: 'btn-black',
      label: 'Зарегистрироваться',
      type: 'submit',
    });

    const loginLink = new Link({
      className: 'simple-link',
      path: 'login',
      text: 'Войти',
    });

    const registerInputsBlock = new Container({
      items: [
        emailFormGroup,
        loginFormGroup,
        firstNameFormGroup,
        secondNameFormGroup,
        phoneFormGroup,
        passwordFormGroup,
        repeatPasswordFormGroup,
      ],
    });

    const onRegisterFormSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const inputs = target.querySelectorAll('input');
      let errors: string[] = [];
      if (!inputs) {
        return;
      }
      inputs.forEach((input) => {
        const validator = new Validator();
        const fieldErrors = validator.validateInput(input);
        errors = [...errors, ...fieldErrors];
      });
      if (errors.length > 0) {
        console.log(errors);
        return;
      }
      const formData: Record<string, unknown> = {};
      inputs.forEach((input) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        formData[input.getAttribute('id')!] = input.value;
      });
      console.log(formData as RegistrationData);

      this._registrationController.registration(formData as RegistrationData);
    };

    const registerForm = new Form({
      className: 'register-form',
      formItems: [formHeader, registerInputsBlock, registerBtn, loginLink],
      events: {
        submit: onRegisterFormSubmit,
      },
    });

    return compileComponent(source, {
      ...this.props,
      registerForm,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    userId: state.profileState.user.id,
  };
}

export default connect<BasePropsType>(mapStateToProps)(Registration);
