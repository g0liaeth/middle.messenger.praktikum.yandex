import Handlebars from "handlebars"
import template from "./login.tmpl"
import "../../components"

window.addEventListener("DOMContentLoaded", () => {
  const compiled = Handlebars.compile(template)
  const root = document.getElementById("root")

  root.innerHTML = compiled({
    headerClass: "header-form",
    headerText: "Вход",
    btnLabel: "Войти",
    btnClass: "btn-black",
    registrationLinkPath: "#",
    registrationLinkText: "Нет аккаунта?",
    registrationLinkClass: "simple-link",
    formItemList: [
      {
        className: "form-group",
        labelText: "Логин",
        inputType: "text",
        inputId: "login",
        inputName: "user_login"
      },
      {
        className: "form-group",
        labelText: "Пароль",
        inputType: "password",
        inputId: "password",
        inputName: "user_password"
      }
    ]
  })
})
