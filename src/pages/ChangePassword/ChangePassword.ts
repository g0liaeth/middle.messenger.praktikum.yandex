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

export default class ChangePassword extends Block<BasePropsType> {
  protected _controller: ChangePasswordController;

  constructor(tag = 'main', props?: BasePropsType) {
    super(tag, { ...props, class: 'main-container bg-white' });
    this._controller = new ChangePasswordController();
    this._controller.checkAuth();
  }

  render() {
    const source = `
      <h1>Смена пароля</h1>
      {{{ changePasswordForm }}}
      {{{ btnSave }}}
      {{{ btnCancel }}}
    `;

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

    const checkPasswordRepeat = (event: Event) => {
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
    };

    const inputEvents = {
      onBlur: onFocusChange,
      onFocus: onFocusChange,
      onKeyup: onFocusChange,
    };

    const oldPasswordFormGroup = new FormGroup(undefined, {
      class: 'form-group-profile',
      label: new Label(undefined, {
        for: 'oldPassword',
        data: {
          text: 'Старый пароль',
        },
      }),
      input: new Input(undefined, {
        class: 'profile-editable-input',
        type: 'password',
        id: 'oldPassword',
        name: 'oldPassword',
        ...inputEvents,
      }),
    });

    const newPasswordFormGroup = new FormGroup(undefined, {
      class: 'form-group-profile',
      label: new Label(undefined, {
        for: 'newPassword',
        data: {
          text: 'Новый пароль',
        },
      }),
      input: new Input(undefined, {
        class: 'profile-editable-input',
        type: 'password',
        id: 'newPassword',
        name: 'newPassword',
        ...inputEvents,
      }),
    });

    const repeatNewPasswordFormGroup = new FormGroup(undefined, {
      class: 'form-group-profile',
      label: new Label(undefined, {
        for: 'repeatNewPassword',
        data: {
          text: 'Повторите новый пароль',
        },
      }),
      input: new Input(undefined, {
        class: 'profile-editable-input',
        type: 'password',
        id: 'repeatNewPassword',
        name: 'repeatNewPassword',
        onBlur: checkPasswordRepeat,
        onFocus: checkPasswordRepeat,
        onKeyup: checkPasswordRepeat,
      }),
    });

    const btnSave = new Button(undefined, {
      class: 'btn-change',
      type: 'submit',
      data: {
        label: 'Сохранить',
      },
      onClick: (event) => {
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
        this._controller.changePassword(formData as ChangePasswordData);
      },
    });

    const btnCancel = new Button(undefined, {
      class: 'btn-exit',
      type: 'button',
      data: {
        label: 'Отмена',
      },
      onClick: (event) => {
        event.preventDefault();
        this._controller.cancel();
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
      this._controller.changePassword(formData as ChangePasswordData);
    };

    const changePasswordForm = new Form(undefined, {
      formItems: [oldPasswordFormGroup, newPasswordFormGroup, repeatNewPasswordFormGroup],
      onSubmit: onChangePassowrdFormSubmit,
    });

    return compileComponent(source, {
      ...this._props,
      changePasswordForm,
      btnSave,
      btnCancel,
    });
  }
}
