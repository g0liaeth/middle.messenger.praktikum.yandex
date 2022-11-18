import { ListItemPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class ListItem extends Block<ListItemPropsType> {
  render() {
    const source = `<li id={{ id }} class="{{ className }}">{{ content }}</li>`;

    return compileComponent(source, this.props);
  }
}
