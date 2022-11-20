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
        {{{ popupItems }}}
      </div>
    </div>
    `;

    return compileComponent(source, { ...this.props });
  }
}
