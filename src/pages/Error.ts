import Button from '../components/Button/Button';
import Text from '../components/Text/Text';
import { ErrorPropsType } from '../types/componentTypes';
import Block from '../utils/Block';
import compileComponent from '../utils/compileComponent';

export default class Error extends Block<ErrorPropsType> {
  componentDidMount(): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
  }

  render() {
    const source = `
    <main class="main-container">
      {{{ errorStatus }}}
      {{{ errorText }}}
      {{{ buttonBack }}}
    </main>
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
