import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import { ErrorPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';

export default class Error extends Block<ErrorPropsType> {
  constructor(tag = 'main', props?: ErrorPropsType) {
    super(tag, { ...props, class: 'main-container' } as ErrorPropsType);
  }

  render() {
    const source = `
      {{{ errorStatus }}}
      {{{ errorText }}}
      {{{ buttonBack }}}
    `;

    const buttonBack = new Button(undefined, {
      class: 'btn-green',
      type: 'button',
      data: {
        label: 'Назад к чатам',
      },
      onClick: () => {
        window.location.assign('chat');
      },
    });

    const errorStatus = new Text(undefined, {
      class: this._props?.data?.codeClassName,
      data: {
        value: this._props?.data?.codeValue ? this._props?.data?.codeValue : '',
      },
    });

    const errorText = new Text(undefined, {
      class: this._props?.data?.textClassName,
      data: {
        value: this._props?.data?.textValue ? this._props?.data?.textValue : '',
      },
    });

    return compileComponent(source, { ...this._props, buttonBack, errorStatus, errorText });
  }
}
