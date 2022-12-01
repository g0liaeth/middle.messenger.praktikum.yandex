import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
// import { ErrorPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Error extends Block<any> {
  constructor(props: any) {
    super('main', { ...props, class: 'main-container' });
  }

  render() {
    const source = `
      {{{ errorStatus }}}
      {{{ errorText }}}
      {{{ buttonBack }}}
    `;

    const buttonBack = new Button({
      class: 'btn-green',
      type: 'button',
      data: {
        label: 'Назад к чатам',
      },
      onClick: () => {
        window.location.assign('chat');
      },
    });

    const errorStatus = new Text({
      class: this._props.codeClassName,
      data: {
        value: this._props.codeValue ? this._props.codeValue : '',
      },
    });

    const errorText = new Text({
      class: this._props.textClassName,
      data: {
        value: this._props.textValue ? this._props.textValue : '',
      },
    });

    return compileComponent(source, { ...this._props, buttonBack, errorStatus, errorText });
  }
}
