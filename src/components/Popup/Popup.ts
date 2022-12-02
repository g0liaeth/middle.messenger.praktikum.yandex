import { PopupPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Popup extends Block<PopupPropsType> {
  constructor(tag = 'div', props?: PopupPropsType) {
    super(tag, props);
  }

  render() {
    const source = `
      <div class="popup-body">
        {{{ popupItems }}}
      </div>
    `;

    return compileComponent(source, { ...this._props });
  }
}
