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
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import connect from '../../utils/Store/connect';
import Validator from '../../utils/Validator';
import EditProfileController from './EditProfileController';

class EditProfile<T extends BasePropsType> extends Block<T> {
  private _events = {};
  protected _editProfileController: EditProfileController;

  constructor(props: T) {
    super(props);
    this._editProfileController = new EditProfileController();
    this._editProfileController.fetchUser();
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
    <main class="main-container">
      {{{ profileImg }}}
      {{{ userName }}}

      {{{ editProfileForm }}}

      {{{ btnSave }}}
      {{{ btnCancel }}}

      {{{ popup }}}
    </main>
    `;

    const profileImg = new Badge({
      //@ts-expect-error problem typing props from HOC
      imgPath: Object.prototype.hasOwnProperty.call(this.props.userInfo, 'avatar')
        ? //@ts-expect-error problem typing props from HOC
          UPLOAD_URL + this.props.userInfo.avatar
        : null,
      events: {
        click: () => {
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
        inputName: 'email',
        //@ts-expect-error problem typing props from HOC
        inputValue: this.props.userInfo.email,
        events: this._events,
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
        inputName: 'login',
        //@ts-expect-error problem typing props from HOC
        inputValue: this.props.userInfo.login,
        events: this._events,
      }),
    });

    const displayNameFormGroup = new FormGroup({
      className: 'form-group-profile',
      label: new Label({
        labelFor: 'display_name',
        text: 'Отображаемое имя',
      }),
      input: new Input({
        className: 'profile-editable-input',
        inputType: 'text',
        inputId: 'display_name',
        inputName: 'display_name',
        //@ts-expect-error problem typing props from HOC
        inputValue: this.props.userInfo.display_name,
        events: this._events,
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
        inputName: 'first_name',
        //@ts-expect-error problem typing props from HOC
        inputValue: this.props.userInfo.first_name,
        events: this._events,
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
        inputName: 'second_name',
        //@ts-expect-error problem typing props from HOC
        inputValue: this.props.userInfo.second_name,
        events: this._events,
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
        inputName: 'phone',
        //@ts-expect-error problem typing props from HOC
        inputValue: this.props.userInfo.phone,
        events: this._events,
      }),
    });

    const userName = new Text({
      className: 'profile-name',
      //@ts-expect-error problem typing props from HOC
      value: this.props.userInfo.login,
    });

    const btnSave = new Button({
      label: 'Сохранить',
      className: 'btn-change',
      type: 'submit',
    });

    const popupHeader = new Text({
      className: 'header-form-md',
      value: 'Загрузить файл',
    });

    const popupContent = new FormGroup({
      className: '',
      label: new Label({
        labelFor: 'myfile',
        text: '',
      }),
      input: new Input({
        inputType: 'file',
        inputId: 'myfile',
        inputName: 'myfile',
      }),
    });

    const btnUpload = new Button({
      label: 'Поменять',
      className: 'btn-black-w100',
      type: 'submit',
    });

    const onUploadPhotoFormSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const inputs = target.querySelectorAll('input');

      // @ts-expect-error because of ??? need to research
      this._editProfileController.changeAvatar(inputs[0].files[0]);
    };

    const uploadPhotoForm = new Form({
      className: 'upload-photo-form',
      formItems: [popupHeader, popupContent, btnUpload],
      events: {
        submit: onUploadPhotoFormSubmit,
      },
    });

    const popup = new Popup({
      popupItems: [uploadPhotoForm],
      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            popup.hide();
          }
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
          this._editProfileController.cancel();
        },
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
      this._editProfileController.changeProfile(formData as ChangeProfileData);
    };

    const buttobsBlock = new Container({
      className: 'edit-profile-form-buttons-container',
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
      events: {
        submit: onEditProfileFormSubmit,
      },
    });

    popup.hide();

    return compileComponent(source, {
      ...this.props,
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

export default connect<BasePropsType>(mapStateToProps)(EditProfile);
