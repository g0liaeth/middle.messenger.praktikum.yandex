import Block from './utils/Block';
import compileComponent from './utils/compileComponent';
import Button from './Button';

type ErrorPagePropsType = {
  codeClassName: string;
  codeValue: string;
  textClassName: string;
  textValue: string;
};

export default class ErrorPage extends Block<ErrorPagePropsType> {
  constructor(props: ErrorPagePropsType) {
    super(props);
  }

  render() {
    const source = `
    <div>
      <span class={{ codeClassName }}>{{ codeValue }}</span>
      <span class={{ textClassName }}>{{ textValue }}</span>
      {{{ buttonBack }}}
    </div>
    `;

    const buttonBack = new Button({
      label: 'Назад к чатам',
      className: 'btn-green',
    });

    return compileComponent(source, {...this.props, buttonBack});
  }
}
