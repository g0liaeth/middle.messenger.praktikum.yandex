import Handlebars from "handlebars"
import template from "./profile.tmpl"
import "../../components"
import img from "../../static/mock-ava.png"

window.addEventListener("DOMContentLoaded", () => {
  const compiled = Handlebars.compile(template)
  const root = document.getElementById("root")

  root.innerHTML = compiled({
    formItemList: [
      {
        groupClassName: "form-group-profile",
        inputClassName: "profile-input",
        labelText: "Почта",
        inputType: "email",
        inputId: "email",
        inputName: "user_email",
        disabled: "disabled",
        inputValue: "abcd@yandex.ru"
      },
      {
        groupClassName: "form-group-profile",
        inputClassName: "profile-input",
        labelText: "Логин",
        inputType: "text",
        inputId: "login",
        inputName: "user_login",
        disabled: "disabled",
        inputValue: "ivanivan"
      },
      {
        groupClassName: "form-group-profile",
        inputClassName: "profile-input",
        labelText: "Имя",
        inputType: "text",
        inputId: "first_name",
        inputName: "user_first_name",
        disabled: "disabled",
        inputValue: "Иван"
      },
      {
        groupClassName: "form-group-profile",
        inputClassName: "profile-input",
        labelText: "Фамилия",
        inputType: "text",
        inputId: "second_name",
        inputName: "user_second_name",
        disabled: "disabled",
        inputValue: "Иванов"
      },
      {
        groupClassName: "form-group-profile",
        inputClassName: "profile-input",
        labelText: "Телефон",
        inputType: "tel",
        inputId: "phone",
        inputName: "user_phone",
        disabled: "disabled",
        inputValue: "8-999-999-99-99"
      },
    ],
    btnChangeDataLabel: "Изменить данные",
    btnChangeDataClass: "btn-change",
    btnChangePasswordLabel: "Изменить пароль",
    btnChangePasswordClass: "btn-change",
    btnExitLabel: "Выйти",
    btnExitClass: "btn-exit",
    btnBackLabel: "< назад к чатам",
    btnBackClass: "btn-back",
    imgPath: img,
    usernameClass: "profile-name",
    usernameText: "Иван",
  })
})