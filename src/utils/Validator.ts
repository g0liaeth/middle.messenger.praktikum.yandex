const validationRules: Record<string, RegExp> = {
  login: /^[0-9a-zA-Z\-_]{3,}/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
  newPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
  oldPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
  phone: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/,
  email: /^[^\s@]+@[^\s@]+\.[\S]{2,}$/,
  first_name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
  second_name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
  message: /.+/,
};

export default class Validator {
  validateInput(input: HTMLInputElement): string[] {
    const errors: string[] = [];
    const _id = input.getAttribute('id');

    if (!_id) {
      throw new Error('Input is null, nothing to validate');
    }

    const rule = validationRules[_id];

    if (input.value.search(rule) === -1) {
      switch (_id) {
        case 'login':
          errors.push(
            'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
          );
          break;

        case 'password':
          errors.push('от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
          break;

        case 'newPassword':
          errors.push('от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
          break;

        case 'oldPassword':
          errors.push('от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
          break;

        case 'phone':
          errors.push('от 10 до 15 символов, состоит из цифр, может начинается с плюса');
          break;

        case 'email':
          errors.push('email некорректный');
          break;

        case 'first_name':
          errors.push(
            'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
          );
          break;

        case 'second_name':
          errors.push(
            'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
          );
          break;

        case 'message':
          errors.push('Сообщение не должно быть пустым');
          break;

        default:
          break;
      }
    }

    return errors;
  }
}
