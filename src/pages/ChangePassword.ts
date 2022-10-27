import Badge from '../components/Badge/Badge';
import Button from '../components/Button/Button';
import FormGroup from '../components/FormGroup/FormGroup';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Text from '../components/Text/Text';
import img from '../static/mock-ava.png';
import { BasePropsType } from '../types/componentTypes';
import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';
import Validator from '../utils/Validator';

export default class ChangePassword extends Block<BasePropsType> {
  private _events = {};

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
    const passwordInput = document.querySelector('#newPassword') as HTMLInputElement;
    const errorMessage = document.querySelector(`#${input.getAttribute('id')}-error`);
    if (!errorMessage) {
      throw new Error('Нет спана для ошибки');
    }
    if (passwordInput.value !== input.value) {
      errorMessage.textContent = 'Пароли не совпадают';
      input.classList.add('invalid');
    } else {
      errorMessage.textContent = '';
      input.classList.remove('invalid');
    }
  }

  render() {
    const source = `
    <main class="main-container">
      {{{ profileImg }}}
      {{{ userName }}}
      
      <form>
        {{{ oldPasswordFormGroup }}}
        {{{ newPasswordFormGroup }}}
        {{{ repeatNewPasswordFormGroup }}}
      </form>
      
      {{{ btnSave }}}
    </main>
    `;

    const profileImg = new Badge({
      imgPath: img,
    });

    const userName = new Text({
      className: 'profile-name',
      value: 'Иван',
    });

    const oldPasswordFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'oldPassword',
        text: 'Старый пароль',
      }),
      input: new Input({
        className: 'profile-editable-input',
        inputType: 'password',
        inputId: 'oldPassword',
        inputName: 'user_old_password',
        events: this._events,
      }),
    });

    const newPasswordFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'newPassword',
        text: 'Новый пароль',
      }),
      input: new Input({
        className: 'profile-editable-input',
        inputType: 'password',
        inputId: 'newPassword',
        inputName: 'user_new_password',
        events: this._events,
      }),
    });

    const repeatNewPasswordFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'repeatNewPassword',
        text: 'Повторите новый пароль',
      }),
      input: new Input({
        className: 'profile-editable-input',
        inputType: 'password',
        inputId: 'repeatNewPassword',
        inputName: 'user_repeat_new_password',
        events: {
          blur: this._chekPasswordRepeat.bind(this),
          focus: this._chekPasswordRepeat.bind(this),
        },
      }),
    });

    const btnSave = new Button({
      label: 'Сохранить',
      className: 'btn-change',
      events: {
        click: (event) => {
          event.preventDefault();
          const target = event.target as HTMLElement;
          const inputs = target.parentElement?.querySelectorAll('input');
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
            formData[input.getAttribute('id')!] = input.value;
          });
          console.log(formData);
        },
      },
    });

    return compileComponent(source, {
      ...this.props,
      profileImg,
      userName,
      oldPasswordFormGroup,
      newPasswordFormGroup,
      repeatNewPasswordFormGroup,
      btnSave,
    });
  }
}
