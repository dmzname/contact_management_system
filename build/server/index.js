/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/controllers/ClientsController.js":
/*!*****************************************************!*\
  !*** ./src/server/controllers/ClientsController.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addClient\": () => (/* binding */ addClient),\n/* harmony export */   \"getAllClients\": () => (/* binding */ getAllClients)\n/* harmony export */ });\n/* harmony import */ var _models_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/client.js */ \"./src/server/models/client.js\");\n\r\n\r\n// eslint-disable-next-line import/prefer-default-export\r\nconst addClient = async (req, res) => {\r\n\ttry {\r\n\t\tconst doc = new _models_client_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n\t\t\tclientId: Date.now().toString(),\r\n\t\t\tname: req.body.name,\r\n\t\t\tsurname: req.body.surname,\r\n\t\t\tmidname: req.body.midname,\r\n\t\t\tcontacts: req.body.contacts,\r\n\t\t\tuser: req.user\r\n\t\t});\r\n\r\n\t\tconst client = await doc.save();\r\n\t\tres.json(client);\r\n\t} catch (err) {\r\n\t\tconsole.log(err);\r\n\t\tres.status(500).json({ message: 'Failed to create client.' });\r\n\t}\r\n};\r\n\r\nconst getAllClients = async (req, res) => {\r\n\ttry {\r\n\t\tconst data = await _models_client_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({ user: req.user._id }).exec();\r\n\t\tres.status(201).json(data);\r\n\t} catch (err) {\r\n\t\tconsole.log(err);\r\n\t\tres.status(500).json({ message: 'Server error.' });\r\n\t}\r\n};\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/server/controllers/ClientsController.js?");

/***/ }),

/***/ "./src/server/controllers/UserController.js":
/*!**************************************************!*\
  !*** ./src/server/controllers/UserController.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"login\": () => (/* binding */ login),\n/* harmony export */   \"logout\": () => (/* binding */ logout),\n/* harmony export */   \"signup\": () => (/* binding */ signup)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _models_user_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/user.js */ \"./src/server/models/user.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n// import bcrypt from 'bcrypt';\r\n\r\n\r\n\r\n\r\nconst signup = async (req, res) => {\r\n\ttry {\r\n\t\tconst isUserAuth = await _models_user_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({email: req.body.email});\r\n\r\n\t\tif (isUserAuth) {\r\n\t\t\treturn res.status(403).json({message: 'Пользователь с таким e-mail уже зарегистрирован.'});\r\n\t\t}\r\n\r\n\t\tconst {password} = req.body;\r\n\t\tconst salt = await bcrypt__WEBPACK_IMPORTED_MODULE_2___default().genSalt(10);\r\n\t\tconst hash = await bcrypt__WEBPACK_IMPORTED_MODULE_2___default().hash(password, salt);\r\n\r\n\t\tconst doc = new _models_user_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\r\n\t\t\temail: req.body.email,\r\n\t\t\tusername: req.body.username,\r\n\t\t\tpasswordHash: hash\r\n\t\t});\r\n\r\n\t\tconst user = await doc.save();\r\n\r\n\t\tconst token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({_id: user._id}, 'secret_user', {expiresIn: '30d'}, null);\r\n\r\n\t\tconst {passwordHash, ...userData} = user._doc;\r\n\r\n\t\tres.status(201).json({...userData, token});\r\n\t} catch (err) {\r\n\t\tconsole.log(err);\r\n\t\tres.status(500).json({message: err.message});\r\n\t}\r\n};\r\n\r\nconst login = async (req, res) => {\r\n\ttry {\r\n\t\tconst user = await _models_user_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({email: req.body.email});\r\n\r\n\t\tif (!user) {\r\n\t\t\treturn res.status(404).json({message: 'Ошибка Авторизации.'});\r\n\t\t}\r\n\r\n\t\tconst isValidPass = await bcrypt__WEBPACK_IMPORTED_MODULE_2___default().compare(req.body.password, user.passwordHash);\r\n\r\n\t\tif (!isValidPass) {\r\n\t\t\treturn res.status(404).json({message: 'Ошибка Авторизации.'});\r\n\t\t}\r\n\r\n\t\tconst token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({_id: user._id}, 'secret_user', {expiresIn: '30d'}, null);\r\n\r\n\t\tconst {passwordHash, ...userData} = user._doc;\r\n\r\n\t\tres.status(201).json({...userData, token});\r\n\t} catch (err) {\r\n\t\tconsole.log(err);\r\n\t\tres.status(500).json({message: err.message});\r\n\t}\r\n};\r\n\r\nconst logout = (req, res) => {\r\n\tif (!req.user) {\r\n\t\treturn res.status(404).json({message: 'Ошибка Авторизации.'});\r\n\t}\r\n\tres.status(201).json({message: 'success'});\r\n};\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/server/controllers/UserController.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _controllers_UserController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controllers/UserController */ \"./src/server/controllers/UserController.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _utils_checkAuth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/checkAuth */ \"./src/server/utils/checkAuth.js\");\n/* harmony import */ var _controllers_ClientsController__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controllers/ClientsController */ \"./src/server/controllers/ClientsController.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\ndotenv__WEBPACK_IMPORTED_MODULE_0__.config();\r\n\r\nconst PORT = process.env.PORT || 3000;\r\n// const URI_PREFIX = '/api/clients';\r\n\r\nmongoose__WEBPACK_IMPORTED_MODULE_3___default().set('strictQuery', false);\r\nmongoose__WEBPACK_IMPORTED_MODULE_3___default().connect(process.env.DB_URL)\r\n\t.then(() => console.log('DB connected'))\r\n\t.catch((err) => console.log(`DB error: ${err}`));\r\n\r\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\r\n\r\napp.use('/static', express__WEBPACK_IMPORTED_MODULE_1___default()[\"static\"]('./build/client'));\r\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default().json());\r\napp.use(cors__WEBPACK_IMPORTED_MODULE_2___default()());\r\n\r\napp.set('views', path__WEBPACK_IMPORTED_MODULE_5__.join(__dirname, 'views'));\r\napp.set('view engine', 'pug');\r\n\r\napp.get('/', async (req, res) => {\r\n\tres.render('index')\r\n});\r\n\r\napp.post('/signup', _controllers_UserController__WEBPACK_IMPORTED_MODULE_4__.signup);\r\napp.post('/login', _controllers_UserController__WEBPACK_IMPORTED_MODULE_4__.login);\r\napp.get('/logout', _utils_checkAuth__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _controllers_UserController__WEBPACK_IMPORTED_MODULE_4__.logout);\r\n\r\napp.post('/clients', _utils_checkAuth__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _controllers_ClientsController__WEBPACK_IMPORTED_MODULE_7__.addClient);\r\napp.get('/clients', _utils_checkAuth__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _controllers_ClientsController__WEBPACK_IMPORTED_MODULE_7__.getAllClients);\r\n\r\napp.listen(PORT, () => {\r\n\tconsole.log(`Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);\r\n});\n\n//# sourceURL=webpack://contact_management_system/./src/server/index.js?");

