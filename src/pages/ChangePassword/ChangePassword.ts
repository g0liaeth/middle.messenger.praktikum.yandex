import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import { ChangePasswordData } from '../../types/commonTypes';
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import Validator from '../../utils/Validator';
import ChangePasswordController from './ChangePasswordController';

export default class ChangePassword<T extends BasePropsType> extends Block<T> {
  private _events = {};
  protected _changePasswordController: ChangePasswordController;

  constructor(props: T) {
    super(props);
    this._changePasswordController = new ChangePasswordController();
    this._changePasswordController.fetchUser();
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
    const passwordInput = document.querySelector('#newPassword') as HTMLInputElement;
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
    <main class="main-container">
      <h1>Смена пароля</h1>
      {{{ changePasswordForm }}}
      {{{ btnSave }}}
      {{{ btnCancel }}}
    </main>
    `;

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
        inputName: 'oldPassword',
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
        inputName: 'newPassword',
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
        inputName: 'repeatNewPassword',
        events: {
          blur: this._chekPasswordRepeat.bind(this),
          focus: this._chekPasswordRepeat.bind(this),
        },
      }),
    });

    const btnSave = new Button({
      label: 'Сохранить',
      className: 'btn-change',
      type: 'submit',
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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            formData[input.getAttribute('id')!] = input.value;
          });
          console.log(formData);
          if (formData.newPassword !== formData.repeatNewPassword) {
            return;
          }
          this._changePasswordController.changePassword(formData as ChangePasswordData);
        },
      },
    });

    const btnCancel = new Button({
      label: 'Отмена',
      className: 'btn-exit',
      type: 'button',
      events: {
        click: (event) => {
          event.preventDefault();
          this._changePasswordController.cancel();
        },
      },
    });

    const onChangePassowrdFormSubmit = (event: SubmitEvent) => {
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
      console.log(formData);
      this._changePasswordController.changePassword(formData as ChangePasswordData);
    };

    const changePasswordForm = new Form({
      formItems: [oldPasswordFormGroup, newPasswordFormGroup, repeatNewPasswordFormGroup],
      events: {
        submit: onChangePassowrdFormSubmit,
      },
    });

    return compileComponent(source, {
      ...this.props,
      changePasswordForm,
      btnSave,
      btnCancel,
    });
  }
}
