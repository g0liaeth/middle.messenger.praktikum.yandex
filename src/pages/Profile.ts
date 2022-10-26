import Badge from '../components/Badge/Badge';
import Button from '../components/Button/Button';
import FormGroup from '../components/FormGroup/FormGroup';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Popup from '../components/Popup/Popup';
import Text from '../components/Text/Text';
import img from '../static/mock-ava.png';
import { ProfilePropsType } from '../types/componentTypes';
import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export default class Profile extends Block<ProfilePropsType> {
  constructor(props: ProfilePropsType) {
    super(props);
  }

  componentDidMount(props: any): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
  }

  render() {
    const source = `
    <div class="main-container">
      {{{ profileImg }}}
      {{{ userName }}}

      {{{ emailFormGroup }}}
      {{{ loginFormGroup }}}
      {{{ firstNameFormGroup }}}
      {{{ secondNameFormGroup }}}
      {{{ phoneFormGroup }}}

      {{{ btnProfileEdit }}}
      {{{ btnChangePassword }}}
      {{{ btnExit }}}
      {{{ btnBack }}}

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
        className: 'profile-input',
        inputType: 'email',
        inputId: 'email',
        inputName: 'user_email',
        disabled: 'disabled',
        inputValue: 'abcd@yandex.ru',
      }),
    });

    const loginFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'login',
        text: 'Логин',
      }),
      input: new Input({
        className: 'profile-input',
        inputType: 'text',
        inputId: 'login',
        inputName: 'user_login',
        disabled: 'disabled',
        inputValue: 'ivan665566966',
      }),
    });

    const firstNameFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'first_name',
        text: 'Имя',
      }),
      input: new Input({
        className: 'profile-input',
        inputType: 'text',
        inputId: 'first_name',
        inputName: 'user_first_name',
        disabled: 'disabled',
        inputValue: 'Иван',
      }),
    });

    const secondNameFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'second_name',
        text: 'Фамилия',
      }),
      input: new Input({
        className: 'profile-input',
        inputType: 'text',
        inputId: 'second_name',
        inputName: 'user_second_name',
        disabled: 'disabled',
        inputValue: 'Иванов',
      }),
    });

    const phoneFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'phone',
        text: 'Телефон',
      }),
      input: new Input({
        className: 'profile-input',
        inputType: 'tel',
        inputId: 'phone',
        inputName: 'user_phone',
        disabled: 'disabled',
        inputValue: '8-999-999-99-99',
      }),
    });

    const userName = new Text({
      className: 'profile-name',
      value: 'Иван',
    });

    const btnProfileEdit = new Button({
      label: 'Изменить данные',
      className: 'btn-change',
      events: {
        click: () => {
          window.location.assign('edit-profile');
        },
      },
    });

    const btnChangePassword = new Button({
      label: 'Изменить пароль',
      className: 'btn-change',
      events: {
        click: () => {
          window.location.assign('change-password');
        },
      },
    });

    const btnExit = new Button({
      label: 'Выйти',
      className: 'btn-exit',
      events: {
        click: () => {
          window.location.assign('/');
        },
      },
    });

    const btnBack = new Button({
      label: '< назад к чатам',
      className: 'btn-back',
      events: {
        click: () => {
          window.location.assign('/chat');
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
      btnProfileEdit,
      btnChangePassword,
      btnExit,
      btnBack,
      emailFormGroup,
      loginFormGroup,
      firstNameFormGroup,
      secondNameFormGroup,
      phoneFormGroup,
      popup,
    });
  }
}
