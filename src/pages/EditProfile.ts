import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export type EditProfilePropsType = {};

export default class EditProfile extends Block<EditProfilePropsType> {
  constructor(props: EditProfilePropsType) {
    super(props);
  }

  render() {
    const source = `<div>EditProfile stub</div>`;

    return compileComponent(source, this.props);
  }
}
