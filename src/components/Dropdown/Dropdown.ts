import { DropdownPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Dropdown extends Block<DropdownPropsType> {
  render() {
    const source = `
    <div id="dropdown" class="dropdown-wrapper {{ className }}">
      <ul class="dropdown-list">
        {{{ listItems }}}
      </ul>
    </div>
    `;

    return compileComponent(source, this.props);
  }
}
