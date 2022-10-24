import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export type ProfilePropsType = {};

export default class Profile extends Block<ProfilePropsType> {
  constructor(props: ProfilePropsType) {
    super(props);
  }

  render() {
    const source = `<div>Profile stub</div>`;

    return compileComponent(source, this.props);
  }
}
