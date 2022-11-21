import { PopupPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

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
