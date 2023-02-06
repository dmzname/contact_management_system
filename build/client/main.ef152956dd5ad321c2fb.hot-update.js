"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatecontact_management_system"]("main",{

/***/ "./src/client/js/utils/validationForms.js":
/*!************************************************!*\
  !*** ./src/client/js/utils/validationForms.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isFormValid\": () => (/* binding */ isFormValid),\n/* harmony export */   \"removeError\": () => (/* binding */ removeError)\n/* harmony export */ });\nconst showError = (input, errMsg) => {\r\n\tconst formField = input.closest('div.field');\r\n\tformField.classList.add('error');\r\n\tconst errField = formField.querySelector('small');\r\n\terrField.textContent = errMsg;\r\n};\r\n\r\nconst removeError = (input) => {\r\n\tconst formField = input.closest('div.field');\r\n\tformField.classList.remove('error');\r\n\tconst errField = formField.querySelector('small');\r\n\terrField.textContent = '';\r\n};\r\n\r\nconst validationParams = {\r\n\ttext: {\r\n\t\tregExp: /^[а-яА-ЯёЁa-zA-Z._]{0,20}$/,\r\n\t\tmsg: 'Ваше имя не корректно',\r\n\t},\r\n\temail: {\r\n\t\tregExp: /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/,\r\n\t\tmsg: 'E-mail введен не корректно',\r\n\t},\r\n\tpassword: {\r\n\t\tregExp: /^.{6}$/,\r\n\t\tmsg: 'Введено не достаточное количество символов',\r\n\t},\r\n\t'confirm-password': {\r\n\t\tregExp: /^.{6}/,\r\n\t\tmsg: 'Введен не верный пароль',\r\n\t},\r\n\tphone: {\r\n\t\tregExp: /^((8|\\+\\d{1,2})[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$/,\r\n\t\tmsg: 'Введен не верный номер телефона',\r\n\t},\r\n\tlink: {\r\n\t\tregExp: /^https?:\\/\\/[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/,\r\n\t\tmsg: 'Ссылка указанна не верно',\r\n\t}\r\n};\r\n\r\nfunction isFormValid(form) {\r\n\tlet isValid = true, password, formData = {};\r\n\r\n\tconst inputs = [...form.elements].filter((el) => el.nodeName === 'INPUT');\r\n\tif(form.name === 'signup') {\r\n\t\tpassword = inputs.find((el) => el.name === 'password').value.trim();\r\n\t}\r\n\r\n\tform.addEventListener('input', (e) => {\r\n\t\tif (e.target.dataset.valid && validationParams[e.target.dataset.valid].regExp.test(e.target.value.trim())) {\r\n\t\t\tremoveError(e.target);\r\n\t\t}\r\n\t});\r\n\r\n\tinputs.forEach((input) => {\r\n\t\tconst value = input.value.trim();\r\n\t\tconst { valid } = input.dataset;\r\n\r\n\t\tif(valid) {\r\n\t\t\tconst errMsg = !value && input.required ? 'Поле обязательно для заполнения' : validationParams[valid].msg;\r\n\r\n\t\tif ((value === '' && input.required) || !validationParams[valid].regExp.test(value)) {\r\n\t\t\tshowError(input, errMsg);\r\n\t\t\tisValid = false;\r\n\t\t} else {\r\n\t\t\tformData = { ...formData, [input.name]: value };\r\n\t\t}\r\n\r\n\t\tif (name === 'confirm-password' && value !== password) {\r\n\t\t\tshowError(input, errMsg);\r\n\t\t\tisValid = false;\r\n\t\t}}\r\n\t});\r\n\r\n\tif (isValid) return formData;\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/utils/validationForms.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7872eb1c4e09e36717dd")
/******/ })();
/******/ 
/******/ }
);