const validationRules: Record<string, RegExp> = {
  login: /^[0-9a-zA-Z\-_]{3,}/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
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

    if (input.value && input.value.search(rule) === -1) {
      switch (_id) {
        case 'login':
          errors.push('Логин некорректный');
          break;

        case 'password':
          errors.push('Пароль некорректный');
          break;

        case 'phone':
          errors.push('Телефон некорректный');
          break;

        case 'email':
          errors.push('email некорректный');
          break;

        case 'first_name':
          errors.push('Имя некорректный');
          break;

        case 'second_name':
          errors.push('Фамилия некорректный');
          break;

        default:
          break;
      }
    }

    return errors;
  }
}
