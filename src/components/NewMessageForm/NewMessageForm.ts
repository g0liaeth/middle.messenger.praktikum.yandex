import { NewMessageFormPropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import Validator from '../../utils/Validator';
import Button from '../Button/Button';
import Input from '../Input/Input';

export default class NewMessageForm extends Block<NewMessageFormPropsType> {
  private _events = {};

  componentDidMount(): void {
    this._events = {
      blur: this._onFocusChange.bind(this),
      focus: this._onFocusChange.bind(this),
    };
  }

  private _onFocusChange(event: Event) {
    const validator = new Validator();
    const input = event.target as HTMLInputElement;
    const errors = validator.validateInput(input);
    const errorMessage = document.querySelector(`#messageError`);

    if (!errorMessage) {
      throw new Error('Нет спана для ошибки');
    }

    if (errors.length !== 0) {
      errorMessage.textContent = errors.join('/n');
      input.classList.add('invalid');
    } else {
      errorMessage.textContent = '';
      input.classList.remove('invalid');
    }
  }

  render() {
    const source = `
    <form>
      {{{ newMessageInput }}}
      <span id="messageError" class="error" aria-live="polite"></span>
      <div class="send-message-container">
        <img src={{ attachBtnImg }} alt="paperclip" class="attach-file-img">
        {{{ sendMessageButton }}}
      </div>
    </form>
    `;

    const newMessageInput = new Input({
      className: 'new-message-textinput',
      inputType: 'text',
      inputId: 'message',
      inputName: 'message',
      inputPlaceholder: 'Сообщение...',
      events: this._events,
    });

    //TODO Перевесить событие клика на сабмит формы
    const sendMessageButton = new Button({
      className: 'btn-black',
      label: 'Отправить',
      type: 'submit',
      events: {
        click: (event) => {
          event.preventDefault();
          const target = event.target as HTMLElement;
          const inputs = target.parentElement?.closest('form')?.querySelectorAll('input');
          let errors: string[] = [];
          if (!inputs) {
            return;
          }
          inputs.forEach((input) => {
            const validator = new Validator();
            const fieldErrors = validator.validateInput(input);
            errors = [...errors, ...fieldErrors];
          });
          if (errors.length > 0) {
            console.log(errors);
            return;
          }
          const formData: Record<string, unknown> = {};
          inputs.forEach((input) => {
            formData[input.getAttribute('id')!] = input.value;
          });
          console.log(formData);
        },
      },
    });

    return compileComponent(source, { ...this.props, newMessageInput, sendMessageButton });
  }
}
