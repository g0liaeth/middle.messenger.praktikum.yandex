import Handlebars from 'handlebars';
import template from './login.tmpl';
import '../../components';

window.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template);
  const root = document.getElementById('root');

  root.innerHTML = compiled({
    headerClass: 'header-form',
    headerText: 'Вход',
    btnLabel: 'Войти',
    btnClass: 'btn-black',
    registrationLinkPath: '#',
    registrationLinkText: 'Нет аккаунта?',
    registrationLinkClass: 'simple-link',
    formItemList: [
      {
        groupClassName: 'form-group',
        inputClassName: 'login-input',
        labelClassName: 'login-label',
        labelText: 'Логин',
        inputType: 'text',
        inputId: 'login',
        inputName: 'user_login',
        disabled: null,
        inputValue: null,
      },
      {
        groupClassName: 'form-group',
        inputClassName: 'login-input',
        labelClassName: 'login-label',
        labelText: 'Пароль',
        inputType: 'password',
        inputId: 'password',
        inputName: 'user_password',
        disabled: null,
        inputValue: null,
      },
    ],
  });
});
