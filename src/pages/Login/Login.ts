import Button from '../../components/Button/Button';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import Link from '../../components/Link/Link';
import Text from '../../components/Text/Text';
import { LoginData } from '../../types/commonTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import Validator from '../../utils/Validator';
import LoginController from './LoginController';
import connect from '../../utils/Store/connect';
import { BasePropsType } from '../../types/componentTypes';
import Form from '../../components/Form/Form';
import Container from '../../components/Container/Container';

class Login<T extends BasePropsType> extends Block<T> {
  private _events = {};
  private _loginController: LoginController;

  constructor(props: T) {
    super(props);
    this._loginController = new LoginController();
    this._loginController.checkAuth();
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

  render() {
    const source = `
    <main class="login-form-container">
      {{{ loginForm }}}
    </main>
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
        inputName: 'login',
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

    const loginBtn = new Button({
      className: 'btn-black',
      label: 'Войти',
      type: 'submit',
    });

    const registerLink = new Link({
      className: 'simple-link',
      path: 'signup',
      text: 'Нет аккаунта?',
    });

    const loginInputsBlock = new Container({
      items: [loginFormGroup, passwordFormGroup],
    });

    const onLoginFormSubmit = (event: SubmitEvent) => {
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
      console.log(formData as LoginData);

      this._loginController.login(formData as LoginData);
    };

    const loginForm = new Form({
      className: 'login-form',
      formItems: [formHeader, loginInputsBlock, loginBtn, registerLink],
      events: {
        submit: onLoginFormSubmit,
      },
    });

    return compileComponent(source, {
      ...this.props,
      loginForm,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    userId: state.profileState.user.id,
  };
}

export default connect<BasePropsType>(mapStateToProps)(Login);
