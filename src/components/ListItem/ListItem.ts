import { ListItemPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class ListItem extends Block<ListItemPropsType> {
  constructor(props: ListItemPropsType) {
    super('li', props);
  }

  render() {
    const source = `{{ data.content }}`;

    return compileComponent(source, this._props);
  }
}
