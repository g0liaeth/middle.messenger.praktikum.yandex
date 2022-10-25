import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';

export type UserAvatarPropsType = {
  className?: string;
  imgPath: string;
};

export default class UserAvatar extends Block<UserAvatarPropsType> {
  constructor(props: UserAvatarPropsType) {
    super(props);
  }

  render() {
    const source = `
    <div class="avatar-shield">
      <img src={{ imgPath }} alt="avatar" class="avatar-img">
    </div>
    `;

    return compileComponent(source, this.props);
  }
}
