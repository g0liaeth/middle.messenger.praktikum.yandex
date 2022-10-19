import Handlebars from 'handlebars';
import template from './change-password.tmpl';
import '../../components';
import img from '../../static/mock-ava.png';

window.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template);
  const root = document.getElementById('root');

  root.innerHTML = compiled({
    formItemList: [
      {
        groupClassName: 'form-group-profile',
        inputClassName: 'profile-editable-input',
        labelText: 'Старый пароль',
        inputType: 'password',
        inputId: 'oldPassword',
        inputName: 'user_oldPassword',
      },
      {
        groupClassName: 'form-group-profile',
        inputClassName: 'profile-editable-input',
        labelText: 'Новый пароль',
        inputType: 'password',
        inputId: 'newPassword',
        inputName: 'user_newPassword',
      },
      {
        groupClassName: 'form-group-profile',
        inputClassName: 'profile-editable-input',
        labelText: 'Повторите новый пароль',
        inputType: 'password',
        inputId: 'repeat_newPassword',
        inputName: 'user_repeat_newPassword',
      },
    ],
    btnSaveLabel: 'Сохранить',
    btnSaveClass: 'btn-change',
    btnBackLabel: '< назад к чатам',
    btnBackClass: 'btn-back',
    imgPath: img,
  });
});
