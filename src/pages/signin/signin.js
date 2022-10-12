import Handlebars from "handlebars"
import template from "./signin.tmpl"
import "../../components"

window.addEventListener("DOMContentLoaded", () => {
  const compiled = Handlebars.compile(template)
  const root = document.getElementById("root")

  root.innerHTML = compiled({
    headerClass: "header-form",
    headerText: "Регистрация",
    btnLabel: "Зарегистрироваться",
    btnClass: "btn-black",
    registrationLinkPath: "#",
    registrationLinkText: "Войти",
    registrationLinkClass: "simple-link",
    formItemList: [
      {
        className: "form-group",
        labelText: "Почта",
        inputType: "email",
        inputId: "email",
        inputName: "user_email"
      },
      {
        className: "form-group",
        labelText: "Логин",
        inputType: "text",
        inputId: "login",
        inputName: "user_login"
      },
      {
        className: "form-group",
        labelText: "Имя",
        inputType: "text",
        inputId: "first_name",
        inputName: "user_first_name"
      },
      {
        className: "form-group",
        labelText: "Фамилия",
        inputType: "text",
        inputId: "second_name",
        inputName: "user_second_name"
      },
      {
        className: "form-group",
        labelText: "Телефон",
        inputType: "tel",
        inputId: "phone",
        inputName: "user_phone"
      },
      {
        className: "form-group",
        labelText: "Пароль",
        inputType: "password",
        inputId: "password",
        inputName: "user_password"
      },
      {
        className: "form-group",
        labelText: "Пароль (ещё раз)",
        inputType: "password",
        inputId: "repeat_password",
        inputName: "user_repeat_password"
      },
    ]
  })
})
