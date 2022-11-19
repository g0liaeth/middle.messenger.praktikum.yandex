import { PopupPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import Button from '../Button/Button';
import Form from '../Form/Form';
import FormGroup from '../FormGroup/FormGroup';
import Input from '../Input/Input';
import Label from '../Label/Label';
import Text from '../Text/Text';

export default class Popup extends Block<PopupPropsType> {
  render() {
    const source = `
    <div class="popup">
      <div class="popup-body">
        {{{ uploadPhotForm }}}
      </div>
    </div>
    `;

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
      this.props.uploadImage(inputs[0].files[0]);
    };

    const uploadPhotForm = new Form({
      className: 'popup-content',
      formItems: [popupHeader, popupContent, btnUpload],
      events: {
        submit: onUploadPhotoFormSubmit,
      },
    });

    return compileComponent(source, { ...this.props, uploadPhotForm });
  }
}
