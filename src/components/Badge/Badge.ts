import { BadgePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Badge extends Block<BadgePropsType> {
  constructor(tag = 'div', props?: BadgePropsType) {
    super(tag, props);
  }

  render() {
    const source = `
      <img src={{ data.imgPath }} alt="avatar" class="profile-img">
      <span class="img-back-text">Поменять аватар</span>
    `;

    return compileComponent(source, this._props);
  }
}
