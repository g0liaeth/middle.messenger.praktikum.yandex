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
import { ChangeProfileData, PlainObject } from '../../types/commonTypes';
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import { AppStateType } from '../../utils/Store/initialState/initialState';
import Validator from '../../utils/Validator';
import EditProfileController from './EditProfileController';

export default class EditProfile extends Block<
  BasePropsType & Pick<AppStateType['profileState'], 'user'>
> {
  protected _controller: EditProfileController;

  constructor(tag = 'main', props?: BasePropsType & Pick<AppStateType['profileState'], 'user'>) {
    super(tag, { ...props, class: 'main-container' } as BasePropsType &
      Pick<AppStateType['profileState'], 'user'>);
    this._controller = new EditProfileController();
    this._controller.getUserDetails(this);
  }

  render() {
    console.log('edit-profile render', this._props);

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

    const profileImg = new Badge(undefined, {
      class: 'img-back',
      data: {
        imgPath: this._props?.user && UPLOAD_URL + this._props?.user?.avatar,
      },
      onClick: () => {
        popup.show();
      },
    });

    const emailFormGroup = new FormGroup(undefined, {
      class: 'form-group-profile',
      label: new Label(undefined, {
        for: 'email',
        data: {
          text: 'Почта',
        },
      }),
      input: new Input(undefined, {
        class: 'profile-editable-input',
        type: 'email',
        id: 'email',
        name: 'email',
        value: this._props?.user?.email,
        ...inputEvents,
      }),
    });

    const loginFormGroup = new FormGroup(undefined, {
      class: 'form-group-profile',
      label: new Label(undefined, {
        for: 'login',
        data: {
          text: 'Логин',
        },
      }),
      input: new Input(undefined, {
        class: 'profile-editable-input',
        type: 'text',
        id: 'login',
        name: 'login',
        value: this._props?.user?.login,
        ...inputEvents,
      }),
    });

    const displayNameFormGroup = new FormGroup(undefined, {
      class: 'form-group-profile',
      label: new Label(undefined, {
        for: 'display_name',
        data: {
          text: 'Отображаемое имя',
        },
      }),
      input: new Input(undefined, {
        class: 'profile-editable-input',
        type: 'text',
        id: 'display_name',
        name: 'display_name',
        value: this._props?.user?.display_name,
        ...inputEvents,
      }),
    });

    const firstNameFormGroup = new FormGroup(undefined, {
      class: 'form-group-profile',
      label: new Label(undefined, {
        for: 'first_name',
        data: {
          text: 'Имя',
        },
      }),
      input: new Input(undefined, {
        class: 'profile-editable-input',
        type: 'text',
        id: 'first_name',
        name: 'first_name',
        value: this._props?.user?.first_name,
        ...inputEvents,
      }),
    });

    const secondNameFormGroup = new FormGroup(undefined, {
      class: 'form-group-profile',
      label: new Label(undefined, {
        for: 'second_name',
        data: {
          text: 'Фамилия',
        },
      }),
      input: new Input(undefined, {
        class: 'profile-editable-input',
        type: 'text',
        id: 'second_name',
        name: 'second_name',
        value: this._props?.user?.second_name,
        ...inputEvents,
      }),
    });

    const phoneFormGroup = new FormGroup(undefined, {
      class: 'form-group-profile',
      label: new Label(undefined, {
        for: 'phone',
        data: {
          text: 'Телефон',
        },
      }),
      input: new Input(undefined, {
        class: 'profile-editable-input',
        type: 'tel',
        id: 'phone',
        name: 'phone',
        value: this._props?.user?.phone,
        ...inputEvents,
      }),
    });

    const userName = new Text(undefined, {
      class: 'profile-name',
      //@ts-expect-error problem typing props from HOC
      value: this._props?.user?.login,
    });

    const btnSave = new Button(undefined, {
      class: 'btn-change',
      type: 'submit',
      data: {
        label: 'Сохранить',
      },
    });

    const popupHeader = new Text(undefined, {
      class: 'header-form-md',
      data: {
        value: 'Загрузить файл',
      },
    });

    const popupContent = new FormGroup(undefined, {
      label: new Label(undefined, {
        for: 'myfile',
      }),
      input: new Input(undefined, {
        type: 'file',
        id: 'myfile',
        name: 'myfile',
      }),
    });

    const btnUpload = new Button(undefined, {
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
      popup.hide();
      // @ts-expect-error because of ??? need to research
      this._controller.changeAvatar(inputs[0].files[0]);
    };

    const uploadPhotoForm = new Form(undefined, {
      class: 'upload-photo-form',
      formItems: [popupHeader, popupContent, btnUpload],
      onSubmit: onUploadPhotoFormSubmit,
    });

    const popup = new Popup(undefined, {
      class: 'popup',
      popupItems: [uploadPhotoForm],
      onClick: (event) => {
        if ((event.target as HTMLElement).classList.contains('popup-body')) {
          popup.hide();
        }
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
      const formData: PlainObject = {};
      inputs.forEach((input) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        formData[input.getAttribute('id')!] = input.value;
      });
      console.log(formData);
      this._controller.changeProfile(formData as ChangeProfileData);
    };

    const buttobsBlock = new Container(undefined, {
      class: 'edit-profile-form-buttons-container',
      items: [btnSave, btnCancel],
    });

    const editProfileForm = new Form(undefined, {
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
