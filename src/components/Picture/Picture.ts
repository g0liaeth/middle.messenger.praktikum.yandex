import { PicturePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Picture extends Block<PicturePropsType> {
  render() {
    const source = `<img class="{{ className }}" src="{{ src }}" alt="{{ alt }}">`;

    return compileComponent(source, this._props);
  }
}