/***/ }),

/***/ "./src/server/models/client.js":
/*!*************************************!*\
  !*** ./src/server/models/client.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst subSchema = mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema({\r\n\tsocialName: String,\r\n\tsocialLink: String\r\n}, {_id: false})\r\n\r\nconst ClientSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema(\r\n\t{\r\n\t\tclientId: {\r\n\t\t\ttype: String,\r\n\t\t\trequire: true,\r\n\t\t},\r\n\t\tname: {\r\n\t\t\ttype: String,\r\n\t\t\trequire: true\r\n\t\t},\r\n\t\tsurname: {\r\n\t\t\ttype: String,\r\n\t\t\trequire: true\r\n\t\t},\r\n\t\tmidname: String,\r\n\t\tcontacts: [subSchema],\r\n\t\tuser: {\r\n\t\t\ttype: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\r\n\t\t\tref: 'User',\r\n\t\t\trequired: true\r\n\t\t}\r\n\t},\r\n\t{\r\n\t\ttimestamps: true,\r\n\t\ttoJSON: { virtuals: true }\r\n\t}\r\n);\r\n\r\nClientSchema.virtual('fullName').get(function() {\r\n\treturn `${this.surname  } ${  this.name  } ${  this.midname}`;\r\n});\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Client', ClientSchema));\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/server/models/client.js?");

/***/ }),

/***/ "./src/server/models/user.js":
/*!***********************************!*\
  !*** ./src/server/models/user.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema(\r\n\t{\r\n\t\tusername: {\r\n\t\t\ttype: String,\r\n\t\t\trequired: true\r\n\t\t},\r\n\t\temail: {\r\n\t\t\ttype: String,\r\n\t\t\trequired: true,\r\n\t\t\tunique: true\r\n\t\t},\r\n\t\tpasswordHash: {\r\n\t\t\ttype: String,\r\n\t\t\trequired: true\r\n\t\t}\r\n\t},\r\n\t{\r\n\t\ttimestamps: true\r\n\t}\r\n);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', UserSchema));\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/server/models/user.js?");

/***/ }),

/***/ "./src/server/utils/checkAuth.js":
/*!***************************************!*\
  !*** ./src/server/utils/checkAuth.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _models_user_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/user.js */ \"./src/server/models/user.js\");\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res, next) => {\r\n\tconst token = (req.headers.authorization || '').replace(/Bearer\\s?/, '');\r\n\tif (token) {\r\n\t\ttry {\r\n\t\t\tconst { _id } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, 'secret_user', null, null);\r\n\t\t\treq.user = await _models_user_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({ _id });\r\n\t\t\tnext();\r\n\t\t} catch (err) {\r\n\t\t\treturn res.status(403).json({\r\n\t\t\t\tmessage: 'No access'\r\n\t\t\t});\r\n\t\t}\r\n\t} else {\r\n\t\treturn res.status(403).json({\r\n\t\t\tmessage: 'No access'\r\n\t\t});\r\n\t}\r\n});\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/server/utils/checkAuth.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.js");
/******/ 	
/******/ })()
;