import { PopupPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import Button from '../Button/Button';
import FormGroup from '../FormGroup/FormGroup';
import Input from '../Input/Input';
import Label from '../Label/Label';
import Text from '../Text/Text';

export default class Popup extends Block<PopupPropsType> {
  render() {
    const source = `
    <div class="popup">
      <div class="popup-body">
        <div class="popup-content">
          {{{ popupHeader }}}
          {{{ popupContent }}}
          {{{ btnUpload }}}
        </div>
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
      events: {
        click: () => {
          window.location.assign('profile');
        },
      },
    });

    return compileComponent(source, { ...this.props, popupHeader, btnUpload, popupContent });
  }
}
