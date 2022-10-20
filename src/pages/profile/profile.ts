import Handlebars from 'handlebars';
import template from './profile.tmpl';
import popupTmpl from '../../components/popup/popup.tmpl';
import '../../components';
import img from '../../static/mock-ava.png';

window.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template);
  const root = document.getElementById('root');

  if (root !== null) {
    root.innerHTML = compiled({
      formItemList: [
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-input',
          labelText: 'Почта',
          inputType: 'email',
          inputId: 'email',
          inputName: 'user_email',
          disabled: 'disabled',
          inputValue: 'abcd@yandex.ru',
        },
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-input',
          labelText: 'Логин',
          inputType: 'text',
          inputId: 'login',
          inputName: 'user_login',
          disabled: 'disabled',
          inputValue: 'ivanivan',
        },
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-input',
          labelText: 'Имя',
          inputType: 'text',
          inputId: 'first_name',
          inputName: 'user_first_name',
          disabled: 'disabled',
          inputValue: 'Иван',
        },
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-input',
          labelText: 'Фамилия',
          inputType: 'text',
          inputId: 'second_name',
          inputName: 'user_second_name',
          disabled: 'disabled',
          inputValue: 'Иванов',
        },
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-input',
          labelText: 'Телефон',
          inputType: 'tel',
          inputId: 'phone',
          inputName: 'user_phone',
          disabled: 'disabled',
          inputValue: '8-999-999-99-99',
        },
      ],
      btnChangeDataLabel: 'Изменить данные',
      btnChangeDataClass: 'btn-change',
      btnChangePasswordLabel: 'Изменить пароль',
      btnChangePasswordClass: 'btn-change',
      btnExitLabel: 'Выйти',
      btnExitClass: 'btn-exit',
      btnBackLabel: '< назад к чатам',
      btnBackClass: 'btn-back',
      imgPath: img,
      usernameClass: 'profile-name',
      usernameText: 'Иван',
    });
  }

  // eslint-disable-next-line no-unused-vars
  const addUserForm = {
    headerClass: 'header-form-md',
    headerText: 'Добавить пользователя',
    groupClassName: 'form-group',
    inputClassName: 'login-input',
    labelClassName: 'login-label',
    labelText: 'Логин',
    inputType: 'text',
    inputId: 'login',
    inputName: 'user_login',
    btnLabel: 'Добавить',
    btnClass: 'btn-black-w100',
  };
  const compiledPopup = Handlebars.compile(popupTmpl);
  // eslint-disable-next-line no-undef
  const newDiv = document.createElement('div');
  newDiv.innerHTML = compiledPopup({
    headerClass: 'header-form-md',
    headerText: 'Загрузить файл',
    inputType: 'file',
    inputId: 'myfile',
    inputName: 'myfile',
    btnLabel: 'Поменять',
    btnClass: 'btn-black-w100',
  });
  newDiv.addEventListener('click', () => {
    newDiv.remove();
  });

  // eslint-disable-next-line no-undef
  const imgBlock = document.querySelector('.img-back');
  if (imgBlock !== null) {
    imgBlock.addEventListener('click', () => {
      root!.append(newDiv);
    });
  }
});
