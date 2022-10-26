import Badge from '../components/Badge/Badge';
import Button from '../components/Button/Button';
import FormGroup from '../components/FormGroup/FormGroup';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Popup from '../components/Popup/Popup';
import Text from '../components/Text/Text';
import img from '../static/mock-ava.png';
import { EditProfilePropsType } from '../types/componentTypes';
import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';
import Validator from '../utils/Validator';

export default class EditProfile extends Block<EditProfilePropsType> {
  constructor(props: EditProfilePropsType) {
    super(props);
  }

  componentDidMount(props: any): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
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
    <div class="main-container">
      {{{ profileImg }}}
      {{{ userName }}}

      <form>
        {{{ emailFormGroup }}}
        {{{ loginFormGroup }}}
        {{{ firstNameFormGroup }}}
        {{{ secondNameFormGroup }}}
        {{{ phoneFormGroup }}}
      </form>

      {{{ btnSave }}}

      {{{ popup }}}
    </div>
    `;

    const profileImg = new Badge({
      imgPath: img,
      events: {
        click: (event) => {
          popup.show();
        },
      },
    });

    const emailFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'email',
        text: 'Почта',
      }),
      input: new Input({
        className: 'profile-editable-input',
        inputType: 'email',
        inputId: 'email',
        inputName: 'user_email',
        inputValue: 'abcd@yandex.ru',
        events: {
          blur: this._onFocusChange.bind(this),
          focus: this._onFocusChange.bind(this),
        },
      }),
    });

    const loginFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'login',
        text: 'Логин',
      }),
      input: new Input({
        className: 'profile-editable-input',
        inputType: 'text',
        inputId: 'login',
        inputName: 'user_login',
        inputValue: 'ivan665566966',
        events: {
          blur: this._onFocusChange.bind(this),
          focus: this._onFocusChange.bind(this),
        },
      }),
    });

    const firstNameFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'first_name',
        text: 'Имя',
      }),
      input: new Input({
        className: 'profile-editable-input',
        inputType: 'text',
        inputId: 'first_name',
        inputName: 'user_first_name',
        inputValue: 'Иван',
        events: {
          blur: this._onFocusChange.bind(this),
          focus: this._onFocusChange.bind(this),
        },
      }),
    });

    const secondNameFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'second_name',
        text: 'Фамилия',
      }),
      input: new Input({
        className: 'profile-editable-input',
        inputType: 'text',
        inputId: 'second_name',
        inputName: 'user_second_name',
        inputValue: 'Иванов',
        events: {
          blur: this._onFocusChange.bind(this),
          focus: this._onFocusChange.bind(this),
        },
      }),
    });

    const phoneFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'phone',
        text: 'Телефон',
      }),
      input: new Input({
        className: 'profile-editable-input',
        inputType: 'tel',
        inputId: 'phone',
        inputName: 'user_phone',
        inputValue: '8-999-999-99-99',
        events: {
          blur: this._onFocusChange.bind(this),
          focus: this._onFocusChange.bind(this),
        },
      }),
    });

    const userName = new Text({
      className: 'profile-name',
      value: 'Иван',
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
          const formData = {};
          inputs.forEach((input) => {
            formData[input.getAttribute('id')!] = input.value;
          });
          console.log(formData);
        },
      },
    });

    const popup = new Popup({
      events: {
        click: (event) => {
          popup.hide();
        },
      },
    });

    popup.hide();

    return compileComponent(source, {
      ...this.props,
      profileImg,
      userName,
      emailFormGroup,
      loginFormGroup,
      firstNameFormGroup,
      secondNameFormGroup,
      phoneFormGroup,
      popup,
      btnSave,
    });
  }
}
