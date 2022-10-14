import Handlebars from "handlebars"
import template from "./500.tmpl"
import "../../components"

window.addEventListener("DOMContentLoaded", () => {
  const compiled = Handlebars.compile(template)
  const root = document.getElementById("root")

  root.innerHTML = compiled({
    statusCode: "500",
    headerClassName: "header-big",
    mainContent: "Мы уже фиксим",
    contentClassName: "main-text",
    btnLabel: "Назад к чатам",
    btnClassName: "btn-green",
  })
})
