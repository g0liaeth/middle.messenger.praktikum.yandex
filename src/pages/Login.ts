import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export type LoginPropsType = {};

export default class Login extends Block<LoginPropsType> {
  constructor(props: LoginPropsType) {
    super(props);
  }

  render() {
    const source = `<div>Login stub</div>`;

    return compileComponent(source, this.props);
  }
}
