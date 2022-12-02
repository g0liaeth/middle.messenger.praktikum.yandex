import { ListItemPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class ListItem extends Block<ListItemPropsType> {
  constructor(tag = 'li', props?: ListItemPropsType) {
    super(tag, props);
  }

  render() {
    const source = `{{ data.content }}`;

    return compileComponent(source, this._props);
  }
}
