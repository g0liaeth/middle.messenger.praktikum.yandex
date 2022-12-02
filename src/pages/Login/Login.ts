import Button from '../../components/Button/Button';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import Link from '../../components/Link/Link';
import Text from '../../components/Text/Text';
// import { LoginData } from '../../types/commonTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import Validator from '../../utils/Validator';
// import LoginController from './LoginController';
import Form from '../../components/Form/Form';
import Container from '../../components/Container/Container';
import { BasePropsType } from '../../types/componentTypes';

class Login extends Block<BasePropsType> {
  // private _controller: LoginController;

  constructor(tag = 'main', props?: BasePropsType) {
    super(tag, { ...props, class: 'login-form-container' });
    // this._controller = new LoginController();
    // this._controller.checkAuth();
  }

  render() {
    const source = `{{{ loginForm }}}`;

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

    const formHeader = new Text(undefined, {
      class: 'header-form',
      data: {
        value: 'Вход',
      },
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
        onBlur: onFocusChange,
        onFocus: onFocusChange,
        onKeyup: onFocusChange,
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
        onBlur: onFocusChange,
        onFocus: onFocusChange,
        onKeyup: onFocusChange,
      }),
    });

    const loginBtn = new Button(undefined, {
      class: 'btn-black',
      data: {
        label: 'Войти',
      },
      type: 'submit',
    });

    const registerLink = new Link(undefined, {
      class: 'simple-link',
      href: 'signup',
      data: {
        text: 'Нет аккаунта?',
      },
    });

    const loginInputsBlock = new Container(undefined, {
      items: [loginFormGroup, passwordFormGroup],
    });

    const loginForm = new Form(undefined, {
      class: 'login-form',
      formItems: [formHeader, loginInputsBlock, loginBtn, registerLink],
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
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
        console.log(formData);

        // this._controller.login(formData as LoginData);
      },
    });

    return compileComponent(source, { ...this._props, loginForm });
  }
}

export default Login;
