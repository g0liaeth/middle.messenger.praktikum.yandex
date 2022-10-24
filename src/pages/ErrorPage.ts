import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';
import Button from '../components/Button';
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
      <span class={{ codeClassName }}>{{ codeValue }}</span>
      <span class={{ textClassName }}>{{ textValue }}</span>
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

    return compileComponent(source, { ...this.props, buttonBack });
  }
}
