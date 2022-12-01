import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Form from '../../components/Form/Form';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import Popup from '../../components/Popup/Popup';
import Text from '../../components/Text/Text';
import { UPLOAD_URL } from '../../constants/apiConstants';
import { ChangeProfileData } from '../../types/commonTypes';
// import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import connect from '../../utils/Store/connect';
import Validator from '../../utils/Validator';
import EditProfileController from './EditProfileController';

class EditProfile extends Block<any> {
  protected _controller: EditProfileController;

  constructor(props: any) {
    super('main', { ...props, class: 'main-container' });
    this._controller = new EditProfileController();
    this._controller.fetchUser();
  }

  render() {
    const source = `
      {{{ profileImg }}}
      {{{ userName }}}

      {{{ editProfileForm }}}

      {{{ btnSave }}}
      {{{ btnCancel }}}

      {{{ popup }}}
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

    const inputEvents = {
      onBlur: onFocusChange,
      onFocus: onFocusChange,
      onKeyup: onFocusChange,
    };

    const profileImg = new Badge({
      class: 'img-back',
      data: {
        imgPath: Object.prototype.hasOwnProperty.call(this._props.userInfo, 'avatar')
          ? UPLOAD_URL + this._props.userInfo.avatar
          : null,
      },
      onClick: () => {
        popup.show();
      },
    });

    const emailFormGroup = new FormGroup({
      class: 'form-group-profile',
      label: new Label({
        for: 'email',
        data: {
          text: 'Почта',
        },
      }),
      input: new Input({
        class: 'profile-editable-input',
        type: 'email',
        id: 'email',
        name: 'email',
        value: this._props.userInfo.email,
        ...inputEvents,
      }),
    });

    const loginFormGroup = new FormGroup({
      class: 'form-group-profile',
      label: new Label({
        for: 'login',
        data: {
          text: 'Логин',
        },
      }),
      input: new Input({
        class: 'profile-editable-input',
        type: 'text',
        id: 'login',
        name: 'login',
        value: this._props.userInfo.login,
        ...inputEvents,
      }),
    });

    const displayNameFormGroup = new FormGroup({
      class: 'form-group-profile',
      label: new Label({
        for: 'display_name',
        data: {
          text: 'Отображаемое имя',
        },
      }),
      input: new Input({
        class: 'profile-editable-input',
        type: 'text',
        id: 'display_name',
        name: 'display_name',
        value: this._props.userInfo.display_name,
        ...inputEvents,
      }),
    });

    const firstNameFormGroup = new FormGroup({
      class: 'form-group-profile',
      label: new Label({
        for: 'first_name',
        data: {
          text: 'Имя',
        },
      }),
      input: new Input({
        class: 'profile-editable-input',
        type: 'text',
        id: 'first_name',
        name: 'first_name',
        value: this._props.userInfo.first_name,
        ...inputEvents,
      }),
    });

    const secondNameFormGroup = new FormGroup({
      class: 'form-group-profile',
      label: new Label({
        for: 'second_name',
        data: {
          text: 'Фамилия',
        },
      }),
      input: new Input({
        class: 'profile-editable-input',
        type: 'text',
        id: 'second_name',
        name: 'second_name',
        value: this._props.userInfo.second_name,
        ...inputEvents,
      }),
    });

    const phoneFormGroup = new FormGroup({
      class: 'form-group-profile',
      label: new Label({
        for: 'phone',
        data: {
          text: 'Телефон',
        },
      }),
      input: new Input({
        class: 'profile-editable-input',
        type: 'tel',
        id: 'phone',
        name: 'phone',
        value: this._props.userInfo.phone,
        ...inputEvents,
      }),
    });

    const userName = new Text({
      class: 'profile-name',
      //@ts-expect-error problem typing props from HOC
      value: this._props.userInfo.login,
    });

    const btnSave = new Button({
      class: 'btn-change',
      type: 'submit',
      data: {
        label: 'Сохранить',
      },
    });

    const popupHeader = new Text({
      class: 'header-form-md',
      data: {
        value: 'Загрузить файл',
      },
    });

    const popupContent = new FormGroup({
      label: new Label({
        for: 'myfile',
      }),
      input: new Input({
        type: 'file',
        id: 'myfile',
        name: 'myfile',
      }),
    });

    const btnUpload = new Button({
      class: 'btn-black-w100',
      type: 'submit',
      data: {
        label: 'Поменять',
      },
    });

    const onUploadPhotoFormSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const inputs = target.querySelectorAll('input');

      // @ts-expect-error because of ??? need to research
      this._controller.changeAvatar(inputs[0].files[0]);
    };

    const uploadPhotoForm = new Form({
      class: 'upload-photo-form',
      formItems: [popupHeader, popupContent, btnUpload],
      onSubmit: onUploadPhotoFormSubmit,
    });

    const popup = new Popup({
      class: 'popup',
      popupItems: [uploadPhotoForm],
      onClick: (event) => {
        if (event.target === event.currentTarget) {
          popup.hide();
        }
      },
    });

    const btnCancel = new Button({
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

    const onEditProfileFormSubmit = (event: SubmitEvent) => {
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
      this._controller.changeProfile(formData as ChangeProfileData);
    };

    const buttobsBlock = new Container({
      class: 'edit-profile-form-buttons-container',
      items: [btnSave, btnCancel],
    });

    const editProfileForm = new Form({
      formItems: [
        emailFormGroup,
        loginFormGroup,
        displayNameFormGroup,
        firstNameFormGroup,
        secondNameFormGroup,
        phoneFormGroup,
        buttobsBlock,
      ],
      onSubmit: onEditProfileFormSubmit,
    });

    popup.hide();

    return compileComponent(source, {
      ...this._props,
      profileImg,
      userName,
      editProfileForm,
      popup,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    userInfo: state.profileState.user,
  };
}

export default connect<any>(mapStateToProps)(EditProfile);
