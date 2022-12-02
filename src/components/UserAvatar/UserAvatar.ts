import { UserAvatarPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class UserAvatar extends Block<UserAvatarPropsType> {
  constructor(tag = 'div', props?: UserAvatarPropsType) {
    super(tag, props);
  }

  render() {
    const source = `
      <img src={{ data.imgPath }} alt="chat-avatar" class="avatar-img">
    `;

    return compileComponent(source, this._props);
  }
}
