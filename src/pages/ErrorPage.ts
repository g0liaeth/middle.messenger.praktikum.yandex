import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';
import Button from '../components/Button/Button';
import Text from '../components/Text/Text';
import Chat from './Chat';

type ErrorPagePropsType = {
  codeClassName: string;
  codeValue: string;
  textClassName: string;
  textValue: string;
  bindedBlock?: Chat;
};

export default class ErrorPage extends Block<ErrorPagePropsType> {
  constructor(props: ErrorPagePropsType) {
    super(props);
  }

  render() {
    const source = `
    <div class="main-container">
      {{{ errorStatus }}}
      {{{ errorText }}}
      {{{ buttonBack }}}
    </div>
    `;

    const buttonBack = new Button({
      label: 'Назад к чатам',
      className: 'btn-green',
      events: {
        click: () => {
          window.location.assign('chat');
        },
      },
    });

    const errorStatus = new Text({
      className: this.props.codeClassName,
      value: this.props.codeValue,
    });

    const errorText = new Text({
      className: this.props.textClassName,
      value: this.props.textValue,
    });

    return compileComponent(source, { ...this.props, buttonBack, errorStatus, errorText });
  }
}
