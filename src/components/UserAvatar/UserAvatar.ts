import { UserAvatarPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class UserAvatar extends Block<UserAvatarPropsType> {
  render() {
    const source = `
    <div class="avatar-shield">
      <img src={{ imgPath }} alt="avatar" class="avatar-img">
    </div>
    `;

    return compileComponent(source, this.props);
  }
}
