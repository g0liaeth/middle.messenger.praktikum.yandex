import { NewMessageFormPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block';
import compileComponent from '../../utils/compileComponent';
import Button from '../Button/Button';
import Input from '../Input/Input';

export default class NewMessageForm extends Block<NewMessageFormPropsType> {
  render() {
    const source = `
    <div>
      {{{ newMessageInput }}}
      <div class="send-message-container">
        <img src={{ attachBtnImg }} alt="paperclip" class="attach-file-img">
        {{{ sendMessageButton }}}
      </div>
    </div>
    `;

    const newMessageInput = new Input({
      className: 'new-message-textinput',
      inputType: 'text',
      inputId: 'message',
      inputName: 'messageInput',
      inputPlaceholder: 'Сообщение...',
    });

    const sendMessageButton = new Button({
      className: 'btn-black',
      label: 'Отправить',
    });

    return compileComponent(source, { ...this.props, newMessageInput, sendMessageButton });
  }
}
