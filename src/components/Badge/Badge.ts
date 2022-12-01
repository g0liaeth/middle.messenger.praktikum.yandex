import { BadgePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Badge extends Block<BadgePropsType> {
  constructor(props: BadgePropsType) {
    super('div', props);
  }

  render() {
    const source = `
      <img src={{ imgPath }} alt="avatar" class="profile-img">
      <span class="img-back-text">Поменять аватар</span>
    `;

    return compileComponent(source, this._props);
  }
}
