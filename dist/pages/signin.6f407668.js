function e(e){return e&&e.__esModule?e.default:e}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},l=a.parcelRequireab20;null==l&&((l=function(e){if(e in n)return n[e].exports;if(e in t){var a=t[e];delete t[e];var l={id:e,exports:{}};return n[e]=l,a.call(l.exports,l,l.exports),l.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,a){t[e]=a},a.parcelRequireab20=l);var i=l("c1JL1");l("bWJvp"),window.addEventListener("DOMContentLoaded",(()=>{const a=e(i).compile('\n<div class="form-container">\n  {{> form headerClass=headerClass headerText=headerText formItemList=formItemList btnLabel=btnLabel btnClass=btnClass registrationLinkPath=registrationLinkPath registrationLinkText=registrationLinkText registrationLinkClass=registrationLinkClass}}\n</div>\n');document.getElementById("root").innerHTML=a({headerClass:"header-form",headerText:"Регистрация",btnLabel:"Зарегистрироваться",btnClass:"btn-black",registrationLinkPath:"#",registrationLinkText:"Войти",registrationLinkClass:"simple-link",formItemList:[{groupClassName:"form-group",inputClassName:"login-input",labelClassName:"login-label",labelText:"Почта",inputType:"email",inputId:"email",inputName:"user_email"},{groupClassName:"form-group",inputClassName:"login-input",labelClassName:"login-label",labelText:"Логин",inputType:"text",inputId:"login",inputName:"user_login"},{groupClassName:"form-group",inputClassName:"login-input",labelClassName:"login-label",labelText:"Имя",inputType:"text",inputId:"first_name",inputName:"user_first_name"},{groupClassName:"form-group",inputClassName:"login-input",labelClassName:"login-label",labelText:"Фамилия",inputType:"text",inputId:"second_name",inputName:"user_second_name"},{groupClassName:"form-group",inputClassName:"login-input",labelClassName:"login-label",labelText:"Телефон",inputType:"tel",inputId:"phone",inputName:"user_phone"},{groupClassName:"form-group",inputClassName:"login-input",labelClassName:"login-label",labelText:"Пароль",inputType:"password",inputId:"password",inputName:"user_password"},{groupClassName:"form-group",inputClassName:"login-input",labelClassName:"login-label",labelText:"Пароль (ещё раз)",inputType:"password",inputId:"repeat_password",inputName:"user_repeat_password"}]})}));
//# sourceMappingURL=signin.6f407668.js.map
