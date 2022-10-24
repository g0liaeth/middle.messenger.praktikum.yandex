import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export type SigninPropsType = {};

export default class Signin extends Block<SigninPropsType> {
  constructor(props: SigninPropsType) {
    super(props);
  }

  render() {
    const source = `<div>Signin stub</div>`;

    return compileComponent(source, this.props);
  }
}
