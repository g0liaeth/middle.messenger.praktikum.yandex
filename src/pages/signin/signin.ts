import Handlebars from 'handlebars';
import template from './signin.tmpl';
import '../../components';

window.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template);
  const root = document.getElementById('root');

  if (root !== null) {
    root.innerHTML = compiled({
      headerClass: 'header-form',
      headerText: 'Регистрация',
      btnLabel: 'Зарегистрироваться',
      btnClass: 'btn-black',
      registrationLinkPath: '#',
      registrationLinkText: 'Войти',
      registrationLinkClass: 'simple-link',
      formItemList: [
        {
          groupClassName: 'form-group',
          inputClassName: 'login-input',
          labelClassName: 'login-label',
          labelText: 'Почта',
          inputType: 'email',
          inputId: 'email',
          inputName: 'user_email',
        },
        {
          groupClassName: 'form-group',
          inputClassName: 'login-input',
          labelClassName: 'login-label',
          labelText: 'Логин',
          inputType: 'text',
          inputId: 'login',
          inputName: 'user_login',
        },
        {
          groupClassName: 'form-group',
          inputClassName: 'login-input',
          labelClassName: 'login-label',
          labelText: 'Имя',
          inputType: 'text',
          inputId: 'first_name',
          inputName: 'user_first_name',
        },
        {
          groupClassName: 'form-group',
          inputClassName: 'login-input',
          labelClassName: 'login-label',
          labelText: 'Фамилия',
          inputType: 'text',
          inputId: 'second_name',
          inputName: 'user_second_name',
        },
        {
          groupClassName: 'form-group',
          inputClassName: 'login-input',
          labelClassName: 'login-label',
          labelText: 'Телефон',
          inputType: 'tel',
          inputId: 'phone',
          inputName: 'user_phone',
        },
        {
          groupClassName: 'form-group',
          inputClassName: 'login-input',
          labelClassName: 'login-label',
          labelText: 'Пароль',
          inputType: 'password',
          inputId: 'password',
          inputName: 'user_password',
        },
        {
          groupClassName: 'form-group',
          inputClassName: 'login-input',
          labelClassName: 'login-label',
          labelText: 'Пароль (ещё раз)',
          inputType: 'password',
          inputId: 'repeat_password',
          inputName: 'user_repeat_password',
        },
      ],
    });
  }
});
