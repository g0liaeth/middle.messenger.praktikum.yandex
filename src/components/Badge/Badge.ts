import { BadgePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export default class Badge extends Block<BadgePropsType> {
  render() {
    const source = `
    <div class="img-back">
      <img src={{ imgPath }} alt="avatar" class="profile-img">
      <span class="img-back-text">Поменять аватар</span>
    </div>
    `;

    return compileComponent(source, this.props);
  }
}
