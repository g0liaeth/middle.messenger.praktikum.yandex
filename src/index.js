import Handlebars from "handlebars"
import template from "./index.tmlp"
import "./components"

window.addEventListener("DOMContentLoaded", () => {
  const compiled = Handlebars.compile(template)
  const root = document.getElementById("root")

  root.innerHTML = compiled()
})
