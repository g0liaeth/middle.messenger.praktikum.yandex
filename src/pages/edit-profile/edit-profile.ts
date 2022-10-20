import Handlebars from 'handlebars';
import template from './edit-profile.tmpl';
import '../../components';
import img from '../../static/mock-ava.png';

// eslint-disable-next-line no-undef
window.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template);
  // eslint-disable-next-line no-undef
  const root = document.getElementById('root');

  if (root !== null) {
    root.innerHTML = compiled({
      formItemList: [
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-editable-input',
          labelText: 'Почта',
          inputType: 'email',
          inputId: 'email',
          inputName: 'user_email',
          inputValue: 'abcd@yandex.ru',
        },
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-editable-input',
          labelText: 'Логин',
          inputType: 'text',
          inputId: 'login',
          inputName: 'user_login',
          inputValue: 'ivanivan',
        },
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-editable-input',
          labelText: 'Имя',
          inputType: 'text',
          inputId: 'first_name',
          inputName: 'user_first_name',
          inputValue: 'Иван',
        },
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-editable-input',
          labelText: 'Фамилия',
          inputType: 'text',
          inputId: 'second_name',
          inputName: 'user_second_name',
          inputValue: 'Иванов',
        },
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-editable-input',
          labelText: 'Имя в чате',
          inputType: 'text',
          inputId: 'display_name',
          inputName: 'user_display_name',
          inputValue: 'Иванов',
        },
        {
          groupClassName: 'form-group-profile',
          inputClassName: 'profile-editable-input',
          labelText: 'Телефон',
          inputType: 'tel',
          inputId: 'phone',
          inputName: 'user_phone',
          inputValue: '8-999-999-99-99',
        },
      ],
      btnSaveLabel: 'Сохранить',
      btnSaveClass: 'btn-change',
      btnBackLabel: '< назад к чатам',
      btnBackClass: 'btn-back',
      imgPath: img,
    });
  }
});
