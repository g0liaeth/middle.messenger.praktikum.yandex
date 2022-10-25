import Badge from '../components/Badge/Badge';
import Button from '../components/Button/Button';
import FormGroup from '../components/FormGroup/FormGroup';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Popup from '../components/Popup/Popup';
import Text from '../components/Text/Text';
import img from '../static/mock-ava.png';
import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export type ChangePasswordPropsType = {
  className?: string;
  backgroundColor?: string;
};

export default class ChangePassword extends Block<ChangePasswordPropsType> {
  constructor(props: ChangePasswordPropsType) {
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

      {{{ oldPasswordFormGroup }}}
      {{{ newPasswordFormGroup }}}
      {{{ repeatNewPasswordFormGroup }}}

      {{{ btnSave }}}
    </div>
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
      }),
    });

    const btnSave = new Button({
      label: 'Сохранить',
      className: 'btn-change',
      events: {
        click: () => {
          window.location.assign('profile');
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
