import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export type ChangePasswordPropsType = {};

export default class ChangePassword extends Block<ChangePasswordPropsType> {
  constructor(props: ChangePasswordPropsType) {
    super(props);
  }

  render() {
    const source = `<div>ChangePassword stub</div>`;

    return compileComponent(source, this.props);
  }
}
