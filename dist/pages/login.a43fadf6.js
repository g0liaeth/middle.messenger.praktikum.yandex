function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},t={},a=n.parcelRequireab20;null==a&&((a=function(e){if(e in l)return l[e].exports;if(e in t){var n=t[e];delete t[e];var a={id:e,exports:{}};return l[e]=a,n.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},n.parcelRequireab20=a);var i=a("c1JL1");a("bWJvp"),window.addEventListener("DOMContentLoaded",(()=>{const n=e(i).compile('\n<div class="form-container">\n  {{> form }}\n</div>\n');document.getElementById("root").innerHTML=n({headerClass:"header-form",headerText:"Вход",btnLabel:"Войти",btnClass:"btn-black",registrationLinkPath:"#",registrationLinkText:"Нет аккаунта?",registrationLinkClass:"simple-link",formItemList:[{groupClassName:"form-group",inputClassName:"login-input",labelClassName:"login-label",labelText:"Логин",inputType:"text",inputId:"login",inputName:"user_login",disabled:null,inputValue:null},{groupClassName:"form-group",inputClassName:"login-input",labelClassName:"login-label",labelText:"Пароль",inputType:"password",inputId:"password",inputName:"user_password",disabled:null,inputValue:null}]})}));
//# sourceMappingURL=login.a43fadf6.js.map
