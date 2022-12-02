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
import Validator from '../../utils/Validator';
import RegistrationController from './RegistrationController';

export default class Registration extends Block<BasePropsType> {
  private _controller: RegistrationController;

  constructor(tag = 'main', props?: BasePropsType) {
    super(tag, { ...props, class: 'register-form-container' });
    this._controller = new RegistrationController();
    this._controller.checkAuth();
  }

  render() {
    console.log('render signup', this._props);

    const source = `{{{ registerForm }}}`;

    const onFocusChange = (event: Event) => {
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
    };

    const chekPasswordRepeat = (event: Event) => {
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
    };

    const inputEvents = {
      onBlur: onFocusChange,
      onFocus: onFocusChange,
      onKeyup: onFocusChange,
    };

    const formHeader = new Text(undefined, {
      class: 'header-form',
      data: {
        value: 'Регистрация',
      },
    });

    const emailFormGroup = new FormGroup(undefined, {
      class: 'form-group',
      label: new Label(undefined, {
        class: 'login-label',
        for: 'email',
        data: {
          text: 'Почта',
        },
      }),
      input: new Input(undefined, {
        class: 'login-input',
        type: 'email',
        id: 'email',
        name: 'user_email',
        ...inputEvents,
      }),
    });

    const loginFormGroup = new FormGroup(undefined, {
      class: 'form-group',
      label: new Label(undefined, {
        class: 'login-label',
        for: 'login',
        data: {
          text: 'Логин',
        },
      }),
      input: new Input(undefined, {
        class: 'login-input',
        type: 'text',
        id: 'login',
        name: 'login',
        ...inputEvents,
      }),
    });

    const firstNameFormGroup = new FormGroup(undefined, {
      class: 'form-group',
      label: new Label(undefined, {
        class: 'login-label',
        for: 'first_name',
        data: {
          text: 'Имя',
        },
      }),
      input: new Input(undefined, {
        class: 'login-input',
        type: 'text',
        id: 'first_name',
        name: 'first_name',
        ...inputEvents,
      }),
    });

    const secondNameFormGroup = new FormGroup(undefined, {
      class: 'form-group',
      label: new Label(undefined, {
        class: 'login-label',
        for: 'second_name',
        data: {
          text: 'Фамилия',
        },
      }),
      input: new Input(undefined, {
        class: 'login-input',
        type: 'text',
        id: 'second_name',
        name: 'second_name',
        ...inputEvents,
      }),
    });

    const phoneFormGroup = new FormGroup(undefined, {
      class: 'form-group',
      label: new Label(undefined, {
        class: 'login-label',
        for: 'phone',
        data: {
          text: 'Телефон',
        },
      }),
      input: new Input(undefined, {
        class: 'login-input',
        type: 'tel',
        id: 'phone',
        name: 'phone',
        ...inputEvents,
      }),
    });

    const passwordFormGroup = new FormGroup(undefined, {
      class: 'form-group',
      label: new Label(undefined, {
        class: 'login-label',
        for: 'password',
        data: {
          text: 'Пароль',
        },
      }),
      input: new Input(undefined, {
        class: 'login-input',
        type: 'password',
        id: 'password',
        name: 'password',
        ...inputEvents,
      }),
    });

    const repeatPasswordFormGroup = new FormGroup(undefined, {
      class: 'form-group',
      label: new Label(undefined, {
        class: 'login-label',
        for: 'repeat_password',
        data: {
          text: 'Пароль (ещё раз)',
        },
      }),
      input: new Input(undefined, {
        class: 'login-input',
        type: 'password',
        id: 'repeat_password',
        name: 'repeat_password',
        onBlur: chekPasswordRepeat,
        onFocus: chekPasswordRepeat,
        onKeyup: chekPasswordRepeat,
      }),
    });

    const registerBtn = new Button(undefined, {
      class: 'btn-black',
      type: 'submit',
      data: {
        label: 'Зарегистрироваться',
      },
    });

    const loginLink = new Link(undefined, {
      class: 'simple-link',
      href: 'login',
      data: {
        text: 'Войти',
      },
    });

    const registerInputsBlock = new Container(undefined, {
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

      this._controller.registration(formData as RegistrationData);
    };

    const registerForm = new Form(undefined, {
      class: 'register-form',
      formItems: [formHeader, registerInputsBlock, registerBtn, loginLink],
      onSubmit: onRegisterFormSubmit,
    });

    return compileComponent(source, {
      ...this._props,
      registerForm,
    });
  }
}
