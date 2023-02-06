/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = ansiHTML\n\n// Reference to https://github.com/sindresorhus/ansi-regex\nvar _regANSI = /(?:(?:\\u001b\\[)|\\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\\u001b[A-M]/\n\nvar _defColors = {\n  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]\n  black: '000',\n  red: 'ff0000',\n  green: '209805',\n  yellow: 'e8bf03',\n  blue: '0000ff',\n  magenta: 'ff00ff',\n  cyan: '00ffee',\n  lightgrey: 'f0f0f0',\n  darkgrey: '888'\n}\nvar _styles = {\n  30: 'black',\n  31: 'red',\n  32: 'green',\n  33: 'yellow',\n  34: 'blue',\n  35: 'magenta',\n  36: 'cyan',\n  37: 'lightgrey'\n}\nvar _openTags = {\n  '1': 'font-weight:bold', // bold\n  '2': 'opacity:0.5', // dim\n  '3': '<i>', // italic\n  '4': '<u>', // underscore\n  '8': 'display:none', // hidden\n  '9': '<del>' // delete\n}\nvar _closeTags = {\n  '23': '</i>', // reset italic\n  '24': '</u>', // reset underscore\n  '29': '</del>' // reset delete\n}\n\n;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {\n  _closeTags[n] = '</span>'\n})\n\n/**\n * Converts text with ANSI color codes to HTML markup.\n * @param {String} text\n * @returns {*}\n */\nfunction ansiHTML (text) {\n  // Returns the text if the string has no ANSI escape code.\n  if (!_regANSI.test(text)) {\n    return text\n  }\n\n  // Cache opened sequence.\n  var ansiCodes = []\n  // Replace with markup.\n  var ret = text.replace(/\\033\\[(\\d+)m/g, function (match, seq) {\n    var ot = _openTags[seq]\n    if (ot) {\n      // If current sequence has been opened, close it.\n      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast\n        ansiCodes.pop()\n        return '</span>'\n      }\n      // Open tag.\n      ansiCodes.push(seq)\n      return ot[0] === '<' ? ot : '<span style=\"' + ot + ';\">'\n    }\n\n    var ct = _closeTags[seq]\n    if (ct) {\n      // Pop sequence\n      ansiCodes.pop()\n      return ct\n    }\n    return ''\n  })\n\n  // Make sure tags are closed.\n  var l = ansiCodes.length\n  ;(l > 0) && (ret += Array(l + 1).join('</span>'))\n\n  return ret\n}\n\n/**\n * Customize colors.\n * @param {Object} colors reference to _defColors\n */\nansiHTML.setColors = function (colors) {\n  if (typeof colors !== 'object') {\n    throw new Error('`colors` parameter must be an Object.')\n  }\n\n  var _finalColors = {}\n  for (var key in _defColors) {\n    var hex = colors.hasOwnProperty(key) ? colors[key] : null\n    if (!hex) {\n      _finalColors[key] = _defColors[key]\n      continue\n    }\n    if ('reset' === key) {\n      if (typeof hex === 'string') {\n        hex = [hex]\n      }\n      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {\n        return typeof h !== 'string'\n      })) {\n        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')\n      }\n      var defHexColor = _defColors[key]\n      if (!hex[0]) {\n        hex[0] = defHexColor[0]\n      }\n      if (hex.length === 1 || !hex[1]) {\n        hex = [hex[0]]\n        hex.push(defHexColor[1])\n      }\n\n      hex = hex.slice(0, 2)\n    } else if (typeof hex !== 'string') {\n      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')\n    }\n    _finalColors[key] = hex\n  }\n  _setTags(_finalColors)\n}\n\n/**\n * Reset colors.\n */\nansiHTML.reset = function () {\n  _setTags(_defColors)\n}\n\n/**\n * Expose tags, including open and close.\n * @type {Object}\n */\nansiHTML.tags = {}\n\nif (Object.defineProperty) {\n  Object.defineProperty(ansiHTML.tags, 'open', {\n    get: function () { return _openTags }\n  })\n  Object.defineProperty(ansiHTML.tags, 'close', {\n    get: function () { return _closeTags }\n  })\n} else {\n  ansiHTML.tags.open = _openTags\n  ansiHTML.tags.close = _closeTags\n}\n\nfunction _setTags (colors) {\n  // reset all\n  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]\n  // inverse\n  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]\n  // dark grey\n  _openTags['90'] = 'color:#' + colors.darkgrey\n\n  for (var code in _styles) {\n    var color = _styles[code]\n    var oriColor = colors[color] || '000'\n    _openTags[code] = 'color:#' + oriColor\n    code = parseInt(code)\n    _openTags[(code + 10).toString()] = 'background:#' + oriColor\n  }\n}\n\nansiHTML.reset()\n\n\n//# sourceURL=webpack://contact_management_system/./node_modules/ansi-html-community/index.js?");

/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = ({onlyFirst = false} = {}) => {\n\tconst pattern = [\n\t\t'[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]+)*|[a-zA-Z\\\\d]+(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)',\n\t\t'(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-ntqry=><~]))'\n\t].join('|');\n\n\treturn new RegExp(pattern, onlyFirst ? undefined : 'g');\n};\n\n\n//# sourceURL=webpack://contact_management_system/./node_modules/ansi-regex/index.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar named_references_1 = __webpack_require__(/*! ./named-references */ \"./node_modules/html-entities/lib/named-references.js\");\nvar numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ \"./node_modules/html-entities/lib/numeric-unicode-map.js\");\nvar surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ \"./node_modules/html-entities/lib/surrogate-pairs.js\");\nvar allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });\nvar encodeRegExps = {\n    specialChars: /[<>'\"&]/g,\n    nonAscii: /(?:[<>'\"&\\u0080-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])/g,\n    nonAsciiPrintable: /(?:[<>'\"&\\x01-\\x08\\x11-\\x15\\x17-\\x1F\\x7f-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])/g,\n    extensive: /(?:[\\x01-\\x0c\\x0e-\\x1f\\x21-\\x2c\\x2e-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\x7d\\x7f-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])/g\n};\nvar defaultEncodeOptions = {\n    mode: 'specialChars',\n    level: 'all',\n    numeric: 'decimal'\n};\n/** Encodes all the necessary (specified by `level`) characters in the text */\nfunction encode(text, _a) {\n    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;\n    if (!text) {\n        return '';\n    }\n    var encodeRegExp = encodeRegExps[mode];\n    var references = allNamedReferences[level].characters;\n    var isHex = numeric === 'hexadecimal';\n    encodeRegExp.lastIndex = 0;\n    var _b = encodeRegExp.exec(text);\n    var _c;\n    if (_b) {\n        _c = '';\n        var _d = 0;\n        do {\n            if (_d !== _b.index) {\n                _c += text.substring(_d, _b.index);\n            }\n            var _e = _b[0];\n            var result_1 = references[_e];\n            if (!result_1) {\n                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);\n                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';\n            }\n            _c += result_1;\n            _d = _b.index + _e.length;\n        } while ((_b = encodeRegExp.exec(text)));\n        if (_d !== text.length) {\n            _c += text.substring(_d);\n        }\n    }\n    else {\n        _c =\n            text;\n    }\n    return _c;\n}\nexports.encode = encode;\nvar defaultDecodeOptions = {\n    scope: 'body',\n    level: 'all'\n};\nvar strict = /&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);/g;\nvar attribute = /&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;\nvar baseDecodeRegExps = {\n    xml: {\n        strict: strict,\n        attribute: attribute,\n        body: named_references_1.bodyRegExps.xml\n    },\n    html4: {\n        strict: strict,\n        attribute: attribute,\n        body: named_references_1.bodyRegExps.html4\n    },\n    html5: {\n        strict: strict,\n        attribute: attribute,\n        body: named_references_1.bodyRegExps.html5\n    }\n};\nvar decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });\nvar fromCharCode = String.fromCharCode;\nvar outOfBoundsChar = fromCharCode(65533);\nvar defaultDecodeEntityOptions = {\n    level: 'all'\n};\n/** Decodes a single entity */\nfunction decodeEntity(entity, _a) {\n    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;\n    if (!entity) {\n        return '';\n    }\n    var _b = entity;\n    var decodeEntityLastChar_1 = entity[entity.length - 1];\n    if (false) {}\n    else if (false) {}\n    else {\n        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];\n        if (decodeResultByReference_1) {\n            _b = decodeResultByReference_1;\n        }\n        else if (entity[0] === '&' && entity[1] === '#') {\n            var decodeSecondChar_1 = entity[2];\n            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'\n                ? parseInt(entity.substr(3), 16)\n                : parseInt(entity.substr(2));\n            _b =\n                decodeCode_1 >= 0x10ffff\n                    ? outOfBoundsChar\n                    : decodeCode_1 > 65535\n                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)\n                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);\n        }\n    }\n    return _b;\n}\nexports.decodeEntity = decodeEntity;\n/** Decodes all entities in the text */\nfunction decode(text, _a) {\n    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;\n    if (!text) {\n        return '';\n    }\n    var decodeRegExp = decodeRegExps[level][scope];\n    var references = allNamedReferences[level].entities;\n    var isAttribute = scope === 'attribute';\n    var isStrict = scope === 'strict';\n    decodeRegExp.lastIndex = 0;\n    var replaceMatch_1 = decodeRegExp.exec(text);\n    var replaceResult_1;\n    if (replaceMatch_1) {\n        replaceResult_1 = '';\n        var replaceLastIndex_1 = 0;\n        do {\n            if (replaceLastIndex_1 !== replaceMatch_1.index) {\n                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);\n            }\n            var replaceInput_1 = replaceMatch_1[0];\n            var decodeResult_1 = replaceInput_1;\n            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];\n            if (isAttribute\n                && decodeEntityLastChar_2 === '=') {\n                decodeResult_1 = replaceInput_1;\n            }\n            else if (isStrict\n                && decodeEntityLastChar_2 !== ';') {\n                decodeResult_1 = replaceInput_1;\n            }\n            else {\n                var decodeResultByReference_2 = references[replaceInput_1];\n                if (decodeResultByReference_2) {\n                    decodeResult_1 = decodeResultByReference_2;\n                }\n                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {\n                    var decodeSecondChar_2 = replaceInput_1[2];\n                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'\n                        ? parseInt(replaceInput_1.substr(3), 16)\n                        : parseInt(replaceInput_1.substr(2));\n                    decodeResult_1 =\n                        decodeCode_2 >= 0x10ffff\n                            ? outOfBoundsChar\n                            : decodeCode_2 > 65535\n                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)\n                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);\n                }\n            }\n            replaceResult_1 += decodeResult_1;\n            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;\n        } while ((replaceMatch_1 = decodeRegExp.exec(text)));\n        if (replaceLastIndex_1 !== text.length) {\n            replaceResult_1 += text.substring(replaceLastIndex_1);\n        }\n    }\n    else {\n        replaceResult_1 =\n            text;\n    }\n    return replaceResult_1;\n}\nexports.decode = decode;\n\n\n//# sourceURL=webpack://contact_management_system/./node_modules/html-entities/lib/index.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.bodyRegExps={xml:/&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{\"&lt;\":\"<\",\"&gt;\":\">\",\"&quot;\":'\"',\"&apos;\":\"'\",\"&amp;\":\"&\"},characters:{\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&apos;\",\"&\":\"&amp;\"}},html4:{entities:{\"&apos;\":\"'\",\"&nbsp\":\" \",\"&nbsp;\":\" \",\"&iexcl\":\"¡\",\"&iexcl;\":\"¡\",\"&cent\":\"¢\",\"&cent;\":\"¢\",\"&pound\":\"£\",\"&pound;\":\"£\",\"&curren\":\"¤\",\"&curren;\":\"¤\",\"&yen\":\"¥\",\"&yen;\":\"¥\",\"&brvbar\":\"¦\",\"&brvbar;\":\"¦\",\"&sect\":\"§\",\"&sect;\":\"§\",\"&uml\":\"¨\",\"&uml;\":\"¨\",\"&copy\":\"©\",\"&copy;\":\"©\",\"&ordf\":\"ª\",\"&ordf;\":\"ª\",\"&laquo\":\"«\",\"&laquo;\":\"«\",\"&not\":\"¬\",\"&not;\":\"¬\",\"&shy\":\"­\",\"&shy;\":\"­\",\"&reg\":\"®\",\"&reg;\":\"®\",\"&macr\":\"¯\",\"&macr;\":\"¯\",\"&deg\":\"°\",\"&deg;\":\"°\",\"&plusmn\":\"±\",\"&plusmn;\":\"±\",\"&sup2\":\"²\",\"&sup2;\":\"²\",\"&sup3\":\"³\",\"&sup3;\":\"³\",\"&acute\":\"´\",\"&acute;\":\"´\",\"&micro\":\"µ\",\"&micro;\":\"µ\",\"&para\":\"¶\",\"&para;\":\"¶\",\"&middot\":\"·\",\"&middot;\":\"·\",\"&cedil\":\"¸\",\"&cedil;\":\"¸\",\"&sup1\":\"¹\",\"&sup1;\":\"¹\",\"&ordm\":\"º\",\"&ordm;\":\"º\",\"&raquo\":\"»\",\"&raquo;\":\"»\",\"&frac14\":\"¼\",\"&frac14;\":\"¼\",\"&frac12\":\"½\",\"&frac12;\":\"½\",\"&frac34\":\"¾\",\"&frac34;\":\"¾\",\"&iquest\":\"¿\",\"&iquest;\":\"¿\",\"&Agrave\":\"À\",\"&Agrave;\":\"À\",\"&Aacute\":\"Á\",\"&Aacute;\":\"Á\",\"&Acirc\":\"Â\",\"&Acirc;\":\"Â\",\"&Atilde\":\"Ã\",\"&Atilde;\":\"Ã\",\"&Auml\":\"Ä\",\"&Auml;\":\"Ä\",\"&Aring\":\"Å\",\"&Aring;\":\"Å\",\"&AElig\":\"Æ\",\"&AElig;\":\"Æ\",\"&Ccedil\":\"Ç\",\"&Ccedil;\":\"Ç\",\"&Egrave\":\"È\",\"&Egrave;\":\"È\",\"&Eacute\":\"É\",\"&Eacute;\":\"É\",\"&Ecirc\":\"Ê\",\"&Ecirc;\":\"Ê\",\"&Euml\":\"Ë\",\"&Euml;\":\"Ë\",\"&Igrave\":\"Ì\",\"&Igrave;\":\"Ì\",\"&Iacute\":\"Í\",\"&Iacute;\":\"Í\",\"&Icirc\":\"Î\",\"&Icirc;\":\"Î\",\"&Iuml\":\"Ï\",\"&Iuml;\":\"Ï\",\"&ETH\":\"Ð\",\"&ETH;\":\"Ð\",\"&Ntilde\":\"Ñ\",\"&Ntilde;\":\"Ñ\",\"&Ograve\":\"Ò\",\"&Ograve;\":\"Ò\",\"&Oacute\":\"Ó\",\"&Oacute;\":\"Ó\",\"&Ocirc\":\"Ô\",\"&Ocirc;\":\"Ô\",\"&Otilde\":\"Õ\",\"&Otilde;\":\"Õ\",\"&Ouml\":\"Ö\",\"&Ouml;\":\"Ö\",\"&times\":\"×\",\"&times;\":\"×\",\"&Oslash\":\"Ø\",\"&Oslash;\":\"Ø\",\"&Ugrave\":\"Ù\",\"&Ugrave;\":\"Ù\",\"&Uacute\":\"Ú\",\"&Uacute;\":\"Ú\",\"&Ucirc\":\"Û\",\"&Ucirc;\":\"Û\",\"&Uuml\":\"Ü\",\"&Uuml;\":\"Ü\",\"&Yacute\":\"Ý\",\"&Yacute;\":\"Ý\",\"&THORN\":\"Þ\",\"&THORN;\":\"Þ\",\"&szlig\":\"ß\",\"&szlig;\":\"ß\",\"&agrave\":\"à\",\"&agrave;\":\"à\",\"&aacute\":\"á\",\"&aacute;\":\"á\",\"&acirc\":\"â\",\"&acirc;\":\"â\",\"&atilde\":\"ã\",\"&atilde;\":\"ã\",\"&auml\":\"ä\",\"&auml;\":\"ä\",\"&aring\":\"å\",\"&aring;\":\"å\",\"&aelig\":\"æ\",\"&aelig;\":\"æ\",\"&ccedil\":\"ç\",\"&ccedil;\":\"ç\",\"&egrave\":\"è\",\"&egrave;\":\"è\",\"&eacute\":\"é\",\"&eacute;\":\"é\",\"&ecirc\":\"ê\",\"&ecirc;\":\"ê\",\"&euml\":\"ë\",\"&euml;\":\"ë\",\"&igrave\":\"ì\",\"&igrave;\":\"ì\",\"&iacute\":\"í\",\"&iacute;\":\"í\",\"&icirc\":\"î\",\"&icirc;\":\"î\",\"&iuml\":\"ï\",\"&iuml;\":\"ï\",\"&eth\":\"ð\",\"&eth;\":\"ð\",\"&ntilde\":\"ñ\",\"&ntilde;\":\"ñ\",\"&ograve\":\"ò\",\"&ograve;\":\"ò\",\"&oacute\":\"ó\",\"&oacute;\":\"ó\",\"&ocirc\":\"ô\",\"&ocirc;\":\"ô\",\"&otilde\":\"õ\",\"&otilde;\":\"õ\",\"&ouml\":\"ö\",\"&ouml;\":\"ö\",\"&divide\":\"÷\",\"&divide;\":\"÷\",\"&oslash\":\"ø\",\"&oslash;\":\"ø\",\"&ugrave\":\"ù\",\"&ugrave;\":\"ù\",\"&uacute\":\"ú\",\"&uacute;\":\"ú\",\"&ucirc\":\"û\",\"&ucirc;\":\"û\",\"&uuml\":\"ü\",\"&uuml;\":\"ü\",\"&yacute\":\"ý\",\"&yacute;\":\"ý\",\"&thorn\":\"þ\",\"&thorn;\":\"þ\",\"&yuml\":\"ÿ\",\"&yuml;\":\"ÿ\",\"&quot\":'\"',\"&quot;\":'\"',\"&amp\":\"&\",\"&amp;\":\"&\",\"&lt\":\"<\",\"&lt;\":\"<\",\"&gt\":\">\",\"&gt;\":\">\",\"&OElig;\":\"Œ\",\"&oelig;\":\"œ\",\"&Scaron;\":\"Š\",\"&scaron;\":\"š\",\"&Yuml;\":\"Ÿ\",\"&circ;\":\"ˆ\",\"&tilde;\":\"˜\",\"&ensp;\":\" \",\"&emsp;\":\" \",\"&thinsp;\":\" \",\"&zwnj;\":\"‌\",\"&zwj;\":\"‍\",\"&lrm;\":\"‎\",\"&rlm;\":\"‏\",\"&ndash;\":\"–\",\"&mdash;\":\"—\",\"&lsquo;\":\"‘\",\"&rsquo;\":\"’\",\"&sbquo;\":\"‚\",\"&ldquo;\":\"“\",\"&rdquo;\":\"”\",\"&bdquo;\":\"„\",\"&dagger;\":\"†\",\"&Dagger;\":\"‡\",\"&permil;\":\"‰\",\"&lsaquo;\":\"‹\",\"&rsaquo;\":\"›\",\"&euro;\":\"€\",\"&fnof;\":\"ƒ\",\"&Alpha;\":\"Α\",\"&Beta;\":\"Β\",\"&Gamma;\":\"Γ\",\"&Delta;\":\"Δ\",\"&Epsilon;\":\"Ε\",\"&Zeta;\":\"Ζ\",\"&Eta;\":\"Η\",\"&Theta;\":\"Θ\",\"&Iota;\":\"Ι\",\"&Kappa;\":\"Κ\",\"&Lambda;\":\"Λ\",\"&Mu;\":\"Μ\",\"&Nu;\":\"Ν\",\"&Xi;\":\"Ξ\",\"&Omicron;\":\"Ο\",\"&Pi;\":\"Π\",\"&Rho;\":\"Ρ\",\"&Sigma;\":\"Σ\",\"&Tau;\":\"Τ\",\"&Upsilon;\":\"Υ\",\"&Phi;\":\"Φ\",\"&Chi;\":\"Χ\",\"&Psi;\":\"Ψ\",\"&Omega;\":\"Ω\",\"&alpha;\":\"α\",\"&beta;\":\"β\",\"&gamma;\":\"γ\",\"&delta;\":\"δ\",\"&epsilon;\":\"ε\",\"&zeta;\":\"ζ\",\"&eta;\":\"η\",\"&theta;\":\"θ\",\"&iota;\":\"ι\",\"&kappa;\":\"κ\",\"&lambda;\":\"λ\",\"&mu;\":\"μ\",\"&nu;\":\"ν\",\"&xi;\":\"ξ\",\"&omicron;\":\"ο\",\"&pi;\":\"π\",\"&rho;\":\"ρ\",\"&sigmaf;\":\"ς\",\"&sigma;\":\"σ\",\"&tau;\":\"τ\",\"&upsilon;\":\"υ\",\"&phi;\":\"φ\",\"&chi;\":\"χ\",\"&psi;\":\"ψ\",\"&omega;\":\"ω\",\"&thetasym;\":\"ϑ\",\"&upsih;\":\"ϒ\",\"&piv;\":\"ϖ\",\"&bull;\":\"•\",\"&hellip;\":\"…\",\"&prime;\":\"′\",\"&Prime;\":\"″\",\"&oline;\":\"‾\",\"&frasl;\":\"⁄\",\"&weierp;\":\"℘\",\"&image;\":\"ℑ\",\"&real;\":\"ℜ\",\"&trade;\":\"™\",\"&alefsym;\":\"ℵ\",\"&larr;\":\"←\",\"&uarr;\":\"↑\",\"&rarr;\":\"→\",\"&darr;\":\"↓\",\"&harr;\":\"↔\",\"&crarr;\":\"↵\",\"&lArr;\":\"⇐\",\"&uArr;\":\"⇑\",\"&rArr;\":\"⇒\",\"&dArr;\":\"⇓\",\"&hArr;\":\"⇔\",\"&forall;\":\"∀\",\"&part;\":\"∂\",\"&exist;\":\"∃\",\"&empty;\":\"∅\",\"&nabla;\":\"∇\",\"&isin;\":\"∈\",\"&notin;\":\"∉\",\"&ni;\":\"∋\",\"&prod;\":\"∏\",\"&sum;\":\"∑\",\"&minus;\":\"−\",\"&lowast;\":\"∗\",\"&radic;\":\"√\",\"&prop;\":\"∝\",\"&infin;\":\"∞\",\"&ang;\":\"∠\",\"&and;\":\"∧\",\"&or;\":\"∨\",\"&cap;\":\"∩\",\"&cup;\":\"∪\",\"&int;\":\"∫\",\"&there4;\":\"∴\",\"&sim;\":\"∼\",\"&cong;\":\"≅\",\"&asymp;\":\"≈\",\"&ne;\":\"≠\",\"&equiv;\":\"≡\",\"&le;\":\"≤\",\"&ge;\":\"≥\",\"&sub;\":\"⊂\",\"&sup;\":\"⊃\",\"&nsub;\":\"⊄\",\"&sube;\":\"⊆\",\"&supe;\":\"⊇\",\"&oplus;\":\"⊕\",\"&otimes;\":\"⊗\",\"&perp;\":\"⊥\",\"&sdot;\":\"⋅\",\"&lceil;\":\"⌈\",\"&rceil;\":\"⌉\",\"&lfloor;\":\"⌊\",\"&rfloor;\":\"⌋\",\"&lang;\":\"〈\",\"&rang;\":\"〉\",\"&loz;\":\"◊\",\"&spades;\":\"♠\",\"&clubs;\":\"♣\",\"&hearts;\":\"♥\",\"&diams;\":\"♦\"},characters:{\"'\":\"&apos;\",\" \":\"&nbsp;\",\"¡\":\"&iexcl;\",\"¢\":\"&cent;\",\"£\":\"&pound;\",\"¤\":\"&curren;\",\"¥\":\"&yen;\",\"¦\":\"&brvbar;\",\"§\":\"&sect;\",\"¨\":\"&uml;\",\"©\":\"&copy;\",\"ª\":\"&ordf;\",\"«\":\"&laquo;\",\"¬\":\"&not;\",\"­\":\"&shy;\",\"®\":\"&reg;\",\"¯\":\"&macr;\",\"°\":\"&deg;\",\"±\":\"&plusmn;\",\"²\":\"&sup2;\",\"³\":\"&sup3;\",\"´\":\"&acute;\",\"µ\":\"&micro;\",\"¶\":\"&para;\",\"·\":\"&middot;\",\"¸\":\"&cedil;\",\"¹\":\"&sup1;\",\"º\":\"&ordm;\",\"»\":\"&raquo;\",\"¼\":\"&frac14;\",\"½\":\"&frac12;\",\"¾\":\"&frac34;\",\"¿\":\"&iquest;\",\"À\":\"&Agrave;\",\"Á\":\"&Aacute;\",\"Â\":\"&Acirc;\",\"Ã\":\"&Atilde;\",\"Ä\":\"&Auml;\",\"Å\":\"&Aring;\",\"Æ\":\"&AElig;\",\"Ç\":\"&Ccedil;\",\"È\":\"&Egrave;\",\"É\":\"&Eacute;\",\"Ê\":\"&Ecirc;\",\"Ë\":\"&Euml;\",\"Ì\":\"&Igrave;\",\"Í\":\"&Iacute;\",\"Î\":\"&Icirc;\",\"Ï\":\"&Iuml;\",\"Ð\":\"&ETH;\",\"Ñ\":\"&Ntilde;\",\"Ò\":\"&Ograve;\",\"Ó\":\"&Oacute;\",\"Ô\":\"&Ocirc;\",\"Õ\":\"&Otilde;\",\"Ö\":\"&Ouml;\",\"×\":\"&times;\",\"Ø\":\"&Oslash;\",\"Ù\":\"&Ugrave;\",\"Ú\":\"&Uacute;\",\"Û\":\"&Ucirc;\",\"Ü\":\"&Uuml;\",\"Ý\":\"&Yacute;\",\"Þ\":\"&THORN;\",\"ß\":\"&szlig;\",\"à\":\"&agrave;\",\"á\":\"&aacute;\",\"â\":\"&acirc;\",\"ã\":\"&atilde;\",\"ä\":\"&auml;\",\"å\":\"&aring;\",\"æ\":\"&aelig;\",\"ç\":\"&ccedil;\",\"è\":\"&egrave;\",\"é\":\"&eacute;\",\"ê\":\"&ecirc;\",\"ë\":\"&euml;\",\"ì\":\"&igrave;\",\"í\":\"&iacute;\",\"î\":\"&icirc;\",\"ï\":\"&iuml;\",\"ð\":\"&eth;\",\"ñ\":\"&ntilde;\",\"ò\":\"&ograve;\",\"ó\":\"&oacute;\",\"ô\":\"&ocirc;\",\"õ\":\"&otilde;\",\"ö\":\"&ouml;\",\"÷\":\"&divide;\",\"ø\":\"&oslash;\",\"ù\":\"&ugrave;\",\"ú\":\"&uacute;\",\"û\":\"&ucirc;\",\"ü\":\"&uuml;\",\"ý\":\"&yacute;\",\"þ\":\"&thorn;\",\"ÿ\":\"&yuml;\",'\"':\"&quot;\",\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",\"Œ\":\"&OElig;\",\"œ\":\"&oelig;\",\"Š\":\"&Scaron;\",\"š\":\"&scaron;\",\"Ÿ\":\"&Yuml;\",\"ˆ\":\"&circ;\",\"˜\":\"&tilde;\",\" \":\"&ensp;\",\" \":\"&emsp;\",\" \":\"&thinsp;\",\"‌\":\"&zwnj;\",\"‍\":\"&zwj;\",\"‎\":\"&lrm;\",\"‏\":\"&rlm;\",\"–\":\"&ndash;\",\"—\":\"&mdash;\",\"‘\":\"&lsquo;\",\"’\":\"&rsquo;\",\"‚\":\"&sbquo;\",\"“\":\"&ldquo;\",\"”\":\"&rdquo;\",\"„\":\"&bdquo;\",\"†\":\"&dagger;\",\"‡\":\"&Dagger;\",\"‰\":\"&permil;\",\"‹\":\"&lsaquo;\",\"›\":\"&rsaquo;\",\"€\":\"&euro;\",\"ƒ\":\"&fnof;\",\"Α\":\"&Alpha;\",\"Β\":\"&Beta;\",\"Γ\":\"&Gamma;\",\"Δ\":\"&Delta;\",\"Ε\":\"&Epsilon;\",\"Ζ\":\"&Zeta;\",\"Η\":\"&Eta;\",\"Θ\":\"&Theta;\",\"Ι\":\"&Iota;\",\"Κ\":\"&Kappa;\",\"Λ\":\"&Lambda;\",\"Μ\":\"&Mu;\",\"Ν\":\"&Nu;\",\"Ξ\":\"&Xi;\",\"Ο\":\"&Omicron;\",\"Π\":\"&Pi;\",\"Ρ\":\"&Rho;\",\"Σ\":\"&Sigma;\",\"Τ\":\"&Tau;\",\"Υ\":\"&Upsilon;\",\"Φ\":\"&Phi;\",\"Χ\":\"&Chi;\",\"Ψ\":\"&Psi;\",\"Ω\":\"&Omega;\",\"α\":\"&alpha;\",\"β\":\"&beta;\",\"γ\":\"&gamma;\",\"δ\":\"&delta;\",\"ε\":\"&epsilon;\",\"ζ\":\"&zeta;\",\"η\":\"&eta;\",\"θ\":\"&theta;\",\"ι\":\"&iota;\",\"κ\":\"&kappa;\",\"λ\":\"&lambda;\",\"μ\":\"&mu;\",\"ν\":\"&nu;\",\"ξ\":\"&xi;\",\"ο\":\"&omicron;\",\"π\":\"&pi;\",\"ρ\":\"&rho;\",\"ς\":\"&sigmaf;\",\"σ\":\"&sigma;\",\"τ\":\"&tau;\",\"υ\":\"&upsilon;\",\"φ\":\"&phi;\",\"χ\":\"&chi;\",\"ψ\":\"&psi;\",\"ω\":\"&omega;\",\"ϑ\":\"&thetasym;\",\"ϒ\":\"&upsih;\",\"ϖ\":\"&piv;\",\"•\":\"&bull;\",\"…\":\"&hellip;\",\"′\":\"&prime;\",\"″\":\"&Prime;\",\"‾\":\"&oline;\",\"⁄\":\"&frasl;\",\"℘\":\"&weierp;\",\"ℑ\":\"&image;\",\"ℜ\":\"&real;\",\"™\":\"&trade;\",\"ℵ\":\"&alefsym;\",\"←\":\"&larr;\",\"↑\":\"&uarr;\",\"→\":\"&rarr;\",\"↓\":\"&darr;\",\"↔\":\"&harr;\",\"↵\":\"&crarr;\",\"⇐\":\"&lArr;\",\"⇑\":\"&uArr;\",\"⇒\":\"&rArr;\",\"⇓\":\"&dArr;\",\"⇔\":\"&hArr;\",\"∀\":\"&forall;\",\"∂\":\"&part;\",\"∃\":\"&exist;\",\"∅\":\"&empty;\",\"∇\":\"&nabla;\",\"∈\":\"&isin;\",\"∉\":\"&notin;\",\"∋\":\"&ni;\",\"∏\":\"&prod;\",\"∑\":\"&sum;\",\"−\":\"&minus;\",\"∗\":\"&lowast;\",\"√\":\"&radic;\",\"∝\":\"&prop;\",\"∞\":\"&infin;\",\"∠\":\"&ang;\",\"∧\":\"&and;\",\"∨\":\"&or;\",\"∩\":\"&cap;\",\"∪\":\"&cup;\",\"∫\":\"&int;\",\"∴\":\"&there4;\",\"∼\":\"&sim;\",\"≅\":\"&cong;\",\"≈\":\"&asymp;\",\"≠\":\"&ne;\",\"≡\":\"&equiv;\",\"≤\":\"&le;\",\"≥\":\"&ge;\",\"⊂\":\"&sub;\",\"⊃\":\"&sup;\",\"⊄\":\"&nsub;\",\"⊆\":\"&sube;\",\"⊇\":\"&supe;\",\"⊕\":\"&oplus;\",\"⊗\":\"&otimes;\",\"⊥\":\"&perp;\",\"⋅\":\"&sdot;\",\"⌈\":\"&lceil;\",\"⌉\":\"&rceil;\",\"⌊\":\"&lfloor;\",\"⌋\":\"&rfloor;\",\"〈\":\"&lang;\",\"〉\":\"&rang;\",\"◊\":\"&loz;\",\"♠\":\"&spades;\",\"♣\":\"&clubs;\",\"♥\":\"&hearts;\",\"♦\":\"&diams;\"}},html5:{entities:{\"&AElig\":\"Æ\",\"&AElig;\":\"Æ\",\"&AMP\":\"&\",\"&AMP;\":\"&\",\"&Aacute\":\"Á\",\"&Aacute;\":\"Á\",\"&Abreve;\":\"Ă\",\"&Acirc\":\"Â\",\"&Acirc;\":\"Â\",\"&Acy;\":\"А\",\"&Afr;\":\"𝔄\",\"&Agrave\":\"À\",\"&Agrave;\":\"À\",\"&Alpha;\":\"Α\",\"&Amacr;\":\"Ā\",\"&And;\":\"⩓\",\"&Aogon;\":\"Ą\",\"&Aopf;\":\"𝔸\",\"&ApplyFunction;\":\"⁡\",\"&Aring\":\"Å\",\"&Aring;\":\"Å\",\"&Ascr;\":\"𝒜\",\"&Assign;\":\"≔\",\"&Atilde\":\"Ã\",\"&Atilde;\":\"Ã\",\"&Auml\":\"Ä\",\"&Auml;\":\"Ä\",\"&Backslash;\":\"∖\",\"&Barv;\":\"⫧\",\"&Barwed;\":\"⌆\",\"&Bcy;\":\"Б\",\"&Because;\":\"∵\",\"&Bernoullis;\":\"ℬ\",\"&Beta;\":\"Β\",\"&Bfr;\":\"𝔅\",\"&Bopf;\":\"𝔹\",\"&Breve;\":\"˘\",\"&Bscr;\":\"ℬ\",\"&Bumpeq;\":\"≎\",\"&CHcy;\":\"Ч\",\"&COPY\":\"©\",\"&COPY;\":\"©\",\"&Cacute;\":\"Ć\",\"&Cap;\":\"⋒\",\"&CapitalDifferentialD;\":\"ⅅ\",\"&Cayleys;\":\"ℭ\",\"&Ccaron;\":\"Č\",\"&Ccedil\":\"Ç\",\"&Ccedil;\":\"Ç\",\"&Ccirc;\":\"Ĉ\",\"&Cconint;\":\"∰\",\"&Cdot;\":\"Ċ\",\"&Cedilla;\":\"¸\",\"&CenterDot;\":\"·\",\"&Cfr;\":\"ℭ\",\"&Chi;\":\"Χ\",\"&CircleDot;\":\"⊙\",\"&CircleMinus;\":\"⊖\",\"&CirclePlus;\":\"⊕\",\"&CircleTimes;\":\"⊗\",\"&ClockwiseContourIntegral;\":\"∲\",\"&CloseCurlyDoubleQuote;\":\"”\",\"&CloseCurlyQuote;\":\"’\",\"&Colon;\":\"∷\",\"&Colone;\":\"⩴\",\"&Congruent;\":\"≡\",\"&Conint;\":\"∯\",\"&ContourIntegral;\":\"∮\",\"&Copf;\":\"ℂ\",\"&Coproduct;\":\"∐\",\"&CounterClockwiseContourIntegral;\":\"∳\",\"&Cross;\":\"⨯\",\"&Cscr;\":\"𝒞\",\"&Cup;\":\"⋓\",\"&CupCap;\":\"≍\",\"&DD;\":\"ⅅ\",\"&DDotrahd;\":\"⤑\",\"&DJcy;\":\"Ђ\",\"&DScy;\":\"Ѕ\",\"&DZcy;\":\"Џ\",\"&Dagger;\":\"‡\",\"&Darr;\":\"↡\",\"&Dashv;\":\"⫤\",\"&Dcaron;\":\"Ď\",\"&Dcy;\":\"Д\",\"&Del;\":\"∇\",\"&Delta;\":\"Δ\",\"&Dfr;\":\"𝔇\",\"&DiacriticalAcute;\":\"´\",\"&DiacriticalDot;\":\"˙\",\"&DiacriticalDoubleAcute;\":\"˝\",\"&DiacriticalGrave;\":\"`\",\"&DiacriticalTilde;\":\"˜\",\"&Diamond;\":\"⋄\",\"&DifferentialD;\":\"ⅆ\",\"&Dopf;\":\"𝔻\",\"&Dot;\":\"¨\",\"&DotDot;\":\"⃜\",\"&DotEqual;\":\"≐\",\"&DoubleContourIntegral;\":\"∯\",\"&DoubleDot;\":\"¨\",\"&DoubleDownArrow;\":\"⇓\",\"&DoubleLeftArrow;\":\"⇐\",\"&DoubleLeftRightArrow;\":\"⇔\",\"&DoubleLeftTee;\":\"⫤\",\"&DoubleLongLeftArrow;\":\"⟸\",\"&DoubleLongLeftRightArrow;\":\"⟺\",\"&DoubleLongRightArrow;\":\"⟹\",\"&DoubleRightArrow;\":\"⇒\",\"&DoubleRightTee;\":\"⊨\",\"&DoubleUpArrow;\":\"⇑\",\"&DoubleUpDownArrow;\":\"⇕\",\"&DoubleVerticalBar;\":\"∥\",\"&DownArrow;\":\"↓\",\"&DownArrowBar;\":\"⤓\",\"&DownArrowUpArrow;\":\"⇵\",\"&DownBreve;\":\"̑\",\"&DownLeftRightVector;\":\"⥐\",\"&DownLeftTeeVector;\":\"⥞\",\"&DownLeftVector;\":\"↽\",\"&DownLeftVectorBar;\":\"⥖\",\"&DownRightTeeVector;\":\"⥟\",\"&DownRightVector;\":\"⇁\",\"&DownRightVectorBar;\":\"⥗\",\"&DownTee;\":\"⊤\",\"&DownTeeArrow;\":\"↧\",\"&Downarrow;\":\"⇓\",\"&Dscr;\":\"𝒟\",\"&Dstrok;\":\"Đ\",\"&ENG;\":\"Ŋ\",\"&ETH\":\"Ð\",\"&ETH;\":\"Ð\",\"&Eacute\":\"É\",\"&Eacute;\":\"É\",\"&Ecaron;\":\"Ě\",\"&Ecirc\":\"Ê\",\"&Ecirc;\":\"Ê\",\"&Ecy;\":\"Э\",\"&Edot;\":\"Ė\",\"&Efr;\":\"𝔈\",\"&Egrave\":\"È\",\"&Egrave;\":\"È\",\"&Element;\":\"∈\",\"&Emacr;\":\"Ē\",\"&EmptySmallSquare;\":\"◻\",\"&EmptyVerySmallSquare;\":\"▫\",\"&Eogon;\":\"Ę\",\"&Eopf;\":\"𝔼\",\"&Epsilon;\":\"Ε\",\"&Equal;\":\"⩵\",\"&EqualTilde;\":\"≂\",\"&Equilibrium;\":\"⇌\",\"&Escr;\":\"ℰ\",\"&Esim;\":\"⩳\",\"&Eta;\":\"Η\",\"&Euml\":\"Ë\",\"&Euml;\":\"Ë\",\"&Exists;\":\"∃\",\"&ExponentialE;\":\"ⅇ\",\"&Fcy;\":\"Ф\",\"&Ffr;\":\"𝔉\",\"&FilledSmallSquare;\":\"◼\",\"&FilledVerySmallSquare;\":\"▪\",\"&Fopf;\":\"𝔽\",\"&ForAll;\":\"∀\",\"&Fouriertrf;\":\"ℱ\",\"&Fscr;\":\"ℱ\",\"&GJcy;\":\"Ѓ\",\"&GT\":\">\",\"&GT;\":\">\",\"&Gamma;\":\"Γ\",\"&Gammad;\":\"Ϝ\",\"&Gbreve;\":\"Ğ\",\"&Gcedil;\":\"Ģ\",\"&Gcirc;\":\"Ĝ\",\"&Gcy;\":\"Г\",\"&Gdot;\":\"Ġ\",\"&Gfr;\":\"𝔊\",\"&Gg;\":\"⋙\",\"&Gopf;\":\"𝔾\",\"&GreaterEqual;\":\"≥\",\"&GreaterEqualLess;\":\"⋛\",\"&GreaterFullEqual;\":\"≧\",\"&GreaterGreater;\":\"⪢\",\"&GreaterLess;\":\"≷\",\"&GreaterSlantEqual;\":\"⩾\",\"&GreaterTilde;\":\"≳\",\"&Gscr;\":\"𝒢\",\"&Gt;\":\"≫\",\"&HARDcy;\":\"Ъ\",\"&Hacek;\":\"ˇ\",\"&Hat;\":\"^\",\"&Hcirc;\":\"Ĥ\",\"&Hfr;\":\"ℌ\",\"&HilbertSpace;\":\"ℋ\",\"&Hopf;\":\"ℍ\",\"&HorizontalLine;\":\"─\",\"&Hscr;\":\"ℋ\",\"&Hstrok;\":\"Ħ\",\"&HumpDownHump;\":\"≎\",\"&HumpEqual;\":\"≏\",\"&IEcy;\":\"Е\",\"&IJlig;\":\"Ĳ\",\"&IOcy;\":\"Ё\",\"&Iacute\":\"Í\",\"&Iacute;\":\"Í\",\"&Icirc\":\"Î\",\"&Icirc;\":\"Î\",\"&Icy;\":\"И\",\"&Idot;\":\"İ\",\"&Ifr;\":\"ℑ\",\"&Igrave\":\"Ì\",\"&Igrave;\":\"Ì\",\"&Im;\":\"ℑ\",\"&Imacr;\":\"Ī\",\"&ImaginaryI;\":\"ⅈ\",\"&Implies;\":\"⇒\",\"&Int;\":\"∬\",\"&Integral;\":\"∫\",\"&Intersection;\":\"⋂\",\"&InvisibleComma;\":\"⁣\",\"&InvisibleTimes;\":\"⁢\",\"&Iogon;\":\"Į\",\"&Iopf;\":\"𝕀\",\"&Iota;\":\"Ι\",\"&Iscr;\":\"ℐ\",\"&Itilde;\":\"Ĩ\",\"&Iukcy;\":\"І\",\"&Iuml\":\"Ï\",\"&Iuml;\":\"Ï\",\"&Jcirc;\":\"Ĵ\",\"&Jcy;\":\"Й\",\"&Jfr;\":\"𝔍\",\"&Jopf;\":\"𝕁\",\"&Jscr;\":\"𝒥\",\"&Jsercy;\":\"Ј\",\"&Jukcy;\":\"Є\",\"&KHcy;\":\"Х\",\"&KJcy;\":\"Ќ\",\"&Kappa;\":\"Κ\",\"&Kcedil;\":\"Ķ\",\"&Kcy;\":\"К\",\"&Kfr;\":\"𝔎\",\"&Kopf;\":\"𝕂\",\"&Kscr;\":\"𝒦\",\"&LJcy;\":\"Љ\",\"&LT\":\"<\",\"&LT;\":\"<\",\"&Lacute;\":\"Ĺ\",\"&Lambda;\":\"Λ\",\"&Lang;\":\"⟪\",\"&Laplacetrf;\":\"ℒ\",\"&Larr;\":\"↞\",\"&Lcaron;\":\"Ľ\",\"&Lcedil;\":\"Ļ\",\"&Lcy;\":\"Л\",\"&LeftAngleBracket;\":\"⟨\",\"&LeftArrow;\":\"←\",\"&LeftArrowBar;\":\"⇤\",\"&LeftArrowRightArrow;\":\"⇆\",\"&LeftCeiling;\":\"⌈\",\"&LeftDoubleBracket;\":\"⟦\",\"&LeftDownTeeVector;\":\"⥡\",\"&LeftDownVector;\":\"⇃\",\"&LeftDownVectorBar;\":\"⥙\",\"&LeftFloor;\":\"⌊\",\"&LeftRightArrow;\":\"↔\",\"&LeftRightVector;\":\"⥎\",\"&LeftTee;\":\"⊣\",\"&LeftTeeArrow;\":\"↤\",\"&LeftTeeVector;\":\"⥚\",\"&LeftTriangle;\":\"⊲\",\"&LeftTriangleBar;\":\"⧏\",\"&LeftTriangleEqual;\":\"⊴\",\"&LeftUpDownVector;\":\"⥑\",\"&LeftUpTeeVector;\":\"⥠\",\"&LeftUpVector;\":\"↿\",\"&LeftUpVectorBar;\":\"⥘\",\"&LeftVector;\":\"↼\",\"&LeftVectorBar;\":\"⥒\",\"&Leftarrow;\":\"⇐\",\"&Leftrightarrow;\":\"⇔\",\"&LessEqualGreater;\":\"⋚\",\"&LessFullEqual;\":\"≦\",\"&LessGreater;\":\"≶\",\"&LessLess;\":\"⪡\",\"&LessSlantEqual;\":\"⩽\",\"&LessTilde;\":\"≲\",\"&Lfr;\":\"𝔏\",\"&Ll;\":\"⋘\",\"&Lleftarrow;\":\"⇚\",\"&Lmidot;\":\"Ŀ\",\"&LongLeftArrow;\":\"⟵\",\"&LongLeftRightArrow;\":\"⟷\",\"&LongRightArrow;\":\"⟶\",\"&Longleftarrow;\":\"⟸\",\"&Longleftrightarrow;\":\"⟺\",\"&Longrightarrow;\":\"⟹\",\"&Lopf;\":\"𝕃\",\"&LowerLeftArrow;\":\"↙\",\"&LowerRightArrow;\":\"↘\",\"&Lscr;\":\"ℒ\",\"&Lsh;\":\"↰\",\"&Lstrok;\":\"Ł\",\"&Lt;\":\"≪\",\"&Map;\":\"⤅\",\"&Mcy;\":\"М\",\"&MediumSpace;\":\" \",\"&Mellintrf;\":\"ℳ\",\"&Mfr;\":\"𝔐\",\"&MinusPlus;\":\"∓\",\"&Mopf;\":\"𝕄\",\"&Mscr;\":\"ℳ\",\"&Mu;\":\"Μ\",\"&NJcy;\":\"Њ\",\"&Nacute;\":\"Ń\",\"&Ncaron;\":\"Ň\",\"&Ncedil;\":\"Ņ\",\"&Ncy;\":\"Н\",\"&NegativeMediumSpace;\":\"​\",\"&NegativeThickSpace;\":\"​\",\"&NegativeThinSpace;\":\"​\",\"&NegativeVeryThinSpace;\":\"​\",\"&NestedGreaterGreater;\":\"≫\",\"&NestedLessLess;\":\"≪\",\"&NewLine;\":\"\\n\",\"&Nfr;\":\"𝔑\",\"&NoBreak;\":\"⁠\",\"&NonBreakingSpace;\":\" \",\"&Nopf;\":\"ℕ\",\"&Not;\":\"⫬\",\"&NotCongruent;\":\"≢\",\"&NotCupCap;\":\"≭\",\"&NotDoubleVerticalBar;\":\"∦\",\"&NotElement;\":\"∉\",\"&NotEqual;\":\"≠\",\"&NotEqualTilde;\":\"≂̸\",\"&NotExists;\":\"∄\",\"&NotGreater;\":\"≯\",\"&NotGreaterEqual;\":\"≱\",\"&NotGreaterFullEqual;\":\"≧̸\",\"&NotGreaterGreater;\":\"≫̸\",\"&NotGreaterLess;\":\"≹\",\"&NotGreaterSlantEqual;\":\"⩾̸\",\"&NotGreaterTilde;\":\"≵\",\"&NotHumpDownHump;\":\"≎̸\",\"&NotHumpEqual;\":\"≏̸\",\"&NotLeftTriangle;\":\"⋪\",\"&NotLeftTriangleBar;\":\"⧏̸\",\"&NotLeftTriangleEqual;\":\"⋬\",\"&NotLess;\":\"≮\",\"&NotLessEqual;\":\"≰\",\"&NotLessGreater;\":\"≸\",\"&NotLessLess;\":\"≪̸\",\"&NotLessSlantEqual;\":\"⩽̸\",\"&NotLessTilde;\":\"≴\",\"&NotNestedGreaterGreater;\":\"⪢̸\",\"&NotNestedLessLess;\":\"⪡̸\",\"&NotPrecedes;\":\"⊀\",\"&NotPrecedesEqual;\":\"⪯̸\",\"&NotPrecedesSlantEqual;\":\"⋠\",\"&NotReverseElement;\":\"∌\",\"&NotRightTriangle;\":\"⋫\",\"&NotRightTriangleBar;\":\"⧐̸\",\"&NotRightTriangleEqual;\":\"⋭\",\"&NotSquareSubset;\":\"⊏̸\",\"&NotSquareSubsetEqual;\":\"⋢\",\"&NotSquareSuperset;\":\"⊐̸\",\"&NotSquareSupersetEqual;\":\"⋣\",\"&NotSubset;\":\"⊂⃒\",\"&NotSubsetEqual;\":\"⊈\",\"&NotSucceeds;\":\"⊁\",\"&NotSucceedsEqual;\":\"⪰̸\",\"&NotSucceedsSlantEqual;\":\"⋡\",\"&NotSucceedsTilde;\":\"≿̸\",\"&NotSuperset;\":\"⊃⃒\",\"&NotSupersetEqual;\":\"⊉\",\"&NotTilde;\":\"≁\",\"&NotTildeEqual;\":\"≄\",\"&NotTildeFullEqual;\":\"≇\",\"&NotTildeTilde;\":\"≉\",\"&NotVerticalBar;\":\"∤\",\"&Nscr;\":\"𝒩\",\"&Ntilde\":\"Ñ\",\"&Ntilde;\":\"Ñ\",\"&Nu;\":\"Ν\",\"&OElig;\":\"Œ\",\"&Oacute\":\"Ó\",\"&Oacute;\":\"Ó\",\"&Ocirc\":\"Ô\",\"&Ocirc;\":\"Ô\",\"&Ocy;\":\"О\",\"&Odblac;\":\"Ő\",\"&Ofr;\":\"𝔒\",\"&Ograve\":\"Ò\",\"&Ograve;\":\"Ò\",\"&Omacr;\":\"Ō\",\"&Omega;\":\"Ω\",\"&Omicron;\":\"Ο\",\"&Oopf;\":\"𝕆\",\"&OpenCurlyDoubleQuote;\":\"“\",\"&OpenCurlyQuote;\":\"‘\",\"&Or;\":\"⩔\",\"&Oscr;\":\"𝒪\",\"&Oslash\":\"Ø\",\"&Oslash;\":\"Ø\",\"&Otilde\":\"Õ\",\"&Otilde;\":\"Õ\",\"&Otimes;\":\"⨷\",\"&Ouml\":\"Ö\",\"&Ouml;\":\"Ö\",\"&OverBar;\":\"‾\",\"&OverBrace;\":\"⏞\",\"&OverBracket;\":\"⎴\",\"&OverParenthesis;\":\"⏜\",\"&PartialD;\":\"∂\",\"&Pcy;\":\"П\",\"&Pfr;\":\"𝔓\",\"&Phi;\":\"Φ\",\"&Pi;\":\"Π\",\"&PlusMinus;\":\"±\",\"&Poincareplane;\":\"ℌ\",\"&Popf;\":\"ℙ\",\"&Pr;\":\"⪻\",\"&Precedes;\":\"≺\",\"&PrecedesEqual;\":\"⪯\",\"&PrecedesSlantEqual;\":\"≼\",\"&PrecedesTilde;\":\"≾\",\"&Prime;\":\"″\",\"&Product;\":\"∏\",\"&Proportion;\":\"∷\",\"&Proportional;\":\"∝\",\"&Pscr;\":\"𝒫\",\"&Psi;\":\"Ψ\",\"&QUOT\":'\"',\"&QUOT;\":'\"',\"&Qfr;\":\"𝔔\",\"&Qopf;\":\"ℚ\",\"&Qscr;\":\"𝒬\",\"&RBarr;\":\"⤐\",\"&REG\":\"®\",\"&REG;\":\"®\",\"&Racute;\":\"Ŕ\",\"&Rang;\":\"⟫\",\"&Rarr;\":\"↠\",\"&Rarrtl;\":\"⤖\",\"&Rcaron;\":\"Ř\",\"&Rcedil;\":\"Ŗ\",\"&Rcy;\":\"Р\",\"&Re;\":\"ℜ\",\"&ReverseElement;\":\"∋\",\"&ReverseEquilibrium;\":\"⇋\",\"&ReverseUpEquilibrium;\":\"⥯\",\"&Rfr;\":\"ℜ\",\"&Rho;\":\"Ρ\",\"&RightAngleBracket;\":\"⟩\",\"&RightArrow;\":\"→\",\"&RightArrowBar;\":\"⇥\",\"&RightArrowLeftArrow;\":\"⇄\",\"&RightCeiling;\":\"⌉\",\"&RightDoubleBracket;\":\"⟧\",\"&RightDownTeeVector;\":\"⥝\",\"&RightDownVector;\":\"⇂\",\"&RightDownVectorBar;\":\"⥕\",\"&RightFloor;\":\"⌋\",\"&RightTee;\":\"⊢\",\"&RightTeeArrow;\":\"↦\",\"&RightTeeVector;\":\"⥛\",\"&RightTriangle;\":\"⊳\",\"&RightTriangleBar;\":\"⧐\",\"&RightTriangleEqual;\":\"⊵\",\"&RightUpDownVector;\":\"⥏\",\"&RightUpTeeVector;\":\"⥜\",\"&RightUpVector;\":\"↾\",\"&RightUpVectorBar;\":\"⥔\",\"&RightVector;\":\"⇀\",\"&RightVectorBar;\":\"⥓\",\"&Rightarrow;\":\"⇒\",\"&Ropf;\":\"ℝ\",\"&RoundImplies;\":\"⥰\",\"&Rrightarrow;\":\"⇛\",\"&Rscr;\":\"ℛ\",\"&Rsh;\":\"↱\",\"&RuleDelayed;\":\"⧴\",\"&SHCHcy;\":\"Щ\",\"&SHcy;\":\"Ш\",\"&SOFTcy;\":\"Ь\",\"&Sacute;\":\"Ś\",\"&Sc;\":\"⪼\",\"&Scaron;\":\"Š\",\"&Scedil;\":\"Ş\",\"&Scirc;\":\"Ŝ\",\"&Scy;\":\"С\",\"&Sfr;\":\"𝔖\",\"&ShortDownArrow;\":\"↓\",\"&ShortLeftArrow;\":\"←\",\"&ShortRightArrow;\":\"→\",\"&ShortUpArrow;\":\"↑\",\"&Sigma;\":\"Σ\",\"&SmallCircle;\":\"∘\",\"&Sopf;\":\"𝕊\",\"&Sqrt;\":\"√\",\"&Square;\":\"□\",\"&SquareIntersection;\":\"⊓\",\"&SquareSubset;\":\"⊏\",\"&SquareSubsetEqual;\":\"⊑\",\"&SquareSuperset;\":\"⊐\",\"&SquareSupersetEqual;\":\"⊒\",\"&SquareUnion;\":\"⊔\",\"&Sscr;\":\"𝒮\",\"&Star;\":\"⋆\",\"&Sub;\":\"⋐\",\"&Subset;\":\"⋐\",\"&SubsetEqual;\":\"⊆\",\"&Succeeds;\":\"≻\",\"&SucceedsEqual;\":\"⪰\",\"&SucceedsSlantEqual;\":\"≽\",\"&SucceedsTilde;\":\"≿\",\"&SuchThat;\":\"∋\",\"&Sum;\":\"∑\",\"&Sup;\":\"⋑\",\"&Superset;\":\"⊃\",\"&SupersetEqual;\":\"⊇\",\"&Supset;\":\"⋑\",\"&THORN\":\"Þ\",\"&THORN;\":\"Þ\",\"&TRADE;\":\"™\",\"&TSHcy;\":\"Ћ\",\"&TScy;\":\"Ц\",\"&Tab;\":\"\\t\",\"&Tau;\":\"Τ\",\"&Tcaron;\":\"Ť\",\"&Tcedil;\":\"Ţ\",\"&Tcy;\":\"Т\",\"&Tfr;\":\"𝔗\",\"&Therefore;\":\"∴\",\"&Theta;\":\"Θ\",\"&ThickSpace;\":\"  \",\"&ThinSpace;\":\" \",\"&Tilde;\":\"∼\",\"&TildeEqual;\":\"≃\",\"&TildeFullEqual;\":\"≅\",\"&TildeTilde;\":\"≈\",\"&Topf;\":\"𝕋\",\"&TripleDot;\":\"⃛\",\"&Tscr;\":\"𝒯\",\"&Tstrok;\":\"Ŧ\",\"&Uacute\":\"Ú\",\"&Uacute;\":\"Ú\",\"&Uarr;\":\"↟\",\"&Uarrocir;\":\"⥉\",\"&Ubrcy;\":\"Ў\",\"&Ubreve;\":\"Ŭ\",\"&Ucirc\":\"Û\",\"&Ucirc;\":\"Û\",\"&Ucy;\":\"У\",\"&Udblac;\":\"Ű\",\"&Ufr;\":\"𝔘\",\"&Ugrave\":\"Ù\",\"&Ugrave;\":\"Ù\",\"&Umacr;\":\"Ū\",\"&UnderBar;\":\"_\",\"&UnderBrace;\":\"⏟\",\"&UnderBracket;\":\"⎵\",\"&UnderParenthesis;\":\"⏝\",\"&Union;\":\"⋃\",\"&UnionPlus;\":\"⊎\",\"&Uogon;\":\"Ų\",\"&Uopf;\":\"𝕌\",\"&UpArrow;\":\"↑\",\"&UpArrowBar;\":\"⤒\",\"&UpArrowDownArrow;\":\"⇅\",\"&UpDownArrow;\":\"↕\",\"&UpEquilibrium;\":\"⥮\",\"&UpTee;\":\"⊥\",\"&UpTeeArrow;\":\"↥\",\"&Uparrow;\":\"⇑\",\"&Updownarrow;\":\"⇕\",\"&UpperLeftArrow;\":\"↖\",\"&UpperRightArrow;\":\"↗\",\"&Upsi;\":\"ϒ\",\"&Upsilon;\":\"Υ\",\"&Uring;\":\"Ů\",\"&Uscr;\":\"𝒰\",\"&Utilde;\":\"Ũ\",\"&Uuml\":\"Ü\",\"&Uuml;\":\"Ü\",\"&VDash;\":\"⊫\",\"&Vbar;\":\"⫫\",\"&Vcy;\":\"В\",\"&Vdash;\":\"⊩\",\"&Vdashl;\":\"⫦\",\"&Vee;\":\"⋁\",\"&Verbar;\":\"‖\",\"&Vert;\":\"‖\",\"&VerticalBar;\":\"∣\",\"&VerticalLine;\":\"|\",\"&VerticalSeparator;\":\"❘\",\"&VerticalTilde;\":\"≀\",\"&VeryThinSpace;\":\" \",\"&Vfr;\":\"𝔙\",\"&Vopf;\":\"𝕍\",\"&Vscr;\":\"𝒱\",\"&Vvdash;\":\"⊪\",\"&Wcirc;\":\"Ŵ\",\"&Wedge;\":\"⋀\",\"&Wfr;\":\"𝔚\",\"&Wopf;\":\"𝕎\",\"&Wscr;\":\"𝒲\",\"&Xfr;\":\"𝔛\",\"&Xi;\":\"Ξ\",\"&Xopf;\":\"𝕏\",\"&Xscr;\":\"𝒳\",\"&YAcy;\":\"Я\",\"&YIcy;\":\"Ї\",\"&YUcy;\":\"Ю\",\"&Yacute\":\"Ý\",\"&Yacute;\":\"Ý\",\"&Ycirc;\":\"Ŷ\",\"&Ycy;\":\"Ы\",\"&Yfr;\":\"𝔜\",\"&Yopf;\":\"𝕐\",\"&Yscr;\":\"𝒴\",\"&Yuml;\":\"Ÿ\",\"&ZHcy;\":\"Ж\",\"&Zacute;\":\"Ź\",\"&Zcaron;\":\"Ž\",\"&Zcy;\":\"З\",\"&Zdot;\":\"Ż\",\"&ZeroWidthSpace;\":\"​\",\"&Zeta;\":\"Ζ\",\"&Zfr;\":\"ℨ\",\"&Zopf;\":\"ℤ\",\"&Zscr;\":\"𝒵\",\"&aacute\":\"á\",\"&aacute;\":\"á\",\"&abreve;\":\"ă\",\"&ac;\":\"∾\",\"&acE;\":\"∾̳\",\"&acd;\":\"∿\",\"&acirc\":\"â\",\"&acirc;\":\"â\",\"&acute\":\"´\",\"&acute;\":\"´\",\"&acy;\":\"а\",\"&aelig\":\"æ\",\"&aelig;\":\"æ\",\"&af;\":\"⁡\",\"&afr;\":\"𝔞\",\"&agrave\":\"à\",\"&agrave;\":\"à\",\"&alefsym;\":\"ℵ\",\"&aleph;\":\"ℵ\",\"&alpha;\":\"α\",\"&amacr;\":\"ā\",\"&amalg;\":\"⨿\",\"&amp\":\"&\",\"&amp;\":\"&\",\"&and;\":\"∧\",\"&andand;\":\"⩕\",\"&andd;\":\"⩜\",\"&andslope;\":\"⩘\",\"&andv;\":\"⩚\",\"&ang;\":\"∠\",\"&ange;\":\"⦤\",\"&angle;\":\"∠\",\"&angmsd;\":\"∡\",\"&angmsdaa;\":\"⦨\",\"&angmsdab;\":\"⦩\",\"&angmsdac;\":\"⦪\",\"&angmsdad;\":\"⦫\",\"&angmsdae;\":\"⦬\",\"&angmsdaf;\":\"⦭\",\"&angmsdag;\":\"⦮\",\"&angmsdah;\":\"⦯\",\"&angrt;\":\"∟\",\"&angrtvb;\":\"⊾\",\"&angrtvbd;\":\"⦝\",\"&angsph;\":\"∢\",\"&angst;\":\"Å\",\"&angzarr;\":\"⍼\",\"&aogon;\":\"ą\",\"&aopf;\":\"𝕒\",\"&ap;\":\"≈\",\"&apE;\":\"⩰\",\"&apacir;\":\"⩯\",\"&ape;\":\"≊\",\"&apid;\":\"≋\",\"&apos;\":\"'\",\"&approx;\":\"≈\",\"&approxeq;\":\"≊\",\"&aring\":\"å\",\"&aring;\":\"å\",\"&ascr;\":\"𝒶\",\"&ast;\":\"*\",\"&asymp;\":\"≈\",\"&asympeq;\":\"≍\",\"&atilde\":\"ã\",\"&atilde;\":\"ã\",\"&auml\":\"ä\",\"&auml;\":\"ä\",\"&awconint;\":\"∳\",\"&awint;\":\"⨑\",\"&bNot;\":\"⫭\",\"&backcong;\":\"≌\",\"&backepsilon;\":\"϶\",\"&backprime;\":\"‵\",\"&backsim;\":\"∽\",\"&backsimeq;\":\"⋍\",\"&barvee;\":\"⊽\",\"&barwed;\":\"⌅\",\"&barwedge;\":\"⌅\",\"&bbrk;\":\"⎵\",\"&bbrktbrk;\":\"⎶\",\"&bcong;\":\"≌\",\"&bcy;\":\"б\",\"&bdquo;\":\"„\",\"&becaus;\":\"∵\",\"&because;\":\"∵\",\"&bemptyv;\":\"⦰\",\"&bepsi;\":\"϶\",\"&bernou;\":\"ℬ\",\"&beta;\":\"β\",\"&beth;\":\"ℶ\",\"&between;\":\"≬\",\"&bfr;\":\"𝔟\",\"&bigcap;\":\"⋂\",\"&bigcirc;\":\"◯\",\"&bigcup;\":\"⋃\",\"&bigodot;\":\"⨀\",\"&bigoplus;\":\"⨁\",\"&bigotimes;\":\"⨂\",\"&bigsqcup;\":\"⨆\",\"&bigstar;\":\"★\",\"&bigtriangledown;\":\"▽\",\"&bigtriangleup;\":\"△\",\"&biguplus;\":\"⨄\",\"&bigvee;\":\"⋁\",\"&bigwedge;\":\"⋀\",\"&bkarow;\":\"⤍\",\"&blacklozenge;\":\"⧫\",\"&blacksquare;\":\"▪\",\"&blacktriangle;\":\"▴\",\"&blacktriangledown;\":\"▾\",\"&blacktriangleleft;\":\"◂\",\"&blacktriangleright;\":\"▸\",\"&blank;\":\"␣\",\"&blk12;\":\"▒\",\"&blk14;\":\"░\",\"&blk34;\":\"▓\",\"&block;\":\"█\",\"&bne;\":\"=⃥\",\"&bnequiv;\":\"≡⃥\",\"&bnot;\":\"⌐\",\"&bopf;\":\"𝕓\",\"&bot;\":\"⊥\",\"&bottom;\":\"⊥\",\"&bowtie;\":\"⋈\",\"&boxDL;\":\"╗\",\"&boxDR;\":\"╔\",\"&boxDl;\":\"╖\",\"&boxDr;\":\"╓\",\"&boxH;\":\"═\",\"&boxHD;\":\"╦\",\"&boxHU;\":\"╩\",\"&boxHd;\":\"╤\",\"&boxHu;\":\"╧\",\"&boxUL;\":\"╝\",\"&boxUR;\":\"╚\",\"&boxUl;\":\"╜\",\"&boxUr;\":\"╙\",\"&boxV;\":\"║\",\"&boxVH;\":\"╬\",\"&boxVL;\":\"╣\",\"&boxVR;\":\"╠\",\"&boxVh;\":\"╫\",\"&boxVl;\":\"╢\",\"&boxVr;\":\"╟\",\"&boxbox;\":\"⧉\",\"&boxdL;\":\"╕\",\"&boxdR;\":\"╒\",\"&boxdl;\":\"┐\",\"&boxdr;\":\"┌\",\"&boxh;\":\"─\",\"&boxhD;\":\"╥\",\"&boxhU;\":\"╨\",\"&boxhd;\":\"┬\",\"&boxhu;\":\"┴\",\"&boxminus;\":\"⊟\",\"&boxplus;\":\"⊞\",\"&boxtimes;\":\"⊠\",\"&boxuL;\":\"╛\",\"&boxuR;\":\"╘\",\"&boxul;\":\"┘\",\"&boxur;\":\"└\",\"&boxv;\":\"│\",\"&boxvH;\":\"╪\",\"&boxvL;\":\"╡\",\"&boxvR;\":\"╞\",\"&boxvh;\":\"┼\",\"&boxvl;\":\"┤\",\"&boxvr;\":\"├\",\"&bprime;\":\"‵\",\"&breve;\":\"˘\",\"&brvbar\":\"¦\",\"&brvbar;\":\"¦\",\"&bscr;\":\"𝒷\",\"&bsemi;\":\"⁏\",\"&bsim;\":\"∽\",\"&bsime;\":\"⋍\",\"&bsol;\":\"\\\\\",\"&bsolb;\":\"⧅\",\"&bsolhsub;\":\"⟈\",\"&bull;\":\"•\",\"&bullet;\":\"•\",\"&bump;\":\"≎\",\"&bumpE;\":\"⪮\",\"&bumpe;\":\"≏\",\"&bumpeq;\":\"≏\",\"&cacute;\":\"ć\",\"&cap;\":\"∩\",\"&capand;\":\"⩄\",\"&capbrcup;\":\"⩉\",\"&capcap;\":\"⩋\",\"&capcup;\":\"⩇\",\"&capdot;\":\"⩀\",\"&caps;\":\"∩︀\",\"&caret;\":\"⁁\",\"&caron;\":\"ˇ\",\"&ccaps;\":\"⩍\",\"&ccaron;\":\"č\",\"&ccedil\":\"ç\",\"&ccedil;\":\"ç\",\"&ccirc;\":\"ĉ\",\"&ccups;\":\"⩌\",\"&ccupssm;\":\"⩐\",\"&cdot;\":\"ċ\",\"&cedil\":\"¸\",\"&cedil;\":\"¸\",\"&cemptyv;\":\"⦲\",\"&cent\":\"¢\",\"&cent;\":\"¢\",\"&centerdot;\":\"·\",\"&cfr;\":\"𝔠\",\"&chcy;\":\"ч\",\"&check;\":\"✓\",\"&checkmark;\":\"✓\",\"&chi;\":\"χ\",\"&cir;\":\"○\",\"&cirE;\":\"⧃\",\"&circ;\":\"ˆ\",\"&circeq;\":\"≗\",\"&circlearrowleft;\":\"↺\",\"&circlearrowright;\":\"↻\",\"&circledR;\":\"®\",\"&circledS;\":\"Ⓢ\",\"&circledast;\":\"⊛\",\"&circledcirc;\":\"⊚\",\"&circleddash;\":\"⊝\",\"&cire;\":\"≗\",\"&cirfnint;\":\"⨐\",\"&cirmid;\":\"⫯\",\"&cirscir;\":\"⧂\",\"&clubs;\":\"♣\",\"&clubsuit;\":\"♣\",\"&colon;\":\":\",\"&colone;\":\"≔\",\"&coloneq;\":\"≔\",\"&comma;\":\",\",\"&commat;\":\"@\",\"&comp;\":\"∁\",\"&compfn;\":\"∘\",\"&complement;\":\"∁\",\"&complexes;\":\"ℂ\",\"&cong;\":\"≅\",\"&congdot;\":\"⩭\",\"&conint;\":\"∮\",\"&copf;\":\"𝕔\",\"&coprod;\":\"∐\",\"&copy\":\"©\",\"&copy;\":\"©\",\"&copysr;\":\"℗\",\"&crarr;\":\"↵\",\"&cross;\":\"✗\",\"&cscr;\":\"𝒸\",\"&csub;\":\"⫏\",\"&csube;\":\"⫑\",\"&csup;\":\"⫐\",\"&csupe;\":\"⫒\",\"&ctdot;\":\"⋯\",\"&cudarrl;\":\"⤸\",\"&cudarrr;\":\"⤵\",\"&cuepr;\":\"⋞\",\"&cuesc;\":\"⋟\",\"&cularr;\":\"↶\",\"&cularrp;\":\"⤽\",\"&cup;\":\"∪\",\"&cupbrcap;\":\"⩈\",\"&cupcap;\":\"⩆\",\"&cupcup;\":\"⩊\",\"&cupdot;\":\"⊍\",\"&cupor;\":\"⩅\",\"&cups;\":\"∪︀\",\"&curarr;\":\"↷\",\"&curarrm;\":\"⤼\",\"&curlyeqprec;\":\"⋞\",\"&curlyeqsucc;\":\"⋟\",\"&curlyvee;\":\"⋎\",\"&curlywedge;\":\"⋏\",\"&curren\":\"¤\",\"&curren;\":\"¤\",\"&curvearrowleft;\":\"↶\",\"&curvearrowright;\":\"↷\",\"&cuvee;\":\"⋎\",\"&cuwed;\":\"⋏\",\"&cwconint;\":\"∲\",\"&cwint;\":\"∱\",\"&cylcty;\":\"⌭\",\"&dArr;\":\"⇓\",\"&dHar;\":\"⥥\",\"&dagger;\":\"†\",\"&daleth;\":\"ℸ\",\"&darr;\":\"↓\",\"&dash;\":\"‐\",\"&dashv;\":\"⊣\",\"&dbkarow;\":\"⤏\",\"&dblac;\":\"˝\",\"&dcaron;\":\"ď\",\"&dcy;\":\"д\",\"&dd;\":\"ⅆ\",\"&ddagger;\":\"‡\",\"&ddarr;\":\"⇊\",\"&ddotseq;\":\"⩷\",\"&deg\":\"°\",\"&deg;\":\"°\",\"&delta;\":\"δ\",\"&demptyv;\":\"⦱\",\"&dfisht;\":\"⥿\",\"&dfr;\":\"𝔡\",\"&dharl;\":\"⇃\",\"&dharr;\":\"⇂\",\"&diam;\":\"⋄\",\"&diamond;\":\"⋄\",\"&diamondsuit;\":\"♦\",\"&diams;\":\"♦\",\"&die;\":\"¨\",\"&digamma;\":\"ϝ\",\"&disin;\":\"⋲\",\"&div;\":\"÷\",\"&divide\":\"÷\",\"&divide;\":\"÷\",\"&divideontimes;\":\"⋇\",\"&divonx;\":\"⋇\",\"&djcy;\":\"ђ\",\"&dlcorn;\":\"⌞\",\"&dlcrop;\":\"⌍\",\"&dollar;\":\"$\",\"&dopf;\":\"𝕕\",\"&dot;\":\"˙\",\"&doteq;\":\"≐\",\"&doteqdot;\":\"≑\",\"&dotminus;\":\"∸\",\"&dotplus;\":\"∔\",\"&dotsquare;\":\"⊡\",\"&doublebarwedge;\":\"⌆\",\"&downarrow;\":\"↓\",\"&downdownarrows;\":\"⇊\",\"&downharpoonleft;\":\"⇃\",\"&downharpoonright;\":\"⇂\",\"&drbkarow;\":\"⤐\",\"&drcorn;\":\"⌟\",\"&drcrop;\":\"⌌\",\"&dscr;\":\"𝒹\",\"&dscy;\":\"ѕ\",\"&dsol;\":\"⧶\",\"&dstrok;\":\"đ\",\"&dtdot;\":\"⋱\",\"&dtri;\":\"▿\",\"&dtrif;\":\"▾\",\"&duarr;\":\"⇵\",\"&duhar;\":\"⥯\",\"&dwangle;\":\"⦦\",\"&dzcy;\":\"џ\",\"&dzigrarr;\":\"⟿\",\"&eDDot;\":\"⩷\",\"&eDot;\":\"≑\",\"&eacute\":\"é\",\"&eacute;\":\"é\",\"&easter;\":\"⩮\",\"&ecaron;\":\"ě\",\"&ecir;\":\"≖\",\"&ecirc\":\"ê\",\"&ecirc;\":\"ê\",\"&ecolon;\":\"≕\",\"&ecy;\":\"э\",\"&edot;\":\"ė\",\"&ee;\":\"ⅇ\",\"&efDot;\":\"≒\",\"&efr;\":\"𝔢\",\"&eg;\":\"⪚\",\"&egrave\":\"è\",\"&egrave;\":\"è\",\"&egs;\":\"⪖\",\"&egsdot;\":\"⪘\",\"&el;\":\"⪙\",\"&elinters;\":\"⏧\",\"&ell;\":\"ℓ\",\"&els;\":\"⪕\",\"&elsdot;\":\"⪗\",\"&emacr;\":\"ē\",\"&empty;\":\"∅\",\"&emptyset;\":\"∅\",\"&emptyv;\":\"∅\",\"&emsp13;\":\" \",\"&emsp14;\":\" \",\"&emsp;\":\" \",\"&eng;\":\"ŋ\",\"&ensp;\":\" \",\"&eogon;\":\"ę\",\"&eopf;\":\"𝕖\",\"&epar;\":\"⋕\",\"&eparsl;\":\"⧣\",\"&eplus;\":\"⩱\",\"&epsi;\":\"ε\",\"&epsilon;\":\"ε\",\"&epsiv;\":\"ϵ\",\"&eqcirc;\":\"≖\",\"&eqcolon;\":\"≕\",\"&eqsim;\":\"≂\",\"&eqslantgtr;\":\"⪖\",\"&eqslantless;\":\"⪕\",\"&equals;\":\"=\",\"&equest;\":\"≟\",\"&equiv;\":\"≡\",\"&equivDD;\":\"⩸\",\"&eqvparsl;\":\"⧥\",\"&erDot;\":\"≓\",\"&erarr;\":\"⥱\",\"&escr;\":\"ℯ\",\"&esdot;\":\"≐\",\"&esim;\":\"≂\",\"&eta;\":\"η\",\"&eth\":\"ð\",\"&eth;\":\"ð\",\"&euml\":\"ë\",\"&euml;\":\"ë\",\"&euro;\":\"€\",\"&excl;\":\"!\",\"&exist;\":\"∃\",\"&expectation;\":\"ℰ\",\"&exponentiale;\":\"ⅇ\",\"&fallingdotseq;\":\"≒\",\"&fcy;\":\"ф\",\"&female;\":\"♀\",\"&ffilig;\":\"ﬃ\",\"&fflig;\":\"ﬀ\",\"&ffllig;\":\"ﬄ\",\"&ffr;\":\"𝔣\",\"&filig;\":\"ﬁ\",\"&fjlig;\":\"fj\",\"&flat;\":\"♭\",\"&fllig;\":\"ﬂ\",\"&fltns;\":\"▱\",\"&fnof;\":\"ƒ\",\"&fopf;\":\"𝕗\",\"&forall;\":\"∀\",\"&fork;\":\"⋔\",\"&forkv;\":\"⫙\",\"&fpartint;\":\"⨍\",\"&frac12\":\"½\",\"&frac12;\":\"½\",\"&frac13;\":\"⅓\",\"&frac14\":\"¼\",\"&frac14;\":\"¼\",\"&frac15;\":\"⅕\",\"&frac16;\":\"⅙\",\"&frac18;\":\"⅛\",\"&frac23;\":\"⅔\",\"&frac25;\":\"⅖\",\"&frac34\":\"¾\",\"&frac34;\":\"¾\",\"&frac35;\":\"⅗\",\"&frac38;\":\"⅜\",\"&frac45;\":\"⅘\",\"&frac56;\":\"⅚\",\"&frac58;\":\"⅝\",\"&frac78;\":\"⅞\",\"&frasl;\":\"⁄\",\"&frown;\":\"⌢\",\"&fscr;\":\"𝒻\",\"&gE;\":\"≧\",\"&gEl;\":\"⪌\",\"&gacute;\":\"ǵ\",\"&gamma;\":\"γ\",\"&gammad;\":\"ϝ\",\"&gap;\":\"⪆\",\"&gbreve;\":\"ğ\",\"&gcirc;\":\"ĝ\",\"&gcy;\":\"г\",\"&gdot;\":\"ġ\",\"&ge;\":\"≥\",\"&gel;\":\"⋛\",\"&geq;\":\"≥\",\"&geqq;\":\"≧\",\"&geqslant;\":\"⩾\",\"&ges;\":\"⩾\",\"&gescc;\":\"⪩\",\"&gesdot;\":\"⪀\",\"&gesdoto;\":\"⪂\",\"&gesdotol;\":\"⪄\",\"&gesl;\":\"⋛︀\",\"&gesles;\":\"⪔\",\"&gfr;\":\"𝔤\",\"&gg;\":\"≫\",\"&ggg;\":\"⋙\",\"&gimel;\":\"ℷ\",\"&gjcy;\":\"ѓ\",\"&gl;\":\"≷\",\"&glE;\":\"⪒\",\"&gla;\":\"⪥\",\"&glj;\":\"⪤\",\"&gnE;\":\"≩\",\"&gnap;\":\"⪊\",\"&gnapprox;\":\"⪊\",\"&gne;\":\"⪈\",\"&gneq;\":\"⪈\",\"&gneqq;\":\"≩\",\"&gnsim;\":\"⋧\",\"&gopf;\":\"𝕘\",\"&grave;\":\"`\",\"&gscr;\":\"ℊ\",\"&gsim;\":\"≳\",\"&gsime;\":\"⪎\",\"&gsiml;\":\"⪐\",\"&gt\":\">\",\"&gt;\":\">\",\"&gtcc;\":\"⪧\",\"&gtcir;\":\"⩺\",\"&gtdot;\":\"⋗\",\"&gtlPar;\":\"⦕\",\"&gtquest;\":\"⩼\",\"&gtrapprox;\":\"⪆\",\"&gtrarr;\":\"⥸\",\"&gtrdot;\":\"⋗\",\"&gtreqless;\":\"⋛\",\"&gtreqqless;\":\"⪌\",\"&gtrless;\":\"≷\",\"&gtrsim;\":\"≳\",\"&gvertneqq;\":\"≩︀\",\"&gvnE;\":\"≩︀\",\"&hArr;\":\"⇔\",\"&hairsp;\":\" \",\"&half;\":\"½\",\"&hamilt;\":\"ℋ\",\"&hardcy;\":\"ъ\",\"&harr;\":\"↔\",\"&harrcir;\":\"⥈\",\"&harrw;\":\"↭\",\"&hbar;\":\"ℏ\",\"&hcirc;\":\"ĥ\",\"&hearts;\":\"♥\",\"&heartsuit;\":\"♥\",\"&hellip;\":\"…\",\"&hercon;\":\"⊹\",\"&hfr;\":\"𝔥\",\"&hksearow;\":\"⤥\",\"&hkswarow;\":\"⤦\",\"&hoarr;\":\"⇿\",\"&homtht;\":\"∻\",\"&hookleftarrow;\":\"↩\",\"&hookrightarrow;\":\"↪\",\"&hopf;\":\"𝕙\",\"&horbar;\":\"―\",\"&hscr;\":\"𝒽\",\"&hslash;\":\"ℏ\",\"&hstrok;\":\"ħ\",\"&hybull;\":\"⁃\",\"&hyphen;\":\"‐\",\"&iacute\":\"í\",\"&iacute;\":\"í\",\"&ic;\":\"⁣\",\"&icirc\":\"î\",\"&icirc;\":\"î\",\"&icy;\":\"и\",\"&iecy;\":\"е\",\"&iexcl\":\"¡\",\"&iexcl;\":\"¡\",\"&iff;\":\"⇔\",\"&ifr;\":\"𝔦\",\"&igrave\":\"ì\",\"&igrave;\":\"ì\",\"&ii;\":\"ⅈ\",\"&iiiint;\":\"⨌\",\"&iiint;\":\"∭\",\"&iinfin;\":\"⧜\",\"&iiota;\":\"℩\",\"&ijlig;\":\"ĳ\",\"&imacr;\":\"ī\",\"&image;\":\"ℑ\",\"&imagline;\":\"ℐ\",\"&imagpart;\":\"ℑ\",\"&imath;\":\"ı\",\"&imof;\":\"⊷\",\"&imped;\":\"Ƶ\",\"&in;\":\"∈\",\"&incare;\":\"℅\",\"&infin;\":\"∞\",\"&infintie;\":\"⧝\",\"&inodot;\":\"ı\",\"&int;\":\"∫\",\"&intcal;\":\"⊺\",\"&integers;\":\"ℤ\",\"&intercal;\":\"⊺\",\"&intlarhk;\":\"⨗\",\"&intprod;\":\"⨼\",\"&iocy;\":\"ё\",\"&iogon;\":\"į\",\"&iopf;\":\"𝕚\",\"&iota;\":\"ι\",\"&iprod;\":\"⨼\",\"&iquest\":\"¿\",\"&iquest;\":\"¿\",\"&iscr;\":\"𝒾\",\"&isin;\":\"∈\",\"&isinE;\":\"⋹\",\"&isindot;\":\"⋵\",\"&isins;\":\"⋴\",\"&isinsv;\":\"⋳\",\"&isinv;\":\"∈\",\"&it;\":\"⁢\",\"&itilde;\":\"ĩ\",\"&iukcy;\":\"і\",\"&iuml\":\"ï\",\"&iuml;\":\"ï\",\"&jcirc;\":\"ĵ\",\"&jcy;\":\"й\",\"&jfr;\":\"𝔧\",\"&jmath;\":\"ȷ\",\"&jopf;\":\"𝕛\",\"&jscr;\":\"𝒿\",\"&jsercy;\":\"ј\",\"&jukcy;\":\"є\",\"&kappa;\":\"κ\",\"&kappav;\":\"ϰ\",\"&kcedil;\":\"ķ\",\"&kcy;\":\"к\",\"&kfr;\":\"𝔨\",\"&kgreen;\":\"ĸ\",\"&khcy;\":\"х\",\"&kjcy;\":\"ќ\",\"&kopf;\":\"𝕜\",\"&kscr;\":\"𝓀\",\"&lAarr;\":\"⇚\",\"&lArr;\":\"⇐\",\"&lAtail;\":\"⤛\",\"&lBarr;\":\"⤎\",\"&lE;\":\"≦\",\"&lEg;\":\"⪋\",\"&lHar;\":\"⥢\",\"&lacute;\":\"ĺ\",\"&laemptyv;\":\"⦴\",\"&lagran;\":\"ℒ\",\"&lambda;\":\"λ\",\"&lang;\":\"⟨\",\"&langd;\":\"⦑\",\"&langle;\":\"⟨\",\"&lap;\":\"⪅\",\"&laquo\":\"«\",\"&laquo;\":\"«\",\"&larr;\":\"←\",\"&larrb;\":\"⇤\",\"&larrbfs;\":\"⤟\",\"&larrfs;\":\"⤝\",\"&larrhk;\":\"↩\",\"&larrlp;\":\"↫\",\"&larrpl;\":\"⤹\",\"&larrsim;\":\"⥳\",\"&larrtl;\":\"↢\",\"&lat;\":\"⪫\",\"&latail;\":\"⤙\",\"&late;\":\"⪭\",\"&lates;\":\"⪭︀\",\"&lbarr;\":\"⤌\",\"&lbbrk;\":\"❲\",\"&lbrace;\":\"{\",\"&lbrack;\":\"[\",\"&lbrke;\":\"⦋\",\"&lbrksld;\":\"⦏\",\"&lbrkslu;\":\"⦍\",\"&lcaron;\":\"ľ\",\"&lcedil;\":\"ļ\",\"&lceil;\":\"⌈\",\"&lcub;\":\"{\",\"&lcy;\":\"л\",\"&ldca;\":\"⤶\",\"&ldquo;\":\"“\",\"&ldquor;\":\"„\",\"&ldrdhar;\":\"⥧\",\"&ldrushar;\":\"⥋\",\"&ldsh;\":\"↲\",\"&le;\":\"≤\",\"&leftarrow;\":\"←\",\"&leftarrowtail;\":\"↢\",\"&leftharpoondown;\":\"↽\",\"&leftharpoonup;\":\"↼\",\"&leftleftarrows;\":\"⇇\",\"&leftrightarrow;\":\"↔\",\"&leftrightarrows;\":\"⇆\",\"&leftrightharpoons;\":\"⇋\",\"&leftrightsquigarrow;\":\"↭\",\"&leftthreetimes;\":\"⋋\",\"&leg;\":\"⋚\",\"&leq;\":\"≤\",\"&leqq;\":\"≦\",\"&leqslant;\":\"⩽\",\"&les;\":\"⩽\",\"&lescc;\":\"⪨\",\"&lesdot;\":\"⩿\",\"&lesdoto;\":\"⪁\",\"&lesdotor;\":\"⪃\",\"&lesg;\":\"⋚︀\",\"&lesges;\":\"⪓\",\"&lessapprox;\":\"⪅\",\"&lessdot;\":\"⋖\",\"&lesseqgtr;\":\"⋚\",\"&lesseqqgtr;\":\"⪋\",\"&lessgtr;\":\"≶\",\"&lesssim;\":\"≲\",\"&lfisht;\":\"⥼\",\"&lfloor;\":\"⌊\",\"&lfr;\":\"𝔩\",\"&lg;\":\"≶\",\"&lgE;\":\"⪑\",\"&lhard;\":\"↽\",\"&lharu;\":\"↼\",\"&lharul;\":\"⥪\",\"&lhblk;\":\"▄\",\"&ljcy;\":\"љ\",\"&ll;\":\"≪\",\"&llarr;\":\"⇇\",\"&llcorner;\":\"⌞\",\"&llhard;\":\"⥫\",\"&lltri;\":\"◺\",\"&lmidot;\":\"ŀ\",\"&lmoust;\":\"⎰\",\"&lmoustache;\":\"⎰\",\"&lnE;\":\"≨\",\"&lnap;\":\"⪉\",\"&lnapprox;\":\"⪉\",\"&lne;\":\"⪇\",\"&lneq;\":\"⪇\",\"&lneqq;\":\"≨\",\"&lnsim;\":\"⋦\",\"&loang;\":\"⟬\",\"&loarr;\":\"⇽\",\"&lobrk;\":\"⟦\",\"&longleftarrow;\":\"⟵\",\"&longleftrightarrow;\":\"⟷\",\"&longmapsto;\":\"⟼\",\"&longrightarrow;\":\"⟶\",\"&looparrowleft;\":\"↫\",\"&looparrowright;\":\"↬\",\"&lopar;\":\"⦅\",\"&lopf;\":\"𝕝\",\"&loplus;\":\"⨭\",\"&lotimes;\":\"⨴\",\"&lowast;\":\"∗\",\"&lowbar;\":\"_\",\"&loz;\":\"◊\",\"&lozenge;\":\"◊\",\"&lozf;\":\"⧫\",\"&lpar;\":\"(\",\"&lparlt;\":\"⦓\",\"&lrarr;\":\"⇆\",\"&lrcorner;\":\"⌟\",\"&lrhar;\":\"⇋\",\"&lrhard;\":\"⥭\",\"&lrm;\":\"‎\",\"&lrtri;\":\"⊿\",\"&lsaquo;\":\"‹\",\"&lscr;\":\"𝓁\",\"&lsh;\":\"↰\",\"&lsim;\":\"≲\",\"&lsime;\":\"⪍\",\"&lsimg;\":\"⪏\",\"&lsqb;\":\"[\",\"&lsquo;\":\"‘\",\"&lsquor;\":\"‚\",\"&lstrok;\":\"ł\",\"&lt\":\"<\",\"&lt;\":\"<\",\"&ltcc;\":\"⪦\",\"&ltcir;\":\"⩹\",\"&ltdot;\":\"⋖\",\"&lthree;\":\"⋋\",\"&ltimes;\":\"⋉\",\"&ltlarr;\":\"⥶\",\"&ltquest;\":\"⩻\",\"&ltrPar;\":\"⦖\",\"&ltri;\":\"◃\",\"&ltrie;\":\"⊴\",\"&ltrif;\":\"◂\",\"&lurdshar;\":\"⥊\",\"&luruhar;\":\"⥦\",\"&lvertneqq;\":\"≨︀\",\"&lvnE;\":\"≨︀\",\"&mDDot;\":\"∺\",\"&macr\":\"¯\",\"&macr;\":\"¯\",\"&male;\":\"♂\",\"&malt;\":\"✠\",\"&maltese;\":\"✠\",\"&map;\":\"↦\",\"&mapsto;\":\"↦\",\"&mapstodown;\":\"↧\",\"&mapstoleft;\":\"↤\",\"&mapstoup;\":\"↥\",\"&marker;\":\"▮\",\"&mcomma;\":\"⨩\",\"&mcy;\":\"м\",\"&mdash;\":\"—\",\"&measuredangle;\":\"∡\",\"&mfr;\":\"𝔪\",\"&mho;\":\"℧\",\"&micro\":\"µ\",\"&micro;\":\"µ\",\"&mid;\":\"∣\",\"&midast;\":\"*\",\"&midcir;\":\"⫰\",\"&middot\":\"·\",\"&middot;\":\"·\",\"&minus;\":\"−\",\"&minusb;\":\"⊟\",\"&minusd;\":\"∸\",\"&minusdu;\":\"⨪\",\"&mlcp;\":\"⫛\",\"&mldr;\":\"…\",\"&mnplus;\":\"∓\",\"&models;\":\"⊧\",\"&mopf;\":\"𝕞\",\"&mp;\":\"∓\",\"&mscr;\":\"𝓂\",\"&mstpos;\":\"∾\",\"&mu;\":\"μ\",\"&multimap;\":\"⊸\",\"&mumap;\":\"⊸\",\"&nGg;\":\"⋙̸\",\"&nGt;\":\"≫⃒\",\"&nGtv;\":\"≫̸\",\"&nLeftarrow;\":\"⇍\",\"&nLeftrightarrow;\":\"⇎\",\"&nLl;\":\"⋘̸\",\"&nLt;\":\"≪⃒\",\"&nLtv;\":\"≪̸\",\"&nRightarrow;\":\"⇏\",\"&nVDash;\":\"⊯\",\"&nVdash;\":\"⊮\",\"&nabla;\":\"∇\",\"&nacute;\":\"ń\",\"&nang;\":\"∠⃒\",\"&nap;\":\"≉\",\"&napE;\":\"⩰̸\",\"&napid;\":\"≋̸\",\"&napos;\":\"ŉ\",\"&napprox;\":\"≉\",\"&natur;\":\"♮\",\"&natural;\":\"♮\",\"&naturals;\":\"ℕ\",\"&nbsp\":\" \",\"&nbsp;\":\" \",\"&nbump;\":\"≎̸\",\"&nbumpe;\":\"≏̸\",\"&ncap;\":\"⩃\",\"&ncaron;\":\"ň\",\"&ncedil;\":\"ņ\",\"&ncong;\":\"≇\",\"&ncongdot;\":\"⩭̸\",\"&ncup;\":\"⩂\",\"&ncy;\":\"н\",\"&ndash;\":\"–\",\"&ne;\":\"≠\",\"&neArr;\":\"⇗\",\"&nearhk;\":\"⤤\",\"&nearr;\":\"↗\",\"&nearrow;\":\"↗\",\"&nedot;\":\"≐̸\",\"&nequiv;\":\"≢\",\"&nesear;\":\"⤨\",\"&nesim;\":\"≂̸\",\"&nexist;\":\"∄\",\"&nexists;\":\"∄\",\"&nfr;\":\"𝔫\",\"&ngE;\":\"≧̸\",\"&nge;\":\"≱\",\"&ngeq;\":\"≱\",\"&ngeqq;\":\"≧̸\",\"&ngeqslant;\":\"⩾̸\",\"&nges;\":\"⩾̸\",\"&ngsim;\":\"≵\",\"&ngt;\":\"≯\",\"&ngtr;\":\"≯\",\"&nhArr;\":\"⇎\",\"&nharr;\":\"↮\",\"&nhpar;\":\"⫲\",\"&ni;\":\"∋\",\"&nis;\":\"⋼\",\"&nisd;\":\"⋺\",\"&niv;\":\"∋\",\"&njcy;\":\"њ\",\"&nlArr;\":\"⇍\",\"&nlE;\":\"≦̸\",\"&nlarr;\":\"↚\",\"&nldr;\":\"‥\",\"&nle;\":\"≰\",\"&nleftarrow;\":\"↚\",\"&nleftrightarrow;\":\"↮\",\"&nleq;\":\"≰\",\"&nleqq;\":\"≦̸\",\"&nleqslant;\":\"⩽̸\",\"&nles;\":\"⩽̸\",\"&nless;\":\"≮\",\"&nlsim;\":\"≴\",\"&nlt;\":\"≮\",\"&nltri;\":\"⋪\",\"&nltrie;\":\"⋬\",\"&nmid;\":\"∤\",\"&nopf;\":\"𝕟\",\"&not\":\"¬\",\"&not;\":\"¬\",\"&notin;\":\"∉\",\"&notinE;\":\"⋹̸\",\"&notindot;\":\"⋵̸\",\"&notinva;\":\"∉\",\"&notinvb;\":\"⋷\",\"&notinvc;\":\"⋶\",\"&notni;\":\"∌\",\"&notniva;\":\"∌\",\"&notnivb;\":\"⋾\",\"&notnivc;\":\"⋽\",\"&npar;\":\"∦\",\"&nparallel;\":\"∦\",\"&nparsl;\":\"⫽⃥\",\"&npart;\":\"∂̸\",\"&npolint;\":\"⨔\",\"&npr;\":\"⊀\",\"&nprcue;\":\"⋠\",\"&npre;\":\"⪯̸\",\"&nprec;\":\"⊀\",\"&npreceq;\":\"⪯̸\",\"&nrArr;\":\"⇏\",\"&nrarr;\":\"↛\",\"&nrarrc;\":\"⤳̸\",\"&nrarrw;\":\"↝̸\",\"&nrightarrow;\":\"↛\",\"&nrtri;\":\"⋫\",\"&nrtrie;\":\"⋭\",\"&nsc;\":\"⊁\",\"&nsccue;\":\"⋡\",\"&nsce;\":\"⪰̸\",\"&nscr;\":\"𝓃\",\"&nshortmid;\":\"∤\",\"&nshortparallel;\":\"∦\",\"&nsim;\":\"≁\",\"&nsime;\":\"≄\",\"&nsimeq;\":\"≄\",\"&nsmid;\":\"∤\",\"&nspar;\":\"∦\",\"&nsqsube;\":\"⋢\",\"&nsqsupe;\":\"⋣\",\"&nsub;\":\"⊄\",\"&nsubE;\":\"⫅̸\",\"&nsube;\":\"⊈\",\"&nsubset;\":\"⊂⃒\",\"&nsubseteq;\":\"⊈\",\"&nsubseteqq;\":\"⫅̸\",\"&nsucc;\":\"⊁\",\"&nsucceq;\":\"⪰̸\",\"&nsup;\":\"⊅\",\"&nsupE;\":\"⫆̸\",\"&nsupe;\":\"⊉\",\"&nsupset;\":\"⊃⃒\",\"&nsupseteq;\":\"⊉\",\"&nsupseteqq;\":\"⫆̸\",\"&ntgl;\":\"≹\",\"&ntilde\":\"ñ\",\"&ntilde;\":\"ñ\",\"&ntlg;\":\"≸\",\"&ntriangleleft;\":\"⋪\",\"&ntrianglelefteq;\":\"⋬\",\"&ntriangleright;\":\"⋫\",\"&ntrianglerighteq;\":\"⋭\",\"&nu;\":\"ν\",\"&num;\":\"#\",\"&numero;\":\"№\",\"&numsp;\":\" \",\"&nvDash;\":\"⊭\",\"&nvHarr;\":\"⤄\",\"&nvap;\":\"≍⃒\",\"&nvdash;\":\"⊬\",\"&nvge;\":\"≥⃒\",\"&nvgt;\":\">⃒\",\"&nvinfin;\":\"⧞\",\"&nvlArr;\":\"⤂\",\"&nvle;\":\"≤⃒\",\"&nvlt;\":\"<⃒\",\"&nvltrie;\":\"⊴⃒\",\"&nvrArr;\":\"⤃\",\"&nvrtrie;\":\"⊵⃒\",\"&nvsim;\":\"∼⃒\",\"&nwArr;\":\"⇖\",\"&nwarhk;\":\"⤣\",\"&nwarr;\":\"↖\",\"&nwarrow;\":\"↖\",\"&nwnear;\":\"⤧\",\"&oS;\":\"Ⓢ\",\"&oacute\":\"ó\",\"&oacute;\":\"ó\",\"&oast;\":\"⊛\",\"&ocir;\":\"⊚\",\"&ocirc\":\"ô\",\"&ocirc;\":\"ô\",\"&ocy;\":\"о\",\"&odash;\":\"⊝\",\"&odblac;\":\"ő\",\"&odiv;\":\"⨸\",\"&odot;\":\"⊙\",\"&odsold;\":\"⦼\",\"&oelig;\":\"œ\",\"&ofcir;\":\"⦿\",\"&ofr;\":\"𝔬\",\"&ogon;\":\"˛\",\"&ograve\":\"ò\",\"&ograve;\":\"ò\",\"&ogt;\":\"⧁\",\"&ohbar;\":\"⦵\",\"&ohm;\":\"Ω\",\"&oint;\":\"∮\",\"&olarr;\":\"↺\",\"&olcir;\":\"⦾\",\"&olcross;\":\"⦻\",\"&oline;\":\"‾\",\"&olt;\":\"⧀\",\"&omacr;\":\"ō\",\"&omega;\":\"ω\",\"&omicron;\":\"ο\",\"&omid;\":\"⦶\",\"&ominus;\":\"⊖\",\"&oopf;\":\"𝕠\",\"&opar;\":\"⦷\",\"&operp;\":\"⦹\",\"&oplus;\":\"⊕\",\"&or;\":\"∨\",\"&orarr;\":\"↻\",\"&ord;\":\"⩝\",\"&order;\":\"ℴ\",\"&orderof;\":\"ℴ\",\"&ordf\":\"ª\",\"&ordf;\":\"ª\",\"&ordm\":\"º\",\"&ordm;\":\"º\",\"&origof;\":\"⊶\",\"&oror;\":\"⩖\",\"&orslope;\":\"⩗\",\"&orv;\":\"⩛\",\"&oscr;\":\"ℴ\",\"&oslash\":\"ø\",\"&oslash;\":\"ø\",\"&osol;\":\"⊘\",\"&otilde\":\"õ\",\"&otilde;\":\"õ\",\"&otimes;\":\"⊗\",\"&otimesas;\":\"⨶\",\"&ouml\":\"ö\",\"&ouml;\":\"ö\",\"&ovbar;\":\"⌽\",\"&par;\":\"∥\",\"&para\":\"¶\",\"&para;\":\"¶\",\"&parallel;\":\"∥\",\"&parsim;\":\"⫳\",\"&parsl;\":\"⫽\",\"&part;\":\"∂\",\"&pcy;\":\"п\",\"&percnt;\":\"%\",\"&period;\":\".\",\"&permil;\":\"‰\",\"&perp;\":\"⊥\",\"&pertenk;\":\"‱\",\"&pfr;\":\"𝔭\",\"&phi;\":\"φ\",\"&phiv;\":\"ϕ\",\"&phmmat;\":\"ℳ\",\"&phone;\":\"☎\",\"&pi;\":\"π\",\"&pitchfork;\":\"⋔\",\"&piv;\":\"ϖ\",\"&planck;\":\"ℏ\",\"&planckh;\":\"ℎ\",\"&plankv;\":\"ℏ\",\"&plus;\":\"+\",\"&plusacir;\":\"⨣\",\"&plusb;\":\"⊞\",\"&pluscir;\":\"⨢\",\"&plusdo;\":\"∔\",\"&plusdu;\":\"⨥\",\"&pluse;\":\"⩲\",\"&plusmn\":\"±\",\"&plusmn;\":\"±\",\"&plussim;\":\"⨦\",\"&plustwo;\":\"⨧\",\"&pm;\":\"±\",\"&pointint;\":\"⨕\",\"&popf;\":\"𝕡\",\"&pound\":\"£\",\"&pound;\":\"£\",\"&pr;\":\"≺\",\"&prE;\":\"⪳\",\"&prap;\":\"⪷\",\"&prcue;\":\"≼\",\"&pre;\":\"⪯\",\"&prec;\":\"≺\",\"&precapprox;\":\"⪷\",\"&preccurlyeq;\":\"≼\",\"&preceq;\":\"⪯\",\"&precnapprox;\":\"⪹\",\"&precneqq;\":\"⪵\",\"&precnsim;\":\"⋨\",\"&precsim;\":\"≾\",\"&prime;\":\"′\",\"&primes;\":\"ℙ\",\"&prnE;\":\"⪵\",\"&prnap;\":\"⪹\",\"&prnsim;\":\"⋨\",\"&prod;\":\"∏\",\"&profalar;\":\"⌮\",\"&profline;\":\"⌒\",\"&profsurf;\":\"⌓\",\"&prop;\":\"∝\",\"&propto;\":\"∝\",\"&prsim;\":\"≾\",\"&prurel;\":\"⊰\",\"&pscr;\":\"𝓅\",\"&psi;\":\"ψ\",\"&puncsp;\":\" \",\"&qfr;\":\"𝔮\",\"&qint;\":\"⨌\",\"&qopf;\":\"𝕢\",\"&qprime;\":\"⁗\",\"&qscr;\":\"𝓆\",\"&quaternions;\":\"ℍ\",\"&quatint;\":\"⨖\",\"&quest;\":\"?\",\"&questeq;\":\"≟\",\"&quot\":'\"',\"&quot;\":'\"',\"&rAarr;\":\"⇛\",\"&rArr;\":\"⇒\",\"&rAtail;\":\"⤜\",\"&rBarr;\":\"⤏\",\"&rHar;\":\"⥤\",\"&race;\":\"∽̱\",\"&racute;\":\"ŕ\",\"&radic;\":\"√\",\"&raemptyv;\":\"⦳\",\"&rang;\":\"⟩\",\"&rangd;\":\"⦒\",\"&range;\":\"⦥\",\"&rangle;\":\"⟩\",\"&raquo\":\"»\",\"&raquo;\":\"»\",\"&rarr;\":\"→\",\"&rarrap;\":\"⥵\",\"&rarrb;\":\"⇥\",\"&rarrbfs;\":\"⤠\",\"&rarrc;\":\"⤳\",\"&rarrfs;\":\"⤞\",\"&rarrhk;\":\"↪\",\"&rarrlp;\":\"↬\",\"&rarrpl;\":\"⥅\",\"&rarrsim;\":\"⥴\",\"&rarrtl;\":\"↣\",\"&rarrw;\":\"↝\",\"&ratail;\":\"⤚\",\"&ratio;\":\"∶\",\"&rationals;\":\"ℚ\",\"&rbarr;\":\"⤍\",\"&rbbrk;\":\"❳\",\"&rbrace;\":\"}\",\"&rbrack;\":\"]\",\"&rbrke;\":\"⦌\",\"&rbrksld;\":\"⦎\",\"&rbrkslu;\":\"⦐\",\"&rcaron;\":\"ř\",\"&rcedil;\":\"ŗ\",\"&rceil;\":\"⌉\",\"&rcub;\":\"}\",\"&rcy;\":\"р\",\"&rdca;\":\"⤷\",\"&rdldhar;\":\"⥩\",\"&rdquo;\":\"”\",\"&rdquor;\":\"”\",\"&rdsh;\":\"↳\",\"&real;\":\"ℜ\",\"&realine;\":\"ℛ\",\"&realpart;\":\"ℜ\",\"&reals;\":\"ℝ\",\"&rect;\":\"▭\",\"&reg\":\"®\",\"&reg;\":\"®\",\"&rfisht;\":\"⥽\",\"&rfloor;\":\"⌋\",\"&rfr;\":\"𝔯\",\"&rhard;\":\"⇁\",\"&rharu;\":\"⇀\",\"&rharul;\":\"⥬\",\"&rho;\":\"ρ\",\"&rhov;\":\"ϱ\",\"&rightarrow;\":\"→\",\"&rightarrowtail;\":\"↣\",\"&rightharpoondown;\":\"⇁\",\"&rightharpoonup;\":\"⇀\",\"&rightleftarrows;\":\"⇄\",\"&rightleftharpoons;\":\"⇌\",\"&rightrightarrows;\":\"⇉\",\"&rightsquigarrow;\":\"↝\",\"&rightthreetimes;\":\"⋌\",\"&ring;\":\"˚\",\"&risingdotseq;\":\"≓\",\"&rlarr;\":\"⇄\",\"&rlhar;\":\"⇌\",\"&rlm;\":\"‏\",\"&rmoust;\":\"⎱\",\"&rmoustache;\":\"⎱\",\"&rnmid;\":\"⫮\",\"&roang;\":\"⟭\",\"&roarr;\":\"⇾\",\"&robrk;\":\"⟧\",\"&ropar;\":\"⦆\",\"&ropf;\":\"𝕣\",\"&roplus;\":\"⨮\",\"&rotimes;\":\"⨵\",\"&rpar;\":\")\",\"&rpargt;\":\"⦔\",\"&rppolint;\":\"⨒\",\"&rrarr;\":\"⇉\",\"&rsaquo;\":\"›\",\"&rscr;\":\"𝓇\",\"&rsh;\":\"↱\",\"&rsqb;\":\"]\",\"&rsquo;\":\"’\",\"&rsquor;\":\"’\",\"&rthree;\":\"⋌\",\"&rtimes;\":\"⋊\",\"&rtri;\":\"▹\",\"&rtrie;\":\"⊵\",\"&rtrif;\":\"▸\",\"&rtriltri;\":\"⧎\",\"&ruluhar;\":\"⥨\",\"&rx;\":\"℞\",\"&sacute;\":\"ś\",\"&sbquo;\":\"‚\",\"&sc;\":\"≻\",\"&scE;\":\"⪴\",\"&scap;\":\"⪸\",\"&scaron;\":\"š\",\"&sccue;\":\"≽\",\"&sce;\":\"⪰\",\"&scedil;\":\"ş\",\"&scirc;\":\"ŝ\",\"&scnE;\":\"⪶\",\"&scnap;\":\"⪺\",\"&scnsim;\":\"⋩\",\"&scpolint;\":\"⨓\",\"&scsim;\":\"≿\",\"&scy;\":\"с\",\"&sdot;\":\"⋅\",\"&sdotb;\":\"⊡\",\"&sdote;\":\"⩦\",\"&seArr;\":\"⇘\",\"&searhk;\":\"⤥\",\"&searr;\":\"↘\",\"&searrow;\":\"↘\",\"&sect\":\"§\",\"&sect;\":\"§\",\"&semi;\":\";\",\"&seswar;\":\"⤩\",\"&setminus;\":\"∖\",\"&setmn;\":\"∖\",\"&sext;\":\"✶\",\"&sfr;\":\"𝔰\",\"&sfrown;\":\"⌢\",\"&sharp;\":\"♯\",\"&shchcy;\":\"щ\",\"&shcy;\":\"ш\",\"&shortmid;\":\"∣\",\"&shortparallel;\":\"∥\",\"&shy\":\"­\",\"&shy;\":\"­\",\"&sigma;\":\"σ\",\"&sigmaf;\":\"ς\",\"&sigmav;\":\"ς\",\"&sim;\":\"∼\",\"&simdot;\":\"⩪\",\"&sime;\":\"≃\",\"&simeq;\":\"≃\",\"&simg;\":\"⪞\",\"&simgE;\":\"⪠\",\"&siml;\":\"⪝\",\"&simlE;\":\"⪟\",\"&simne;\":\"≆\",\"&simplus;\":\"⨤\",\"&simrarr;\":\"⥲\",\"&slarr;\":\"←\",\"&smallsetminus;\":\"∖\",\"&smashp;\":\"⨳\",\"&smeparsl;\":\"⧤\",\"&smid;\":\"∣\",\"&smile;\":\"⌣\",\"&smt;\":\"⪪\",\"&smte;\":\"⪬\",\"&smtes;\":\"⪬︀\",\"&softcy;\":\"ь\",\"&sol;\":\"/\",\"&solb;\":\"⧄\",\"&solbar;\":\"⌿\",\"&sopf;\":\"𝕤\",\"&spades;\":\"♠\",\"&spadesuit;\":\"♠\",\"&spar;\":\"∥\",\"&sqcap;\":\"⊓\",\"&sqcaps;\":\"⊓︀\",\"&sqcup;\":\"⊔\",\"&sqcups;\":\"⊔︀\",\"&sqsub;\":\"⊏\",\"&sqsube;\":\"⊑\",\"&sqsubset;\":\"⊏\",\"&sqsubseteq;\":\"⊑\",\"&sqsup;\":\"⊐\",\"&sqsupe;\":\"⊒\",\"&sqsupset;\":\"⊐\",\"&sqsupseteq;\":\"⊒\",\"&squ;\":\"□\",\"&square;\":\"□\",\"&squarf;\":\"▪\",\"&squf;\":\"▪\",\"&srarr;\":\"→\",\"&sscr;\":\"𝓈\",\"&ssetmn;\":\"∖\",\"&ssmile;\":\"⌣\",\"&sstarf;\":\"⋆\",\"&star;\":\"☆\",\"&starf;\":\"★\",\"&straightepsilon;\":\"ϵ\",\"&straightphi;\":\"ϕ\",\"&strns;\":\"¯\",\"&sub;\":\"⊂\",\"&subE;\":\"⫅\",\"&subdot;\":\"⪽\",\"&sube;\":\"⊆\",\"&subedot;\":\"⫃\",\"&submult;\":\"⫁\",\"&subnE;\":\"⫋\",\"&subne;\":\"⊊\",\"&subplus;\":\"⪿\",\"&subrarr;\":\"⥹\",\"&subset;\":\"⊂\",\"&subseteq;\":\"⊆\",\"&subseteqq;\":\"⫅\",\"&subsetneq;\":\"⊊\",\"&subsetneqq;\":\"⫋\",\"&subsim;\":\"⫇\",\"&subsub;\":\"⫕\",\"&subsup;\":\"⫓\",\"&succ;\":\"≻\",\"&succapprox;\":\"⪸\",\"&succcurlyeq;\":\"≽\",\"&succeq;\":\"⪰\",\"&succnapprox;\":\"⪺\",\"&succneqq;\":\"⪶\",\"&succnsim;\":\"⋩\",\"&succsim;\":\"≿\",\"&sum;\":\"∑\",\"&sung;\":\"♪\",\"&sup1\":\"¹\",\"&sup1;\":\"¹\",\"&sup2\":\"²\",\"&sup2;\":\"²\",\"&sup3\":\"³\",\"&sup3;\":\"³\",\"&sup;\":\"⊃\",\"&supE;\":\"⫆\",\"&supdot;\":\"⪾\",\"&supdsub;\":\"⫘\",\"&supe;\":\"⊇\",\"&supedot;\":\"⫄\",\"&suphsol;\":\"⟉\",\"&suphsub;\":\"⫗\",\"&suplarr;\":\"⥻\",\"&supmult;\":\"⫂\",\"&supnE;\":\"⫌\",\"&supne;\":\"⊋\",\"&supplus;\":\"⫀\",\"&supset;\":\"⊃\",\"&supseteq;\":\"⊇\",\"&supseteqq;\":\"⫆\",\"&supsetneq;\":\"⊋\",\"&supsetneqq;\":\"⫌\",\"&supsim;\":\"⫈\",\"&supsub;\":\"⫔\",\"&supsup;\":\"⫖\",\"&swArr;\":\"⇙\",\"&swarhk;\":\"⤦\",\"&swarr;\":\"↙\",\"&swarrow;\":\"↙\",\"&swnwar;\":\"⤪\",\"&szlig\":\"ß\",\"&szlig;\":\"ß\",\"&target;\":\"⌖\",\"&tau;\":\"τ\",\"&tbrk;\":\"⎴\",\"&tcaron;\":\"ť\",\"&tcedil;\":\"ţ\",\"&tcy;\":\"т\",\"&tdot;\":\"⃛\",\"&telrec;\":\"⌕\",\"&tfr;\":\"𝔱\",\"&there4;\":\"∴\",\"&therefore;\":\"∴\",\"&theta;\":\"θ\",\"&thetasym;\":\"ϑ\",\"&thetav;\":\"ϑ\",\"&thickapprox;\":\"≈\",\"&thicksim;\":\"∼\",\"&thinsp;\":\" \",\"&thkap;\":\"≈\",\"&thksim;\":\"∼\",\"&thorn\":\"þ\",\"&thorn;\":\"þ\",\"&tilde;\":\"˜\",\"&times\":\"×\",\"&times;\":\"×\",\"&timesb;\":\"⊠\",\"&timesbar;\":\"⨱\",\"&timesd;\":\"⨰\",\"&tint;\":\"∭\",\"&toea;\":\"⤨\",\"&top;\":\"⊤\",\"&topbot;\":\"⌶\",\"&topcir;\":\"⫱\",\"&topf;\":\"𝕥\",\"&topfork;\":\"⫚\",\"&tosa;\":\"⤩\",\"&tprime;\":\"‴\",\"&trade;\":\"™\",\"&triangle;\":\"▵\",\"&triangledown;\":\"▿\",\"&triangleleft;\":\"◃\",\"&trianglelefteq;\":\"⊴\",\"&triangleq;\":\"≜\",\"&triangleright;\":\"▹\",\"&trianglerighteq;\":\"⊵\",\"&tridot;\":\"◬\",\"&trie;\":\"≜\",\"&triminus;\":\"⨺\",\"&triplus;\":\"⨹\",\"&trisb;\":\"⧍\",\"&tritime;\":\"⨻\",\"&trpezium;\":\"⏢\",\"&tscr;\":\"𝓉\",\"&tscy;\":\"ц\",\"&tshcy;\":\"ћ\",\"&tstrok;\":\"ŧ\",\"&twixt;\":\"≬\",\"&twoheadleftarrow;\":\"↞\",\"&twoheadrightarrow;\":\"↠\",\"&uArr;\":\"⇑\",\"&uHar;\":\"⥣\",\"&uacute\":\"ú\",\"&uacute;\":\"ú\",\"&uarr;\":\"↑\",\"&ubrcy;\":\"ў\",\"&ubreve;\":\"ŭ\",\"&ucirc\":\"û\",\"&ucirc;\":\"û\",\"&ucy;\":\"у\",\"&udarr;\":\"⇅\",\"&udblac;\":\"ű\",\"&udhar;\":\"⥮\",\"&ufisht;\":\"⥾\",\"&ufr;\":\"𝔲\",\"&ugrave\":\"ù\",\"&ugrave;\":\"ù\",\"&uharl;\":\"↿\",\"&uharr;\":\"↾\",\"&uhblk;\":\"▀\",\"&ulcorn;\":\"⌜\",\"&ulcorner;\":\"⌜\",\"&ulcrop;\":\"⌏\",\"&ultri;\":\"◸\",\"&umacr;\":\"ū\",\"&uml\":\"¨\",\"&uml;\":\"¨\",\"&uogon;\":\"ų\",\"&uopf;\":\"𝕦\",\"&uparrow;\":\"↑\",\"&updownarrow;\":\"↕\",\"&upharpoonleft;\":\"↿\",\"&upharpoonright;\":\"↾\",\"&uplus;\":\"⊎\",\"&upsi;\":\"υ\",\"&upsih;\":\"ϒ\",\"&upsilon;\":\"υ\",\"&upuparrows;\":\"⇈\",\"&urcorn;\":\"⌝\",\"&urcorner;\":\"⌝\",\"&urcrop;\":\"⌎\",\"&uring;\":\"ů\",\"&urtri;\":\"◹\",\"&uscr;\":\"𝓊\",\"&utdot;\":\"⋰\",\"&utilde;\":\"ũ\",\"&utri;\":\"▵\",\"&utrif;\":\"▴\",\"&uuarr;\":\"⇈\",\"&uuml\":\"ü\",\"&uuml;\":\"ü\",\"&uwangle;\":\"⦧\",\"&vArr;\":\"⇕\",\"&vBar;\":\"⫨\",\"&vBarv;\":\"⫩\",\"&vDash;\":\"⊨\",\"&vangrt;\":\"⦜\",\"&varepsilon;\":\"ϵ\",\"&varkappa;\":\"ϰ\",\"&varnothing;\":\"∅\",\"&varphi;\":\"ϕ\",\"&varpi;\":\"ϖ\",\"&varpropto;\":\"∝\",\"&varr;\":\"↕\",\"&varrho;\":\"ϱ\",\"&varsigma;\":\"ς\",\"&varsubsetneq;\":\"⊊︀\",\"&varsubsetneqq;\":\"⫋︀\",\"&varsupsetneq;\":\"⊋︀\",\"&varsupsetneqq;\":\"⫌︀\",\"&vartheta;\":\"ϑ\",\"&vartriangleleft;\":\"⊲\",\"&vartriangleright;\":\"⊳\",\"&vcy;\":\"в\",\"&vdash;\":\"⊢\",\"&vee;\":\"∨\",\"&veebar;\":\"⊻\",\"&veeeq;\":\"≚\",\"&vellip;\":\"⋮\",\"&verbar;\":\"|\",\"&vert;\":\"|\",\"&vfr;\":\"𝔳\",\"&vltri;\":\"⊲\",\"&vnsub;\":\"⊂⃒\",\"&vnsup;\":\"⊃⃒\",\"&vopf;\":\"𝕧\",\"&vprop;\":\"∝\",\"&vrtri;\":\"⊳\",\"&vscr;\":\"𝓋\",\"&vsubnE;\":\"⫋︀\",\"&vsubne;\":\"⊊︀\",\"&vsupnE;\":\"⫌︀\",\"&vsupne;\":\"⊋︀\",\"&vzigzag;\":\"⦚\",\"&wcirc;\":\"ŵ\",\"&wedbar;\":\"⩟\",\"&wedge;\":\"∧\",\"&wedgeq;\":\"≙\",\"&weierp;\":\"℘\",\"&wfr;\":\"𝔴\",\"&wopf;\":\"𝕨\",\"&wp;\":\"℘\",\"&wr;\":\"≀\",\"&wreath;\":\"≀\",\"&wscr;\":\"𝓌\",\"&xcap;\":\"⋂\",\"&xcirc;\":\"◯\",\"&xcup;\":\"⋃\",\"&xdtri;\":\"▽\",\"&xfr;\":\"𝔵\",\"&xhArr;\":\"⟺\",\"&xharr;\":\"⟷\",\"&xi;\":\"ξ\",\"&xlArr;\":\"⟸\",\"&xlarr;\":\"⟵\",\"&xmap;\":\"⟼\",\"&xnis;\":\"⋻\",\"&xodot;\":\"⨀\",\"&xopf;\":\"𝕩\",\"&xoplus;\":\"⨁\",\"&xotime;\":\"⨂\",\"&xrArr;\":\"⟹\",\"&xrarr;\":\"⟶\",\"&xscr;\":\"𝓍\",\"&xsqcup;\":\"⨆\",\"&xuplus;\":\"⨄\",\"&xutri;\":\"△\",\"&xvee;\":\"⋁\",\"&xwedge;\":\"⋀\",\"&yacute\":\"ý\",\"&yacute;\":\"ý\",\"&yacy;\":\"я\",\"&ycirc;\":\"ŷ\",\"&ycy;\":\"ы\",\"&yen\":\"¥\",\"&yen;\":\"¥\",\"&yfr;\":\"𝔶\",\"&yicy;\":\"ї\",\"&yopf;\":\"𝕪\",\"&yscr;\":\"𝓎\",\"&yucy;\":\"ю\",\"&yuml\":\"ÿ\",\"&yuml;\":\"ÿ\",\"&zacute;\":\"ź\",\"&zcaron;\":\"ž\",\"&zcy;\":\"з\",\"&zdot;\":\"ż\",\"&zeetrf;\":\"ℨ\",\"&zeta;\":\"ζ\",\"&zfr;\":\"𝔷\",\"&zhcy;\":\"ж\",\"&zigrarr;\":\"⇝\",\"&zopf;\":\"𝕫\",\"&zscr;\":\"𝓏\",\"&zwj;\":\"‍\",\"&zwnj;\":\"‌\"},characters:{\"Æ\":\"&AElig;\",\"&\":\"&amp;\",\"Á\":\"&Aacute;\",\"Ă\":\"&Abreve;\",\"Â\":\"&Acirc;\",\"А\":\"&Acy;\",\"𝔄\":\"&Afr;\",\"À\":\"&Agrave;\",\"Α\":\"&Alpha;\",\"Ā\":\"&Amacr;\",\"⩓\":\"&And;\",\"Ą\":\"&Aogon;\",\"𝔸\":\"&Aopf;\",\"⁡\":\"&af;\",\"Å\":\"&angst;\",\"𝒜\":\"&Ascr;\",\"≔\":\"&coloneq;\",\"Ã\":\"&Atilde;\",\"Ä\":\"&Auml;\",\"∖\":\"&ssetmn;\",\"⫧\":\"&Barv;\",\"⌆\":\"&doublebarwedge;\",\"Б\":\"&Bcy;\",\"∵\":\"&because;\",\"ℬ\":\"&bernou;\",\"Β\":\"&Beta;\",\"𝔅\":\"&Bfr;\",\"𝔹\":\"&Bopf;\",\"˘\":\"&breve;\",\"≎\":\"&bump;\",\"Ч\":\"&CHcy;\",\"©\":\"&copy;\",\"Ć\":\"&Cacute;\",\"⋒\":\"&Cap;\",\"ⅅ\":\"&DD;\",\"ℭ\":\"&Cfr;\",\"Č\":\"&Ccaron;\",\"Ç\":\"&Ccedil;\",\"Ĉ\":\"&Ccirc;\",\"∰\":\"&Cconint;\",\"Ċ\":\"&Cdot;\",\"¸\":\"&cedil;\",\"·\":\"&middot;\",\"Χ\":\"&Chi;\",\"⊙\":\"&odot;\",\"⊖\":\"&ominus;\",\"⊕\":\"&oplus;\",\"⊗\":\"&otimes;\",\"∲\":\"&cwconint;\",\"”\":\"&rdquor;\",\"’\":\"&rsquor;\",\"∷\":\"&Proportion;\",\"⩴\":\"&Colone;\",\"≡\":\"&equiv;\",\"∯\":\"&DoubleContourIntegral;\",\"∮\":\"&oint;\",\"ℂ\":\"&complexes;\",\"∐\":\"&coprod;\",\"∳\":\"&awconint;\",\"⨯\":\"&Cross;\",\"𝒞\":\"&Cscr;\",\"⋓\":\"&Cup;\",\"≍\":\"&asympeq;\",\"⤑\":\"&DDotrahd;\",\"Ђ\":\"&DJcy;\",\"Ѕ\":\"&DScy;\",\"Џ\":\"&DZcy;\",\"‡\":\"&ddagger;\",\"↡\":\"&Darr;\",\"⫤\":\"&DoubleLeftTee;\",\"Ď\":\"&Dcaron;\",\"Д\":\"&Dcy;\",\"∇\":\"&nabla;\",\"Δ\":\"&Delta;\",\"𝔇\":\"&Dfr;\",\"´\":\"&acute;\",\"˙\":\"&dot;\",\"˝\":\"&dblac;\",\"`\":\"&grave;\",\"˜\":\"&tilde;\",\"⋄\":\"&diamond;\",\"ⅆ\":\"&dd;\",\"𝔻\":\"&Dopf;\",\"¨\":\"&uml;\",\"⃜\":\"&DotDot;\",\"≐\":\"&esdot;\",\"⇓\":\"&dArr;\",\"⇐\":\"&lArr;\",\"⇔\":\"&iff;\",\"⟸\":\"&xlArr;\",\"⟺\":\"&xhArr;\",\"⟹\":\"&xrArr;\",\"⇒\":\"&rArr;\",\"⊨\":\"&vDash;\",\"⇑\":\"&uArr;\",\"⇕\":\"&vArr;\",\"∥\":\"&spar;\",\"↓\":\"&downarrow;\",\"⤓\":\"&DownArrowBar;\",\"⇵\":\"&duarr;\",\"̑\":\"&DownBreve;\",\"⥐\":\"&DownLeftRightVector;\",\"⥞\":\"&DownLeftTeeVector;\",\"↽\":\"&lhard;\",\"⥖\":\"&DownLeftVectorBar;\",\"⥟\":\"&DownRightTeeVector;\",\"⇁\":\"&rightharpoondown;\",\"⥗\":\"&DownRightVectorBar;\",\"⊤\":\"&top;\",\"↧\":\"&mapstodown;\",\"𝒟\":\"&Dscr;\",\"Đ\":\"&Dstrok;\",\"Ŋ\":\"&ENG;\",\"Ð\":\"&ETH;\",\"É\":\"&Eacute;\",\"Ě\":\"&Ecaron;\",\"Ê\":\"&Ecirc;\",\"Э\":\"&Ecy;\",\"Ė\":\"&Edot;\",\"𝔈\":\"&Efr;\",\"È\":\"&Egrave;\",\"∈\":\"&isinv;\",\"Ē\":\"&Emacr;\",\"◻\":\"&EmptySmallSquare;\",\"▫\":\"&EmptyVerySmallSquare;\",\"Ę\":\"&Eogon;\",\"𝔼\":\"&Eopf;\",\"Ε\":\"&Epsilon;\",\"⩵\":\"&Equal;\",\"≂\":\"&esim;\",\"⇌\":\"&rlhar;\",\"ℰ\":\"&expectation;\",\"⩳\":\"&Esim;\",\"Η\":\"&Eta;\",\"Ë\":\"&Euml;\",\"∃\":\"&exist;\",\"ⅇ\":\"&exponentiale;\",\"Ф\":\"&Fcy;\",\"𝔉\":\"&Ffr;\",\"◼\":\"&FilledSmallSquare;\",\"▪\":\"&squf;\",\"𝔽\":\"&Fopf;\",\"∀\":\"&forall;\",\"ℱ\":\"&Fscr;\",\"Ѓ\":\"&GJcy;\",\">\":\"&gt;\",\"Γ\":\"&Gamma;\",\"Ϝ\":\"&Gammad;\",\"Ğ\":\"&Gbreve;\",\"Ģ\":\"&Gcedil;\",\"Ĝ\":\"&Gcirc;\",\"Г\":\"&Gcy;\",\"Ġ\":\"&Gdot;\",\"𝔊\":\"&Gfr;\",\"⋙\":\"&ggg;\",\"𝔾\":\"&Gopf;\",\"≥\":\"&geq;\",\"⋛\":\"&gtreqless;\",\"≧\":\"&geqq;\",\"⪢\":\"&GreaterGreater;\",\"≷\":\"&gtrless;\",\"⩾\":\"&ges;\",\"≳\":\"&gtrsim;\",\"𝒢\":\"&Gscr;\",\"≫\":\"&gg;\",\"Ъ\":\"&HARDcy;\",\"ˇ\":\"&caron;\",\"^\":\"&Hat;\",\"Ĥ\":\"&Hcirc;\",\"ℌ\":\"&Poincareplane;\",\"ℋ\":\"&hamilt;\",\"ℍ\":\"&quaternions;\",\"─\":\"&boxh;\",\"Ħ\":\"&Hstrok;\",\"≏\":\"&bumpeq;\",\"Е\":\"&IEcy;\",\"Ĳ\":\"&IJlig;\",\"Ё\":\"&IOcy;\",\"Í\":\"&Iacute;\",\"Î\":\"&Icirc;\",\"И\":\"&Icy;\",\"İ\":\"&Idot;\",\"ℑ\":\"&imagpart;\",\"Ì\":\"&Igrave;\",\"Ī\":\"&Imacr;\",\"ⅈ\":\"&ii;\",\"∬\":\"&Int;\",\"∫\":\"&int;\",\"⋂\":\"&xcap;\",\"⁣\":\"&ic;\",\"⁢\":\"&it;\",\"Į\":\"&Iogon;\",\"𝕀\":\"&Iopf;\",\"Ι\":\"&Iota;\",\"ℐ\":\"&imagline;\",\"Ĩ\":\"&Itilde;\",\"І\":\"&Iukcy;\",\"Ï\":\"&Iuml;\",\"Ĵ\":\"&Jcirc;\",\"Й\":\"&Jcy;\",\"𝔍\":\"&Jfr;\",\"𝕁\":\"&Jopf;\",\"𝒥\":\"&Jscr;\",\"Ј\":\"&Jsercy;\",\"Є\":\"&Jukcy;\",\"Х\":\"&KHcy;\",\"Ќ\":\"&KJcy;\",\"Κ\":\"&Kappa;\",\"Ķ\":\"&Kcedil;\",\"К\":\"&Kcy;\",\"𝔎\":\"&Kfr;\",\"𝕂\":\"&Kopf;\",\"𝒦\":\"&Kscr;\",\"Љ\":\"&LJcy;\",\"<\":\"&lt;\",\"Ĺ\":\"&Lacute;\",\"Λ\":\"&Lambda;\",\"⟪\":\"&Lang;\",\"ℒ\":\"&lagran;\",\"↞\":\"&twoheadleftarrow;\",\"Ľ\":\"&Lcaron;\",\"Ļ\":\"&Lcedil;\",\"Л\":\"&Lcy;\",\"⟨\":\"&langle;\",\"←\":\"&slarr;\",\"⇤\":\"&larrb;\",\"⇆\":\"&lrarr;\",\"⌈\":\"&lceil;\",\"⟦\":\"&lobrk;\",\"⥡\":\"&LeftDownTeeVector;\",\"⇃\":\"&downharpoonleft;\",\"⥙\":\"&LeftDownVectorBar;\",\"⌊\":\"&lfloor;\",\"↔\":\"&leftrightarrow;\",\"⥎\":\"&LeftRightVector;\",\"⊣\":\"&dashv;\",\"↤\":\"&mapstoleft;\",\"⥚\":\"&LeftTeeVector;\",\"⊲\":\"&vltri;\",\"⧏\":\"&LeftTriangleBar;\",\"⊴\":\"&trianglelefteq;\",\"⥑\":\"&LeftUpDownVector;\",\"⥠\":\"&LeftUpTeeVector;\",\"↿\":\"&upharpoonleft;\",\"⥘\":\"&LeftUpVectorBar;\",\"↼\":\"&lharu;\",\"⥒\":\"&LeftVectorBar;\",\"⋚\":\"&lesseqgtr;\",\"≦\":\"&leqq;\",\"≶\":\"&lg;\",\"⪡\":\"&LessLess;\",\"⩽\":\"&les;\",\"≲\":\"&lsim;\",\"𝔏\":\"&Lfr;\",\"⋘\":\"&Ll;\",\"⇚\":\"&lAarr;\",\"Ŀ\":\"&Lmidot;\",\"⟵\":\"&xlarr;\",\"⟷\":\"&xharr;\",\"⟶\":\"&xrarr;\",\"𝕃\":\"&Lopf;\",\"↙\":\"&swarrow;\",\"↘\":\"&searrow;\",\"↰\":\"&lsh;\",\"Ł\":\"&Lstrok;\",\"≪\":\"&ll;\",\"⤅\":\"&Map;\",\"М\":\"&Mcy;\",\" \":\"&MediumSpace;\",\"ℳ\":\"&phmmat;\",\"𝔐\":\"&Mfr;\",\"∓\":\"&mp;\",\"𝕄\":\"&Mopf;\",\"Μ\":\"&Mu;\",\"Њ\":\"&NJcy;\",\"Ń\":\"&Nacute;\",\"Ň\":\"&Ncaron;\",\"Ņ\":\"&Ncedil;\",\"Н\":\"&Ncy;\",\"​\":\"&ZeroWidthSpace;\",\"\\n\":\"&NewLine;\",\"𝔑\":\"&Nfr;\",\"⁠\":\"&NoBreak;\",\" \":\"&nbsp;\",\"ℕ\":\"&naturals;\",\"⫬\":\"&Not;\",\"≢\":\"&nequiv;\",\"≭\":\"&NotCupCap;\",\"∦\":\"&nspar;\",\"∉\":\"&notinva;\",\"≠\":\"&ne;\",\"≂̸\":\"&nesim;\",\"∄\":\"&nexists;\",\"≯\":\"&ngtr;\",\"≱\":\"&ngeq;\",\"≧̸\":\"&ngeqq;\",\"≫̸\":\"&nGtv;\",\"≹\":\"&ntgl;\",\"⩾̸\":\"&nges;\",\"≵\":\"&ngsim;\",\"≎̸\":\"&nbump;\",\"≏̸\":\"&nbumpe;\",\"⋪\":\"&ntriangleleft;\",\"⧏̸\":\"&NotLeftTriangleBar;\",\"⋬\":\"&ntrianglelefteq;\",\"≮\":\"&nlt;\",\"≰\":\"&nleq;\",\"≸\":\"&ntlg;\",\"≪̸\":\"&nLtv;\",\"⩽̸\":\"&nles;\",\"≴\":\"&nlsim;\",\"⪢̸\":\"&NotNestedGreaterGreater;\",\"⪡̸\":\"&NotNestedLessLess;\",\"⊀\":\"&nprec;\",\"⪯̸\":\"&npreceq;\",\"⋠\":\"&nprcue;\",\"∌\":\"&notniva;\",\"⋫\":\"&ntriangleright;\",\"⧐̸\":\"&NotRightTriangleBar;\",\"⋭\":\"&ntrianglerighteq;\",\"⊏̸\":\"&NotSquareSubset;\",\"⋢\":\"&nsqsube;\",\"⊐̸\":\"&NotSquareSuperset;\",\"⋣\":\"&nsqsupe;\",\"⊂⃒\":\"&vnsub;\",\"⊈\":\"&nsubseteq;\",\"⊁\":\"&nsucc;\",\"⪰̸\":\"&nsucceq;\",\"⋡\":\"&nsccue;\",\"≿̸\":\"&NotSucceedsTilde;\",\"⊃⃒\":\"&vnsup;\",\"⊉\":\"&nsupseteq;\",\"≁\":\"&nsim;\",\"≄\":\"&nsimeq;\",\"≇\":\"&ncong;\",\"≉\":\"&napprox;\",\"∤\":\"&nsmid;\",\"𝒩\":\"&Nscr;\",\"Ñ\":\"&Ntilde;\",\"Ν\":\"&Nu;\",\"Œ\":\"&OElig;\",\"Ó\":\"&Oacute;\",\"Ô\":\"&Ocirc;\",\"О\":\"&Ocy;\",\"Ő\":\"&Odblac;\",\"𝔒\":\"&Ofr;\",\"Ò\":\"&Ograve;\",\"Ō\":\"&Omacr;\",\"Ω\":\"&ohm;\",\"Ο\":\"&Omicron;\",\"𝕆\":\"&Oopf;\",\"“\":\"&ldquo;\",\"‘\":\"&lsquo;\",\"⩔\":\"&Or;\",\"𝒪\":\"&Oscr;\",\"Ø\":\"&Oslash;\",\"Õ\":\"&Otilde;\",\"⨷\":\"&Otimes;\",\"Ö\":\"&Ouml;\",\"‾\":\"&oline;\",\"⏞\":\"&OverBrace;\",\"⎴\":\"&tbrk;\",\"⏜\":\"&OverParenthesis;\",\"∂\":\"&part;\",\"П\":\"&Pcy;\",\"𝔓\":\"&Pfr;\",\"Φ\":\"&Phi;\",\"Π\":\"&Pi;\",\"±\":\"&pm;\",\"ℙ\":\"&primes;\",\"⪻\":\"&Pr;\",\"≺\":\"&prec;\",\"⪯\":\"&preceq;\",\"≼\":\"&preccurlyeq;\",\"≾\":\"&prsim;\",\"″\":\"&Prime;\",\"∏\":\"&prod;\",\"∝\":\"&vprop;\",\"𝒫\":\"&Pscr;\",\"Ψ\":\"&Psi;\",'\"':\"&quot;\",\"𝔔\":\"&Qfr;\",\"ℚ\":\"&rationals;\",\"𝒬\":\"&Qscr;\",\"⤐\":\"&drbkarow;\",\"®\":\"&reg;\",\"Ŕ\":\"&Racute;\",\"⟫\":\"&Rang;\",\"↠\":\"&twoheadrightarrow;\",\"⤖\":\"&Rarrtl;\",\"Ř\":\"&Rcaron;\",\"Ŗ\":\"&Rcedil;\",\"Р\":\"&Rcy;\",\"ℜ\":\"&realpart;\",\"∋\":\"&niv;\",\"⇋\":\"&lrhar;\",\"⥯\":\"&duhar;\",\"Ρ\":\"&Rho;\",\"⟩\":\"&rangle;\",\"→\":\"&srarr;\",\"⇥\":\"&rarrb;\",\"⇄\":\"&rlarr;\",\"⌉\":\"&rceil;\",\"⟧\":\"&robrk;\",\"⥝\":\"&RightDownTeeVector;\",\"⇂\":\"&downharpoonright;\",\"⥕\":\"&RightDownVectorBar;\",\"⌋\":\"&rfloor;\",\"⊢\":\"&vdash;\",\"↦\":\"&mapsto;\",\"⥛\":\"&RightTeeVector;\",\"⊳\":\"&vrtri;\",\"⧐\":\"&RightTriangleBar;\",\"⊵\":\"&trianglerighteq;\",\"⥏\":\"&RightUpDownVector;\",\"⥜\":\"&RightUpTeeVector;\",\"↾\":\"&upharpoonright;\",\"⥔\":\"&RightUpVectorBar;\",\"⇀\":\"&rightharpoonup;\",\"⥓\":\"&RightVectorBar;\",\"ℝ\":\"&reals;\",\"⥰\":\"&RoundImplies;\",\"⇛\":\"&rAarr;\",\"ℛ\":\"&realine;\",\"↱\":\"&rsh;\",\"⧴\":\"&RuleDelayed;\",\"Щ\":\"&SHCHcy;\",\"Ш\":\"&SHcy;\",\"Ь\":\"&SOFTcy;\",\"Ś\":\"&Sacute;\",\"⪼\":\"&Sc;\",\"Š\":\"&Scaron;\",\"Ş\":\"&Scedil;\",\"Ŝ\":\"&Scirc;\",\"С\":\"&Scy;\",\"𝔖\":\"&Sfr;\",\"↑\":\"&uparrow;\",\"Σ\":\"&Sigma;\",\"∘\":\"&compfn;\",\"𝕊\":\"&Sopf;\",\"√\":\"&radic;\",\"□\":\"&square;\",\"⊓\":\"&sqcap;\",\"⊏\":\"&sqsubset;\",\"⊑\":\"&sqsubseteq;\",\"⊐\":\"&sqsupset;\",\"⊒\":\"&sqsupseteq;\",\"⊔\":\"&sqcup;\",\"𝒮\":\"&Sscr;\",\"⋆\":\"&sstarf;\",\"⋐\":\"&Subset;\",\"⊆\":\"&subseteq;\",\"≻\":\"&succ;\",\"⪰\":\"&succeq;\",\"≽\":\"&succcurlyeq;\",\"≿\":\"&succsim;\",\"∑\":\"&sum;\",\"⋑\":\"&Supset;\",\"⊃\":\"&supset;\",\"⊇\":\"&supseteq;\",\"Þ\":\"&THORN;\",\"™\":\"&trade;\",\"Ћ\":\"&TSHcy;\",\"Ц\":\"&TScy;\",\"\\t\":\"&Tab;\",\"Τ\":\"&Tau;\",\"Ť\":\"&Tcaron;\",\"Ţ\":\"&Tcedil;\",\"Т\":\"&Tcy;\",\"𝔗\":\"&Tfr;\",\"∴\":\"&therefore;\",\"Θ\":\"&Theta;\",\"  \":\"&ThickSpace;\",\" \":\"&thinsp;\",\"∼\":\"&thksim;\",\"≃\":\"&simeq;\",\"≅\":\"&cong;\",\"≈\":\"&thkap;\",\"𝕋\":\"&Topf;\",\"⃛\":\"&tdot;\",\"𝒯\":\"&Tscr;\",\"Ŧ\":\"&Tstrok;\",\"Ú\":\"&Uacute;\",\"↟\":\"&Uarr;\",\"⥉\":\"&Uarrocir;\",\"Ў\":\"&Ubrcy;\",\"Ŭ\":\"&Ubreve;\",\"Û\":\"&Ucirc;\",\"У\":\"&Ucy;\",\"Ű\":\"&Udblac;\",\"𝔘\":\"&Ufr;\",\"Ù\":\"&Ugrave;\",\"Ū\":\"&Umacr;\",_:\"&lowbar;\",\"⏟\":\"&UnderBrace;\",\"⎵\":\"&bbrk;\",\"⏝\":\"&UnderParenthesis;\",\"⋃\":\"&xcup;\",\"⊎\":\"&uplus;\",\"Ų\":\"&Uogon;\",\"𝕌\":\"&Uopf;\",\"⤒\":\"&UpArrowBar;\",\"⇅\":\"&udarr;\",\"↕\":\"&varr;\",\"⥮\":\"&udhar;\",\"⊥\":\"&perp;\",\"↥\":\"&mapstoup;\",\"↖\":\"&nwarrow;\",\"↗\":\"&nearrow;\",\"ϒ\":\"&upsih;\",\"Υ\":\"&Upsilon;\",\"Ů\":\"&Uring;\",\"𝒰\":\"&Uscr;\",\"Ũ\":\"&Utilde;\",\"Ü\":\"&Uuml;\",\"⊫\":\"&VDash;\",\"⫫\":\"&Vbar;\",\"В\":\"&Vcy;\",\"⊩\":\"&Vdash;\",\"⫦\":\"&Vdashl;\",\"⋁\":\"&xvee;\",\"‖\":\"&Vert;\",\"∣\":\"&smid;\",\"|\":\"&vert;\",\"❘\":\"&VerticalSeparator;\",\"≀\":\"&wreath;\",\" \":\"&hairsp;\",\"𝔙\":\"&Vfr;\",\"𝕍\":\"&Vopf;\",\"𝒱\":\"&Vscr;\",\"⊪\":\"&Vvdash;\",\"Ŵ\":\"&Wcirc;\",\"⋀\":\"&xwedge;\",\"𝔚\":\"&Wfr;\",\"𝕎\":\"&Wopf;\",\"𝒲\":\"&Wscr;\",\"𝔛\":\"&Xfr;\",\"Ξ\":\"&Xi;\",\"𝕏\":\"&Xopf;\",\"𝒳\":\"&Xscr;\",\"Я\":\"&YAcy;\",\"Ї\":\"&YIcy;\",\"Ю\":\"&YUcy;\",\"Ý\":\"&Yacute;\",\"Ŷ\":\"&Ycirc;\",\"Ы\":\"&Ycy;\",\"𝔜\":\"&Yfr;\",\"𝕐\":\"&Yopf;\",\"𝒴\":\"&Yscr;\",\"Ÿ\":\"&Yuml;\",\"Ж\":\"&ZHcy;\",\"Ź\":\"&Zacute;\",\"Ž\":\"&Zcaron;\",\"З\":\"&Zcy;\",\"Ż\":\"&Zdot;\",\"Ζ\":\"&Zeta;\",\"ℨ\":\"&zeetrf;\",\"ℤ\":\"&integers;\",\"𝒵\":\"&Zscr;\",\"á\":\"&aacute;\",\"ă\":\"&abreve;\",\"∾\":\"&mstpos;\",\"∾̳\":\"&acE;\",\"∿\":\"&acd;\",\"â\":\"&acirc;\",\"а\":\"&acy;\",\"æ\":\"&aelig;\",\"𝔞\":\"&afr;\",\"à\":\"&agrave;\",\"ℵ\":\"&aleph;\",\"α\":\"&alpha;\",\"ā\":\"&amacr;\",\"⨿\":\"&amalg;\",\"∧\":\"&wedge;\",\"⩕\":\"&andand;\",\"⩜\":\"&andd;\",\"⩘\":\"&andslope;\",\"⩚\":\"&andv;\",\"∠\":\"&angle;\",\"⦤\":\"&ange;\",\"∡\":\"&measuredangle;\",\"⦨\":\"&angmsdaa;\",\"⦩\":\"&angmsdab;\",\"⦪\":\"&angmsdac;\",\"⦫\":\"&angmsdad;\",\"⦬\":\"&angmsdae;\",\"⦭\":\"&angmsdaf;\",\"⦮\":\"&angmsdag;\",\"⦯\":\"&angmsdah;\",\"∟\":\"&angrt;\",\"⊾\":\"&angrtvb;\",\"⦝\":\"&angrtvbd;\",\"∢\":\"&angsph;\",\"⍼\":\"&angzarr;\",\"ą\":\"&aogon;\",\"𝕒\":\"&aopf;\",\"⩰\":\"&apE;\",\"⩯\":\"&apacir;\",\"≊\":\"&approxeq;\",\"≋\":\"&apid;\",\"'\":\"&apos;\",\"å\":\"&aring;\",\"𝒶\":\"&ascr;\",\"*\":\"&midast;\",\"ã\":\"&atilde;\",\"ä\":\"&auml;\",\"⨑\":\"&awint;\",\"⫭\":\"&bNot;\",\"≌\":\"&bcong;\",\"϶\":\"&bepsi;\",\"‵\":\"&bprime;\",\"∽\":\"&bsim;\",\"⋍\":\"&bsime;\",\"⊽\":\"&barvee;\",\"⌅\":\"&barwedge;\",\"⎶\":\"&bbrktbrk;\",\"б\":\"&bcy;\",\"„\":\"&ldquor;\",\"⦰\":\"&bemptyv;\",\"β\":\"&beta;\",\"ℶ\":\"&beth;\",\"≬\":\"&twixt;\",\"𝔟\":\"&bfr;\",\"◯\":\"&xcirc;\",\"⨀\":\"&xodot;\",\"⨁\":\"&xoplus;\",\"⨂\":\"&xotime;\",\"⨆\":\"&xsqcup;\",\"★\":\"&starf;\",\"▽\":\"&xdtri;\",\"△\":\"&xutri;\",\"⨄\":\"&xuplus;\",\"⤍\":\"&rbarr;\",\"⧫\":\"&lozf;\",\"▴\":\"&utrif;\",\"▾\":\"&dtrif;\",\"◂\":\"&ltrif;\",\"▸\":\"&rtrif;\",\"␣\":\"&blank;\",\"▒\":\"&blk12;\",\"░\":\"&blk14;\",\"▓\":\"&blk34;\",\"█\":\"&block;\",\"=⃥\":\"&bne;\",\"≡⃥\":\"&bnequiv;\",\"⌐\":\"&bnot;\",\"𝕓\":\"&bopf;\",\"⋈\":\"&bowtie;\",\"╗\":\"&boxDL;\",\"╔\":\"&boxDR;\",\"╖\":\"&boxDl;\",\"╓\":\"&boxDr;\",\"═\":\"&boxH;\",\"╦\":\"&boxHD;\",\"╩\":\"&boxHU;\",\"╤\":\"&boxHd;\",\"╧\":\"&boxHu;\",\"╝\":\"&boxUL;\",\"╚\":\"&boxUR;\",\"╜\":\"&boxUl;\",\"╙\":\"&boxUr;\",\"║\":\"&boxV;\",\"╬\":\"&boxVH;\",\"╣\":\"&boxVL;\",\"╠\":\"&boxVR;\",\"╫\":\"&boxVh;\",\"╢\":\"&boxVl;\",\"╟\":\"&boxVr;\",\"⧉\":\"&boxbox;\",\"╕\":\"&boxdL;\",\"╒\":\"&boxdR;\",\"┐\":\"&boxdl;\",\"┌\":\"&boxdr;\",\"╥\":\"&boxhD;\",\"╨\":\"&boxhU;\",\"┬\":\"&boxhd;\",\"┴\":\"&boxhu;\",\"⊟\":\"&minusb;\",\"⊞\":\"&plusb;\",\"⊠\":\"&timesb;\",\"╛\":\"&boxuL;\",\"╘\":\"&boxuR;\",\"┘\":\"&boxul;\",\"└\":\"&boxur;\",\"│\":\"&boxv;\",\"╪\":\"&boxvH;\",\"╡\":\"&boxvL;\",\"╞\":\"&boxvR;\",\"┼\":\"&boxvh;\",\"┤\":\"&boxvl;\",\"├\":\"&boxvr;\",\"¦\":\"&brvbar;\",\"𝒷\":\"&bscr;\",\"⁏\":\"&bsemi;\",\"\\\\\":\"&bsol;\",\"⧅\":\"&bsolb;\",\"⟈\":\"&bsolhsub;\",\"•\":\"&bullet;\",\"⪮\":\"&bumpE;\",\"ć\":\"&cacute;\",\"∩\":\"&cap;\",\"⩄\":\"&capand;\",\"⩉\":\"&capbrcup;\",\"⩋\":\"&capcap;\",\"⩇\":\"&capcup;\",\"⩀\":\"&capdot;\",\"∩︀\":\"&caps;\",\"⁁\":\"&caret;\",\"⩍\":\"&ccaps;\",\"č\":\"&ccaron;\",\"ç\":\"&ccedil;\",\"ĉ\":\"&ccirc;\",\"⩌\":\"&ccups;\",\"⩐\":\"&ccupssm;\",\"ċ\":\"&cdot;\",\"⦲\":\"&cemptyv;\",\"¢\":\"&cent;\",\"𝔠\":\"&cfr;\",\"ч\":\"&chcy;\",\"✓\":\"&checkmark;\",\"χ\":\"&chi;\",\"○\":\"&cir;\",\"⧃\":\"&cirE;\",\"ˆ\":\"&circ;\",\"≗\":\"&cire;\",\"↺\":\"&olarr;\",\"↻\":\"&orarr;\",\"Ⓢ\":\"&oS;\",\"⊛\":\"&oast;\",\"⊚\":\"&ocir;\",\"⊝\":\"&odash;\",\"⨐\":\"&cirfnint;\",\"⫯\":\"&cirmid;\",\"⧂\":\"&cirscir;\",\"♣\":\"&clubsuit;\",\":\":\"&colon;\",\",\":\"&comma;\",\"@\":\"&commat;\",\"∁\":\"&complement;\",\"⩭\":\"&congdot;\",\"𝕔\":\"&copf;\",\"℗\":\"&copysr;\",\"↵\":\"&crarr;\",\"✗\":\"&cross;\",\"𝒸\":\"&cscr;\",\"⫏\":\"&csub;\",\"⫑\":\"&csube;\",\"⫐\":\"&csup;\",\"⫒\":\"&csupe;\",\"⋯\":\"&ctdot;\",\"⤸\":\"&cudarrl;\",\"⤵\":\"&cudarrr;\",\"⋞\":\"&curlyeqprec;\",\"⋟\":\"&curlyeqsucc;\",\"↶\":\"&curvearrowleft;\",\"⤽\":\"&cularrp;\",\"∪\":\"&cup;\",\"⩈\":\"&cupbrcap;\",\"⩆\":\"&cupcap;\",\"⩊\":\"&cupcup;\",\"⊍\":\"&cupdot;\",\"⩅\":\"&cupor;\",\"∪︀\":\"&cups;\",\"↷\":\"&curvearrowright;\",\"⤼\":\"&curarrm;\",\"⋎\":\"&cuvee;\",\"⋏\":\"&cuwed;\",\"¤\":\"&curren;\",\"∱\":\"&cwint;\",\"⌭\":\"&cylcty;\",\"⥥\":\"&dHar;\",\"†\":\"&dagger;\",\"ℸ\":\"&daleth;\",\"‐\":\"&hyphen;\",\"⤏\":\"&rBarr;\",\"ď\":\"&dcaron;\",\"д\":\"&dcy;\",\"⇊\":\"&downdownarrows;\",\"⩷\":\"&eDDot;\",\"°\":\"&deg;\",\"δ\":\"&delta;\",\"⦱\":\"&demptyv;\",\"⥿\":\"&dfisht;\",\"𝔡\":\"&dfr;\",\"♦\":\"&diams;\",\"ϝ\":\"&gammad;\",\"⋲\":\"&disin;\",\"÷\":\"&divide;\",\"⋇\":\"&divonx;\",\"ђ\":\"&djcy;\",\"⌞\":\"&llcorner;\",\"⌍\":\"&dlcrop;\",$:\"&dollar;\",\"𝕕\":\"&dopf;\",\"≑\":\"&eDot;\",\"∸\":\"&minusd;\",\"∔\":\"&plusdo;\",\"⊡\":\"&sdotb;\",\"⌟\":\"&lrcorner;\",\"⌌\":\"&drcrop;\",\"𝒹\":\"&dscr;\",\"ѕ\":\"&dscy;\",\"⧶\":\"&dsol;\",\"đ\":\"&dstrok;\",\"⋱\":\"&dtdot;\",\"▿\":\"&triangledown;\",\"⦦\":\"&dwangle;\",\"џ\":\"&dzcy;\",\"⟿\":\"&dzigrarr;\",\"é\":\"&eacute;\",\"⩮\":\"&easter;\",\"ě\":\"&ecaron;\",\"≖\":\"&eqcirc;\",\"ê\":\"&ecirc;\",\"≕\":\"&eqcolon;\",\"э\":\"&ecy;\",\"ė\":\"&edot;\",\"≒\":\"&fallingdotseq;\",\"𝔢\":\"&efr;\",\"⪚\":\"&eg;\",\"è\":\"&egrave;\",\"⪖\":\"&eqslantgtr;\",\"⪘\":\"&egsdot;\",\"⪙\":\"&el;\",\"⏧\":\"&elinters;\",\"ℓ\":\"&ell;\",\"⪕\":\"&eqslantless;\",\"⪗\":\"&elsdot;\",\"ē\":\"&emacr;\",\"∅\":\"&varnothing;\",\" \":\"&emsp13;\",\" \":\"&emsp14;\",\" \":\"&emsp;\",\"ŋ\":\"&eng;\",\" \":\"&ensp;\",\"ę\":\"&eogon;\",\"𝕖\":\"&eopf;\",\"⋕\":\"&epar;\",\"⧣\":\"&eparsl;\",\"⩱\":\"&eplus;\",\"ε\":\"&epsilon;\",\"ϵ\":\"&varepsilon;\",\"=\":\"&equals;\",\"≟\":\"&questeq;\",\"⩸\":\"&equivDD;\",\"⧥\":\"&eqvparsl;\",\"≓\":\"&risingdotseq;\",\"⥱\":\"&erarr;\",\"ℯ\":\"&escr;\",\"η\":\"&eta;\",\"ð\":\"&eth;\",\"ë\":\"&euml;\",\"€\":\"&euro;\",\"!\":\"&excl;\",\"ф\":\"&fcy;\",\"♀\":\"&female;\",\"ﬃ\":\"&ffilig;\",\"ﬀ\":\"&fflig;\",\"ﬄ\":\"&ffllig;\",\"𝔣\":\"&ffr;\",\"ﬁ\":\"&filig;\",fj:\"&fjlig;\",\"♭\":\"&flat;\",\"ﬂ\":\"&fllig;\",\"▱\":\"&fltns;\",\"ƒ\":\"&fnof;\",\"𝕗\":\"&fopf;\",\"⋔\":\"&pitchfork;\",\"⫙\":\"&forkv;\",\"⨍\":\"&fpartint;\",\"½\":\"&half;\",\"⅓\":\"&frac13;\",\"¼\":\"&frac14;\",\"⅕\":\"&frac15;\",\"⅙\":\"&frac16;\",\"⅛\":\"&frac18;\",\"⅔\":\"&frac23;\",\"⅖\":\"&frac25;\",\"¾\":\"&frac34;\",\"⅗\":\"&frac35;\",\"⅜\":\"&frac38;\",\"⅘\":\"&frac45;\",\"⅚\":\"&frac56;\",\"⅝\":\"&frac58;\",\"⅞\":\"&frac78;\",\"⁄\":\"&frasl;\",\"⌢\":\"&sfrown;\",\"𝒻\":\"&fscr;\",\"⪌\":\"&gtreqqless;\",\"ǵ\":\"&gacute;\",\"γ\":\"&gamma;\",\"⪆\":\"&gtrapprox;\",\"ğ\":\"&gbreve;\",\"ĝ\":\"&gcirc;\",\"г\":\"&gcy;\",\"ġ\":\"&gdot;\",\"⪩\":\"&gescc;\",\"⪀\":\"&gesdot;\",\"⪂\":\"&gesdoto;\",\"⪄\":\"&gesdotol;\",\"⋛︀\":\"&gesl;\",\"⪔\":\"&gesles;\",\"𝔤\":\"&gfr;\",\"ℷ\":\"&gimel;\",\"ѓ\":\"&gjcy;\",\"⪒\":\"&glE;\",\"⪥\":\"&gla;\",\"⪤\":\"&glj;\",\"≩\":\"&gneqq;\",\"⪊\":\"&gnapprox;\",\"⪈\":\"&gneq;\",\"⋧\":\"&gnsim;\",\"𝕘\":\"&gopf;\",\"ℊ\":\"&gscr;\",\"⪎\":\"&gsime;\",\"⪐\":\"&gsiml;\",\"⪧\":\"&gtcc;\",\"⩺\":\"&gtcir;\",\"⋗\":\"&gtrdot;\",\"⦕\":\"&gtlPar;\",\"⩼\":\"&gtquest;\",\"⥸\":\"&gtrarr;\",\"≩︀\":\"&gvnE;\",\"ъ\":\"&hardcy;\",\"⥈\":\"&harrcir;\",\"↭\":\"&leftrightsquigarrow;\",\"ℏ\":\"&plankv;\",\"ĥ\":\"&hcirc;\",\"♥\":\"&heartsuit;\",\"…\":\"&mldr;\",\"⊹\":\"&hercon;\",\"𝔥\":\"&hfr;\",\"⤥\":\"&searhk;\",\"⤦\":\"&swarhk;\",\"⇿\":\"&hoarr;\",\"∻\":\"&homtht;\",\"↩\":\"&larrhk;\",\"↪\":\"&rarrhk;\",\"𝕙\":\"&hopf;\",\"―\":\"&horbar;\",\"𝒽\":\"&hscr;\",\"ħ\":\"&hstrok;\",\"⁃\":\"&hybull;\",\"í\":\"&iacute;\",\"î\":\"&icirc;\",\"и\":\"&icy;\",\"е\":\"&iecy;\",\"¡\":\"&iexcl;\",\"𝔦\":\"&ifr;\",\"ì\":\"&igrave;\",\"⨌\":\"&qint;\",\"∭\":\"&tint;\",\"⧜\":\"&iinfin;\",\"℩\":\"&iiota;\",\"ĳ\":\"&ijlig;\",\"ī\":\"&imacr;\",\"ı\":\"&inodot;\",\"⊷\":\"&imof;\",\"Ƶ\":\"&imped;\",\"℅\":\"&incare;\",\"∞\":\"&infin;\",\"⧝\":\"&infintie;\",\"⊺\":\"&intercal;\",\"⨗\":\"&intlarhk;\",\"⨼\":\"&iprod;\",\"ё\":\"&iocy;\",\"į\":\"&iogon;\",\"𝕚\":\"&iopf;\",\"ι\":\"&iota;\",\"¿\":\"&iquest;\",\"𝒾\":\"&iscr;\",\"⋹\":\"&isinE;\",\"⋵\":\"&isindot;\",\"⋴\":\"&isins;\",\"⋳\":\"&isinsv;\",\"ĩ\":\"&itilde;\",\"і\":\"&iukcy;\",\"ï\":\"&iuml;\",\"ĵ\":\"&jcirc;\",\"й\":\"&jcy;\",\"𝔧\":\"&jfr;\",\"ȷ\":\"&jmath;\",\"𝕛\":\"&jopf;\",\"𝒿\":\"&jscr;\",\"ј\":\"&jsercy;\",\"є\":\"&jukcy;\",\"κ\":\"&kappa;\",\"ϰ\":\"&varkappa;\",\"ķ\":\"&kcedil;\",\"к\":\"&kcy;\",\"𝔨\":\"&kfr;\",\"ĸ\":\"&kgreen;\",\"х\":\"&khcy;\",\"ќ\":\"&kjcy;\",\"𝕜\":\"&kopf;\",\"𝓀\":\"&kscr;\",\"⤛\":\"&lAtail;\",\"⤎\":\"&lBarr;\",\"⪋\":\"&lesseqqgtr;\",\"⥢\":\"&lHar;\",\"ĺ\":\"&lacute;\",\"⦴\":\"&laemptyv;\",\"λ\":\"&lambda;\",\"⦑\":\"&langd;\",\"⪅\":\"&lessapprox;\",\"«\":\"&laquo;\",\"⤟\":\"&larrbfs;\",\"⤝\":\"&larrfs;\",\"↫\":\"&looparrowleft;\",\"⤹\":\"&larrpl;\",\"⥳\":\"&larrsim;\",\"↢\":\"&leftarrowtail;\",\"⪫\":\"&lat;\",\"⤙\":\"&latail;\",\"⪭\":\"&late;\",\"⪭︀\":\"&lates;\",\"⤌\":\"&lbarr;\",\"❲\":\"&lbbrk;\",\"{\":\"&lcub;\",\"[\":\"&lsqb;\",\"⦋\":\"&lbrke;\",\"⦏\":\"&lbrksld;\",\"⦍\":\"&lbrkslu;\",\"ľ\":\"&lcaron;\",\"ļ\":\"&lcedil;\",\"л\":\"&lcy;\",\"⤶\":\"&ldca;\",\"⥧\":\"&ldrdhar;\",\"⥋\":\"&ldrushar;\",\"↲\":\"&ldsh;\",\"≤\":\"&leq;\",\"⇇\":\"&llarr;\",\"⋋\":\"&lthree;\",\"⪨\":\"&lescc;\",\"⩿\":\"&lesdot;\",\"⪁\":\"&lesdoto;\",\"⪃\":\"&lesdotor;\",\"⋚︀\":\"&lesg;\",\"⪓\":\"&lesges;\",\"⋖\":\"&ltdot;\",\"⥼\":\"&lfisht;\",\"𝔩\":\"&lfr;\",\"⪑\":\"&lgE;\",\"⥪\":\"&lharul;\",\"▄\":\"&lhblk;\",\"љ\":\"&ljcy;\",\"⥫\":\"&llhard;\",\"◺\":\"&lltri;\",\"ŀ\":\"&lmidot;\",\"⎰\":\"&lmoustache;\",\"≨\":\"&lneqq;\",\"⪉\":\"&lnapprox;\",\"⪇\":\"&lneq;\",\"⋦\":\"&lnsim;\",\"⟬\":\"&loang;\",\"⇽\":\"&loarr;\",\"⟼\":\"&xmap;\",\"↬\":\"&rarrlp;\",\"⦅\":\"&lopar;\",\"𝕝\":\"&lopf;\",\"⨭\":\"&loplus;\",\"⨴\":\"&lotimes;\",\"∗\":\"&lowast;\",\"◊\":\"&lozenge;\",\"(\":\"&lpar;\",\"⦓\":\"&lparlt;\",\"⥭\":\"&lrhard;\",\"‎\":\"&lrm;\",\"⊿\":\"&lrtri;\",\"‹\":\"&lsaquo;\",\"𝓁\":\"&lscr;\",\"⪍\":\"&lsime;\",\"⪏\":\"&lsimg;\",\"‚\":\"&sbquo;\",\"ł\":\"&lstrok;\",\"⪦\":\"&ltcc;\",\"⩹\":\"&ltcir;\",\"⋉\":\"&ltimes;\",\"⥶\":\"&ltlarr;\",\"⩻\":\"&ltquest;\",\"⦖\":\"&ltrPar;\",\"◃\":\"&triangleleft;\",\"⥊\":\"&lurdshar;\",\"⥦\":\"&luruhar;\",\"≨︀\":\"&lvnE;\",\"∺\":\"&mDDot;\",\"¯\":\"&strns;\",\"♂\":\"&male;\",\"✠\":\"&maltese;\",\"▮\":\"&marker;\",\"⨩\":\"&mcomma;\",\"м\":\"&mcy;\",\"—\":\"&mdash;\",\"𝔪\":\"&mfr;\",\"℧\":\"&mho;\",\"µ\":\"&micro;\",\"⫰\":\"&midcir;\",\"−\":\"&minus;\",\"⨪\":\"&minusdu;\",\"⫛\":\"&mlcp;\",\"⊧\":\"&models;\",\"𝕞\":\"&mopf;\",\"𝓂\":\"&mscr;\",\"μ\":\"&mu;\",\"⊸\":\"&mumap;\",\"⋙̸\":\"&nGg;\",\"≫⃒\":\"&nGt;\",\"⇍\":\"&nlArr;\",\"⇎\":\"&nhArr;\",\"⋘̸\":\"&nLl;\",\"≪⃒\":\"&nLt;\",\"⇏\":\"&nrArr;\",\"⊯\":\"&nVDash;\",\"⊮\":\"&nVdash;\",\"ń\":\"&nacute;\",\"∠⃒\":\"&nang;\",\"⩰̸\":\"&napE;\",\"≋̸\":\"&napid;\",\"ŉ\":\"&napos;\",\"♮\":\"&natural;\",\"⩃\":\"&ncap;\",\"ň\":\"&ncaron;\",\"ņ\":\"&ncedil;\",\"⩭̸\":\"&ncongdot;\",\"⩂\":\"&ncup;\",\"н\":\"&ncy;\",\"–\":\"&ndash;\",\"⇗\":\"&neArr;\",\"⤤\":\"&nearhk;\",\"≐̸\":\"&nedot;\",\"⤨\":\"&toea;\",\"𝔫\":\"&nfr;\",\"↮\":\"&nleftrightarrow;\",\"⫲\":\"&nhpar;\",\"⋼\":\"&nis;\",\"⋺\":\"&nisd;\",\"њ\":\"&njcy;\",\"≦̸\":\"&nleqq;\",\"↚\":\"&nleftarrow;\",\"‥\":\"&nldr;\",\"𝕟\":\"&nopf;\",\"¬\":\"&not;\",\"⋹̸\":\"&notinE;\",\"⋵̸\":\"&notindot;\",\"⋷\":\"&notinvb;\",\"⋶\":\"&notinvc;\",\"⋾\":\"&notnivb;\",\"⋽\":\"&notnivc;\",\"⫽⃥\":\"&nparsl;\",\"∂̸\":\"&npart;\",\"⨔\":\"&npolint;\",\"↛\":\"&nrightarrow;\",\"⤳̸\":\"&nrarrc;\",\"↝̸\":\"&nrarrw;\",\"𝓃\":\"&nscr;\",\"⊄\":\"&nsub;\",\"⫅̸\":\"&nsubseteqq;\",\"⊅\":\"&nsup;\",\"⫆̸\":\"&nsupseteqq;\",\"ñ\":\"&ntilde;\",\"ν\":\"&nu;\",\"#\":\"&num;\",\"№\":\"&numero;\",\" \":\"&numsp;\",\"⊭\":\"&nvDash;\",\"⤄\":\"&nvHarr;\",\"≍⃒\":\"&nvap;\",\"⊬\":\"&nvdash;\",\"≥⃒\":\"&nvge;\",\">⃒\":\"&nvgt;\",\"⧞\":\"&nvinfin;\",\"⤂\":\"&nvlArr;\",\"≤⃒\":\"&nvle;\",\"<⃒\":\"&nvlt;\",\"⊴⃒\":\"&nvltrie;\",\"⤃\":\"&nvrArr;\",\"⊵⃒\":\"&nvrtrie;\",\"∼⃒\":\"&nvsim;\",\"⇖\":\"&nwArr;\",\"⤣\":\"&nwarhk;\",\"⤧\":\"&nwnear;\",\"ó\":\"&oacute;\",\"ô\":\"&ocirc;\",\"о\":\"&ocy;\",\"ő\":\"&odblac;\",\"⨸\":\"&odiv;\",\"⦼\":\"&odsold;\",\"œ\":\"&oelig;\",\"⦿\":\"&ofcir;\",\"𝔬\":\"&ofr;\",\"˛\":\"&ogon;\",\"ò\":\"&ograve;\",\"⧁\":\"&ogt;\",\"⦵\":\"&ohbar;\",\"⦾\":\"&olcir;\",\"⦻\":\"&olcross;\",\"⧀\":\"&olt;\",\"ō\":\"&omacr;\",\"ω\":\"&omega;\",\"ο\":\"&omicron;\",\"⦶\":\"&omid;\",\"𝕠\":\"&oopf;\",\"⦷\":\"&opar;\",\"⦹\":\"&operp;\",\"∨\":\"&vee;\",\"⩝\":\"&ord;\",\"ℴ\":\"&oscr;\",\"ª\":\"&ordf;\",\"º\":\"&ordm;\",\"⊶\":\"&origof;\",\"⩖\":\"&oror;\",\"⩗\":\"&orslope;\",\"⩛\":\"&orv;\",\"ø\":\"&oslash;\",\"⊘\":\"&osol;\",\"õ\":\"&otilde;\",\"⨶\":\"&otimesas;\",\"ö\":\"&ouml;\",\"⌽\":\"&ovbar;\",\"¶\":\"&para;\",\"⫳\":\"&parsim;\",\"⫽\":\"&parsl;\",\"п\":\"&pcy;\",\"%\":\"&percnt;\",\".\":\"&period;\",\"‰\":\"&permil;\",\"‱\":\"&pertenk;\",\"𝔭\":\"&pfr;\",\"φ\":\"&phi;\",\"ϕ\":\"&varphi;\",\"☎\":\"&phone;\",\"π\":\"&pi;\",\"ϖ\":\"&varpi;\",\"ℎ\":\"&planckh;\",\"+\":\"&plus;\",\"⨣\":\"&plusacir;\",\"⨢\":\"&pluscir;\",\"⨥\":\"&plusdu;\",\"⩲\":\"&pluse;\",\"⨦\":\"&plussim;\",\"⨧\":\"&plustwo;\",\"⨕\":\"&pointint;\",\"𝕡\":\"&popf;\",\"£\":\"&pound;\",\"⪳\":\"&prE;\",\"⪷\":\"&precapprox;\",\"⪹\":\"&prnap;\",\"⪵\":\"&prnE;\",\"⋨\":\"&prnsim;\",\"′\":\"&prime;\",\"⌮\":\"&profalar;\",\"⌒\":\"&profline;\",\"⌓\":\"&profsurf;\",\"⊰\":\"&prurel;\",\"𝓅\":\"&pscr;\",\"ψ\":\"&psi;\",\" \":\"&puncsp;\",\"𝔮\":\"&qfr;\",\"𝕢\":\"&qopf;\",\"⁗\":\"&qprime;\",\"𝓆\":\"&qscr;\",\"⨖\":\"&quatint;\",\"?\":\"&quest;\",\"⤜\":\"&rAtail;\",\"⥤\":\"&rHar;\",\"∽̱\":\"&race;\",\"ŕ\":\"&racute;\",\"⦳\":\"&raemptyv;\",\"⦒\":\"&rangd;\",\"⦥\":\"&range;\",\"»\":\"&raquo;\",\"⥵\":\"&rarrap;\",\"⤠\":\"&rarrbfs;\",\"⤳\":\"&rarrc;\",\"⤞\":\"&rarrfs;\",\"⥅\":\"&rarrpl;\",\"⥴\":\"&rarrsim;\",\"↣\":\"&rightarrowtail;\",\"↝\":\"&rightsquigarrow;\",\"⤚\":\"&ratail;\",\"∶\":\"&ratio;\",\"❳\":\"&rbbrk;\",\"}\":\"&rcub;\",\"]\":\"&rsqb;\",\"⦌\":\"&rbrke;\",\"⦎\":\"&rbrksld;\",\"⦐\":\"&rbrkslu;\",\"ř\":\"&rcaron;\",\"ŗ\":\"&rcedil;\",\"р\":\"&rcy;\",\"⤷\":\"&rdca;\",\"⥩\":\"&rdldhar;\",\"↳\":\"&rdsh;\",\"▭\":\"&rect;\",\"⥽\":\"&rfisht;\",\"𝔯\":\"&rfr;\",\"⥬\":\"&rharul;\",\"ρ\":\"&rho;\",\"ϱ\":\"&varrho;\",\"⇉\":\"&rrarr;\",\"⋌\":\"&rthree;\",\"˚\":\"&ring;\",\"‏\":\"&rlm;\",\"⎱\":\"&rmoustache;\",\"⫮\":\"&rnmid;\",\"⟭\":\"&roang;\",\"⇾\":\"&roarr;\",\"⦆\":\"&ropar;\",\"𝕣\":\"&ropf;\",\"⨮\":\"&roplus;\",\"⨵\":\"&rotimes;\",\")\":\"&rpar;\",\"⦔\":\"&rpargt;\",\"⨒\":\"&rppolint;\",\"›\":\"&rsaquo;\",\"𝓇\":\"&rscr;\",\"⋊\":\"&rtimes;\",\"▹\":\"&triangleright;\",\"⧎\":\"&rtriltri;\",\"⥨\":\"&ruluhar;\",\"℞\":\"&rx;\",\"ś\":\"&sacute;\",\"⪴\":\"&scE;\",\"⪸\":\"&succapprox;\",\"š\":\"&scaron;\",\"ş\":\"&scedil;\",\"ŝ\":\"&scirc;\",\"⪶\":\"&succneqq;\",\"⪺\":\"&succnapprox;\",\"⋩\":\"&succnsim;\",\"⨓\":\"&scpolint;\",\"с\":\"&scy;\",\"⋅\":\"&sdot;\",\"⩦\":\"&sdote;\",\"⇘\":\"&seArr;\",\"§\":\"&sect;\",\";\":\"&semi;\",\"⤩\":\"&tosa;\",\"✶\":\"&sext;\",\"𝔰\":\"&sfr;\",\"♯\":\"&sharp;\",\"щ\":\"&shchcy;\",\"ш\":\"&shcy;\",\"­\":\"&shy;\",\"σ\":\"&sigma;\",\"ς\":\"&varsigma;\",\"⩪\":\"&simdot;\",\"⪞\":\"&simg;\",\"⪠\":\"&simgE;\",\"⪝\":\"&siml;\",\"⪟\":\"&simlE;\",\"≆\":\"&simne;\",\"⨤\":\"&simplus;\",\"⥲\":\"&simrarr;\",\"⨳\":\"&smashp;\",\"⧤\":\"&smeparsl;\",\"⌣\":\"&ssmile;\",\"⪪\":\"&smt;\",\"⪬\":\"&smte;\",\"⪬︀\":\"&smtes;\",\"ь\":\"&softcy;\",\"/\":\"&sol;\",\"⧄\":\"&solb;\",\"⌿\":\"&solbar;\",\"𝕤\":\"&sopf;\",\"♠\":\"&spadesuit;\",\"⊓︀\":\"&sqcaps;\",\"⊔︀\":\"&sqcups;\",\"𝓈\":\"&sscr;\",\"☆\":\"&star;\",\"⊂\":\"&subset;\",\"⫅\":\"&subseteqq;\",\"⪽\":\"&subdot;\",\"⫃\":\"&subedot;\",\"⫁\":\"&submult;\",\"⫋\":\"&subsetneqq;\",\"⊊\":\"&subsetneq;\",\"⪿\":\"&subplus;\",\"⥹\":\"&subrarr;\",\"⫇\":\"&subsim;\",\"⫕\":\"&subsub;\",\"⫓\":\"&subsup;\",\"♪\":\"&sung;\",\"¹\":\"&sup1;\",\"²\":\"&sup2;\",\"³\":\"&sup3;\",\"⫆\":\"&supseteqq;\",\"⪾\":\"&supdot;\",\"⫘\":\"&supdsub;\",\"⫄\":\"&supedot;\",\"⟉\":\"&suphsol;\",\"⫗\":\"&suphsub;\",\"⥻\":\"&suplarr;\",\"⫂\":\"&supmult;\",\"⫌\":\"&supsetneqq;\",\"⊋\":\"&supsetneq;\",\"⫀\":\"&supplus;\",\"⫈\":\"&supsim;\",\"⫔\":\"&supsub;\",\"⫖\":\"&supsup;\",\"⇙\":\"&swArr;\",\"⤪\":\"&swnwar;\",\"ß\":\"&szlig;\",\"⌖\":\"&target;\",\"τ\":\"&tau;\",\"ť\":\"&tcaron;\",\"ţ\":\"&tcedil;\",\"т\":\"&tcy;\",\"⌕\":\"&telrec;\",\"𝔱\":\"&tfr;\",\"θ\":\"&theta;\",\"ϑ\":\"&vartheta;\",\"þ\":\"&thorn;\",\"×\":\"&times;\",\"⨱\":\"&timesbar;\",\"⨰\":\"&timesd;\",\"⌶\":\"&topbot;\",\"⫱\":\"&topcir;\",\"𝕥\":\"&topf;\",\"⫚\":\"&topfork;\",\"‴\":\"&tprime;\",\"▵\":\"&utri;\",\"≜\":\"&trie;\",\"◬\":\"&tridot;\",\"⨺\":\"&triminus;\",\"⨹\":\"&triplus;\",\"⧍\":\"&trisb;\",\"⨻\":\"&tritime;\",\"⏢\":\"&trpezium;\",\"𝓉\":\"&tscr;\",\"ц\":\"&tscy;\",\"ћ\":\"&tshcy;\",\"ŧ\":\"&tstrok;\",\"⥣\":\"&uHar;\",\"ú\":\"&uacute;\",\"ў\":\"&ubrcy;\",\"ŭ\":\"&ubreve;\",\"û\":\"&ucirc;\",\"у\":\"&ucy;\",\"ű\":\"&udblac;\",\"⥾\":\"&ufisht;\",\"𝔲\":\"&ufr;\",\"ù\":\"&ugrave;\",\"▀\":\"&uhblk;\",\"⌜\":\"&ulcorner;\",\"⌏\":\"&ulcrop;\",\"◸\":\"&ultri;\",\"ū\":\"&umacr;\",\"ų\":\"&uogon;\",\"𝕦\":\"&uopf;\",\"υ\":\"&upsilon;\",\"⇈\":\"&uuarr;\",\"⌝\":\"&urcorner;\",\"⌎\":\"&urcrop;\",\"ů\":\"&uring;\",\"◹\":\"&urtri;\",\"𝓊\":\"&uscr;\",\"⋰\":\"&utdot;\",\"ũ\":\"&utilde;\",\"ü\":\"&uuml;\",\"⦧\":\"&uwangle;\",\"⫨\":\"&vBar;\",\"⫩\":\"&vBarv;\",\"⦜\":\"&vangrt;\",\"⊊︀\":\"&vsubne;\",\"⫋︀\":\"&vsubnE;\",\"⊋︀\":\"&vsupne;\",\"⫌︀\":\"&vsupnE;\",\"в\":\"&vcy;\",\"⊻\":\"&veebar;\",\"≚\":\"&veeeq;\",\"⋮\":\"&vellip;\",\"𝔳\":\"&vfr;\",\"𝕧\":\"&vopf;\",\"𝓋\":\"&vscr;\",\"⦚\":\"&vzigzag;\",\"ŵ\":\"&wcirc;\",\"⩟\":\"&wedbar;\",\"≙\":\"&wedgeq;\",\"℘\":\"&wp;\",\"𝔴\":\"&wfr;\",\"𝕨\":\"&wopf;\",\"𝓌\":\"&wscr;\",\"𝔵\":\"&xfr;\",\"ξ\":\"&xi;\",\"⋻\":\"&xnis;\",\"𝕩\":\"&xopf;\",\"𝓍\":\"&xscr;\",\"ý\":\"&yacute;\",\"я\":\"&yacy;\",\"ŷ\":\"&ycirc;\",\"ы\":\"&ycy;\",\"¥\":\"&yen;\",\"𝔶\":\"&yfr;\",\"ї\":\"&yicy;\",\"𝕪\":\"&yopf;\",\"𝓎\":\"&yscr;\",\"ю\":\"&yucy;\",\"ÿ\":\"&yuml;\",\"ź\":\"&zacute;\",\"ž\":\"&zcaron;\",\"з\":\"&zcy;\",\"ż\":\"&zdot;\",\"ζ\":\"&zeta;\",\"𝔷\":\"&zfr;\",\"ж\":\"&zhcy;\",\"⇝\":\"&zigrarr;\",\"𝕫\":\"&zopf;\",\"𝓏\":\"&zscr;\",\"‍\":\"&zwj;\",\"‌\":\"&zwnj;\"}}};\n\n//# sourceURL=webpack://contact_management_system/./node_modules/html-entities/lib/named-references.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};\n\n//# sourceURL=webpack://contact_management_system/./node_modules/html-entities/lib/numeric-unicode-map.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;\n\n//# sourceURL=webpack://contact_management_system/./node_modules/html-entities/lib/surrogate-pairs.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* eslint-env browser */\n/*\n  eslint-disable\n  no-console,\n  func-names\n*/\n\n/** @typedef {any} TODO */\n\nvar normalizeUrl = __webpack_require__(/*! ./normalize-url */ \"./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js\");\nvar srcByModuleId = Object.create(null);\nvar noDocument = typeof document === \"undefined\";\nvar forEach = Array.prototype.forEach;\n\n/**\n * @param {function} fn\n * @param {number} time\n * @returns {(function(): void)|*}\n */\nfunction debounce(fn, time) {\n  var timeout = 0;\n  return function () {\n    // @ts-ignore\n    var self = this;\n    // eslint-disable-next-line prefer-rest-params\n    var args = arguments;\n    var functionCall = function functionCall() {\n      return fn.apply(self, args);\n    };\n    clearTimeout(timeout);\n\n    // @ts-ignore\n    timeout = setTimeout(functionCall, time);\n  };\n}\nfunction noop() {}\n\n/**\n * @param {TODO} moduleId\n * @returns {TODO}\n */\nfunction getCurrentScriptUrl(moduleId) {\n  var src = srcByModuleId[moduleId];\n  if (!src) {\n    if (document.currentScript) {\n      src = /** @type {HTMLScriptElement} */document.currentScript.src;\n    } else {\n      var scripts = document.getElementsByTagName(\"script\");\n      var lastScriptTag = scripts[scripts.length - 1];\n      if (lastScriptTag) {\n        src = lastScriptTag.src;\n      }\n    }\n    srcByModuleId[moduleId] = src;\n  }\n\n  /**\n   * @param {string} fileMap\n   * @returns {null | string[]}\n   */\n  return function (fileMap) {\n    if (!src) {\n      return null;\n    }\n    var splitResult = src.split(/([^\\\\/]+)\\.js$/);\n    var filename = splitResult && splitResult[1];\n    if (!filename) {\n      return [src.replace(\".js\", \".css\")];\n    }\n    if (!fileMap) {\n      return [src.replace(\".js\", \".css\")];\n    }\n    return fileMap.split(\",\").map(function (mapRule) {\n      var reg = new RegExp(\"\".concat(filename, \"\\\\.js$\"), \"g\");\n      return normalizeUrl(src.replace(reg, \"\".concat(mapRule.replace(/{fileName}/g, filename), \".css\")));\n    });\n  };\n}\n\n/**\n * @param {TODO} el\n * @param {string} [url]\n */\nfunction updateCss(el, url) {\n  if (!url) {\n    if (!el.href) {\n      return;\n    }\n\n    // eslint-disable-next-line\n    url = el.href.split(\"?\")[0];\n  }\n  if (!isUrlRequest( /** @type {string} */url)) {\n    return;\n  }\n  if (el.isLoaded === false) {\n    // We seem to be about to replace a css link that hasn't loaded yet.\n    // We're probably changing the same file more than once.\n    return;\n  }\n  if (!url || !(url.indexOf(\".css\") > -1)) {\n    return;\n  }\n\n  // eslint-disable-next-line no-param-reassign\n  el.visited = true;\n  var newEl = el.cloneNode();\n  newEl.isLoaded = false;\n  newEl.addEventListener(\"load\", function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.addEventListener(\"error\", function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.href = \"\".concat(url, \"?\").concat(Date.now());\n  if (el.nextSibling) {\n    el.parentNode.insertBefore(newEl, el.nextSibling);\n  } else {\n    el.parentNode.appendChild(newEl);\n  }\n}\n\n/**\n * @param {string} href\n * @param {TODO} src\n * @returns {TODO}\n */\nfunction getReloadUrl(href, src) {\n  var ret;\n\n  // eslint-disable-next-line no-param-reassign\n  href = normalizeUrl(href);\n  src.some(\n  /**\n   * @param {string} url\n   */\n  // eslint-disable-next-line array-callback-return\n  function (url) {\n    if (href.indexOf(src) > -1) {\n      ret = url;\n    }\n  });\n  return ret;\n}\n\n/**\n * @param {string} [src]\n * @returns {boolean}\n */\nfunction reloadStyle(src) {\n  if (!src) {\n    return false;\n  }\n  var elements = document.querySelectorAll(\"link\");\n  var loaded = false;\n  forEach.call(elements, function (el) {\n    if (!el.href) {\n      return;\n    }\n    var url = getReloadUrl(el.href, src);\n    if (!isUrlRequest(url)) {\n      return;\n    }\n    if (el.visited === true) {\n      return;\n    }\n    if (url) {\n      updateCss(el, url);\n      loaded = true;\n    }\n  });\n  return loaded;\n}\nfunction reloadAll() {\n  var elements = document.querySelectorAll(\"link\");\n  forEach.call(elements, function (el) {\n    if (el.visited === true) {\n      return;\n    }\n    updateCss(el);\n  });\n}\n\n/**\n * @param {string} url\n * @returns {boolean}\n */\nfunction isUrlRequest(url) {\n  // An URL is not an request if\n\n  // It is not http or https\n  if (!/^[a-zA-Z][a-zA-Z\\d+\\-.]*:/.test(url)) {\n    return false;\n  }\n  return true;\n}\n\n/**\n * @param {TODO} moduleId\n * @param {TODO} options\n * @returns {TODO}\n */\nmodule.exports = function (moduleId, options) {\n  if (noDocument) {\n    console.log(\"no window.document found, will not HMR CSS\");\n    return noop;\n  }\n  var getScriptSrc = getCurrentScriptUrl(moduleId);\n  function update() {\n    var src = getScriptSrc(options.filename);\n    var reloaded = reloadStyle(src);\n    if (options.locals) {\n      console.log(\"[HMR] Detected local css modules. Reload all css\");\n      reloadAll();\n      return;\n    }\n    if (reloaded) {\n      console.log(\"[HMR] css reload %s\", src.join(\" \"));\n    } else {\n      console.log(\"[HMR] Reload all css\");\n      reloadAll();\n    }\n  }\n  return debounce(update, 50);\n};\n\n//# sourceURL=webpack://contact_management_system/./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* eslint-disable */\n\n/**\n * @param {string[]} pathComponents\n * @returns {string}\n */\nfunction normalizeUrl(pathComponents) {\n  return pathComponents.reduce(function (accumulator, item) {\n    switch (item) {\n      case \"..\":\n        accumulator.pop();\n        break;\n      case \".\":\n        break;\n      default:\n        accumulator.push(item);\n    }\n    return accumulator;\n  }, /** @type {string[]} */[]).join(\"/\");\n}\n\n/**\n * @param {string} urlString\n * @returns {string}\n */\nmodule.exports = function (urlString) {\n  urlString = urlString.trim();\n  if (/^data:/i.test(urlString)) {\n    return urlString;\n  }\n  var protocol = urlString.indexOf(\"//\") !== -1 ? urlString.split(\"//\")[0] + \"//\" : \"\";\n  var components = urlString.replace(new RegExp(protocol, \"i\"), \"\").split(\"/\");\n  var host = components[0].toLowerCase().replace(/\\.$/, \"\");\n  components[0] = \"\";\n  var path = normalizeUrl(components);\n  return protocol + host + path;\n};\n\n//# sourceURL=webpack://contact_management_system/./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js?");

/***/ }),

/***/ "./src/client/styles/main.scss":
/*!*************************************!*\
  !*** ./src/client/styles/main.scss ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      // 1675709629888\n      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ \"./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js\")(module.id, {\"locals\":false});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack://contact_management_system/./src/client/styles/main.scss?");

/***/ }),

/***/ "./node_modules/redom/dist/redom.es.js":
/*!*********************************************!*\
  !*** ./node_modules/redom/dist/redom.es.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"List\": () => (/* binding */ List),\n/* harmony export */   \"ListPool\": () => (/* binding */ ListPool),\n/* harmony export */   \"Place\": () => (/* binding */ Place),\n/* harmony export */   \"Router\": () => (/* binding */ Router),\n/* harmony export */   \"el\": () => (/* binding */ el),\n/* harmony export */   \"h\": () => (/* binding */ h),\n/* harmony export */   \"html\": () => (/* binding */ html),\n/* harmony export */   \"list\": () => (/* binding */ list),\n/* harmony export */   \"listPool\": () => (/* binding */ listPool),\n/* harmony export */   \"mount\": () => (/* binding */ mount),\n/* harmony export */   \"place\": () => (/* binding */ place),\n/* harmony export */   \"router\": () => (/* binding */ router),\n/* harmony export */   \"s\": () => (/* binding */ s),\n/* harmony export */   \"setAttr\": () => (/* binding */ setAttr),\n/* harmony export */   \"setChildren\": () => (/* binding */ setChildren),\n/* harmony export */   \"setData\": () => (/* binding */ setData),\n/* harmony export */   \"setStyle\": () => (/* binding */ setStyle),\n/* harmony export */   \"setXlink\": () => (/* binding */ setXlink),\n/* harmony export */   \"svg\": () => (/* binding */ svg),\n/* harmony export */   \"text\": () => (/* binding */ text),\n/* harmony export */   \"unmount\": () => (/* binding */ unmount)\n/* harmony export */ });\nfunction createElement (query, ns) {\n  var ref = parse(query);\n  var tag = ref.tag;\n  var id = ref.id;\n  var className = ref.className;\n  var element = ns ? document.createElementNS(ns, tag) : document.createElement(tag);\n\n  if (id) {\n    element.id = id;\n  }\n\n  if (className) {\n    if (ns) {\n      element.setAttribute('class', className);\n    } else {\n      element.className = className;\n    }\n  }\n\n  return element;\n}\n\nfunction parse (query) {\n  var chunks = query.split(/([.#])/);\n  var className = '';\n  var id = '';\n\n  for (var i = 1; i < chunks.length; i += 2) {\n    switch (chunks[i]) {\n      case '.':\n        className += \" \" + (chunks[i + 1]);\n        break;\n\n      case '#':\n        id = chunks[i + 1];\n    }\n  }\n\n  return {\n    className: className.trim(),\n    tag: chunks[0] || 'div',\n    id: id\n  };\n}\n\nfunction unmount (parent, child) {\n  var parentEl = getEl(parent);\n  var childEl = getEl(child);\n\n  if (child === childEl && childEl.__redom_view) {\n    // try to look up the view if not provided\n    child = childEl.__redom_view;\n  }\n\n  if (childEl.parentNode) {\n    doUnmount(child, childEl, parentEl);\n\n    parentEl.removeChild(childEl);\n  }\n\n  return child;\n}\n\nfunction doUnmount (child, childEl, parentEl) {\n  var hooks = childEl.__redom_lifecycle;\n\n  if (hooksAreEmpty(hooks)) {\n    childEl.__redom_lifecycle = {};\n    return;\n  }\n\n  var traverse = parentEl;\n\n  if (childEl.__redom_mounted) {\n    trigger(childEl, 'onunmount');\n  }\n\n  while (traverse) {\n    var parentHooks = traverse.__redom_lifecycle || {};\n\n    for (var hook in hooks) {\n      if (parentHooks[hook]) {\n        parentHooks[hook] -= hooks[hook];\n      }\n    }\n\n    if (hooksAreEmpty(parentHooks)) {\n      traverse.__redom_lifecycle = null;\n    }\n\n    traverse = traverse.parentNode;\n  }\n}\n\nfunction hooksAreEmpty (hooks) {\n  if (hooks == null) {\n    return true;\n  }\n  for (var key in hooks) {\n    if (hooks[key]) {\n      return false;\n    }\n  }\n  return true;\n}\n\n/* global Node, ShadowRoot */\n\nvar hookNames = ['onmount', 'onremount', 'onunmount'];\nvar shadowRootAvailable = typeof window !== 'undefined' && 'ShadowRoot' in window;\n\nfunction mount (parent, child, before, replace) {\n  var parentEl = getEl(parent);\n  var childEl = getEl(child);\n\n  if (child === childEl && childEl.__redom_view) {\n    // try to look up the view if not provided\n    child = childEl.__redom_view;\n  }\n\n  if (child !== childEl) {\n    childEl.__redom_view = child;\n  }\n\n  var wasMounted = childEl.__redom_mounted;\n  var oldParent = childEl.parentNode;\n\n  if (wasMounted && (oldParent !== parentEl)) {\n    doUnmount(child, childEl, oldParent);\n  }\n\n  if (before != null) {\n    if (replace) {\n      var beforeEl = getEl(before);\n\n      if (beforeEl.__redom_mounted) {\n        trigger(beforeEl, 'onunmount');\n      }\n\n      parentEl.replaceChild(childEl, beforeEl);\n    } else {\n      parentEl.insertBefore(childEl, getEl(before));\n    }\n  } else {\n    parentEl.appendChild(childEl);\n  }\n\n  doMount(child, childEl, parentEl, oldParent);\n\n  return child;\n}\n\nfunction trigger (el, eventName) {\n  if (eventName === 'onmount' || eventName === 'onremount') {\n    el.__redom_mounted = true;\n  } else if (eventName === 'onunmount') {\n    el.__redom_mounted = false;\n  }\n\n  var hooks = el.__redom_lifecycle;\n\n  if (!hooks) {\n    return;\n  }\n\n  var view = el.__redom_view;\n  var hookCount = 0;\n\n  view && view[eventName] && view[eventName]();\n\n  for (var hook in hooks) {\n    if (hook) {\n      hookCount++;\n    }\n  }\n\n  if (hookCount) {\n    var traverse = el.firstChild;\n\n    while (traverse) {\n      var next = traverse.nextSibling;\n\n      trigger(traverse, eventName);\n\n      traverse = next;\n    }\n  }\n}\n\nfunction doMount (child, childEl, parentEl, oldParent) {\n  var hooks = childEl.__redom_lifecycle || (childEl.__redom_lifecycle = {});\n  var remount = (parentEl === oldParent);\n  var hooksFound = false;\n\n  for (var i = 0, list = hookNames; i < list.length; i += 1) {\n    var hookName = list[i];\n\n    if (!remount) { // if already mounted, skip this phase\n      if (child !== childEl) { // only Views can have lifecycle events\n        if (hookName in child) {\n          hooks[hookName] = (hooks[hookName] || 0) + 1;\n        }\n      }\n    }\n    if (hooks[hookName]) {\n      hooksFound = true;\n    }\n  }\n\n  if (!hooksFound) {\n    childEl.__redom_lifecycle = {};\n    return;\n  }\n\n  var traverse = parentEl;\n  var triggered = false;\n\n  if (remount || (traverse && traverse.__redom_mounted)) {\n    trigger(childEl, remount ? 'onremount' : 'onmount');\n    triggered = true;\n  }\n\n  while (traverse) {\n    var parent = traverse.parentNode;\n    var parentHooks = traverse.__redom_lifecycle || (traverse.__redom_lifecycle = {});\n\n    for (var hook in hooks) {\n      parentHooks[hook] = (parentHooks[hook] || 0) + hooks[hook];\n    }\n\n    if (triggered) {\n      break;\n    } else {\n      if (traverse.nodeType === Node.DOCUMENT_NODE ||\n        (shadowRootAvailable && (traverse instanceof ShadowRoot)) ||\n        (parent && parent.__redom_mounted)\n      ) {\n        trigger(traverse, remount ? 'onremount' : 'onmount');\n        triggered = true;\n      }\n      traverse = parent;\n    }\n  }\n}\n\nfunction setStyle (view, arg1, arg2) {\n  var el = getEl(view);\n\n  if (typeof arg1 === 'object') {\n    for (var key in arg1) {\n      setStyleValue(el, key, arg1[key]);\n    }\n  } else {\n    setStyleValue(el, arg1, arg2);\n  }\n}\n\nfunction setStyleValue (el, key, value) {\n  el.style[key] = value == null ? '' : value;\n}\n\n/* global SVGElement */\n\nvar xlinkns = 'http://www.w3.org/1999/xlink';\n\nfunction setAttr (view, arg1, arg2) {\n  setAttrInternal(view, arg1, arg2);\n}\n\nfunction setAttrInternal (view, arg1, arg2, initial) {\n  var el = getEl(view);\n\n  var isObj = typeof arg1 === 'object';\n\n  if (isObj) {\n    for (var key in arg1) {\n      setAttrInternal(el, key, arg1[key], initial);\n    }\n  } else {\n    var isSVG = el instanceof SVGElement;\n    var isFunc = typeof arg2 === 'function';\n\n    if (arg1 === 'style' && typeof arg2 === 'object') {\n      setStyle(el, arg2);\n    } else if (isSVG && isFunc) {\n      el[arg1] = arg2;\n    } else if (arg1 === 'dataset') {\n      setData(el, arg2);\n    } else if (!isSVG && (arg1 in el || isFunc) && (arg1 !== 'list')) {\n      el[arg1] = arg2;\n    } else {\n      if (isSVG && (arg1 === 'xlink')) {\n        setXlink(el, arg2);\n        return;\n      }\n      if (initial && arg1 === 'class') {\n        arg2 = el.className + ' ' + arg2;\n      }\n      if (arg2 == null) {\n        el.removeAttribute(arg1);\n      } else {\n        el.setAttribute(arg1, arg2);\n      }\n    }\n  }\n}\n\nfunction setXlink (el, arg1, arg2) {\n  if (typeof arg1 === 'object') {\n    for (var key in arg1) {\n      setXlink(el, key, arg1[key]);\n    }\n  } else {\n    if (arg2 != null) {\n      el.setAttributeNS(xlinkns, arg1, arg2);\n    } else {\n      el.removeAttributeNS(xlinkns, arg1, arg2);\n    }\n  }\n}\n\nfunction setData (el, arg1, arg2) {\n  if (typeof arg1 === 'object') {\n    for (var key in arg1) {\n      setData(el, key, arg1[key]);\n    }\n  } else {\n    if (arg2 != null) {\n      el.dataset[arg1] = arg2;\n    } else {\n      delete el.dataset[arg1];\n    }\n  }\n}\n\nfunction text (str) {\n  return document.createTextNode((str != null) ? str : '');\n}\n\nfunction parseArgumentsInternal (element, args, initial) {\n  for (var i = 0, list = args; i < list.length; i += 1) {\n    var arg = list[i];\n\n    if (arg !== 0 && !arg) {\n      continue;\n    }\n\n    var type = typeof arg;\n\n    if (type === 'function') {\n      arg(element);\n    } else if (type === 'string' || type === 'number') {\n      element.appendChild(text(arg));\n    } else if (isNode(getEl(arg))) {\n      mount(element, arg);\n    } else if (arg.length) {\n      parseArgumentsInternal(element, arg, initial);\n    } else if (type === 'object') {\n      setAttrInternal(element, arg, null, initial);\n    }\n  }\n}\n\nfunction ensureEl (parent) {\n  return typeof parent === 'string' ? html(parent) : getEl(parent);\n}\n\nfunction getEl (parent) {\n  return (parent.nodeType && parent) || (!parent.el && parent) || getEl(parent.el);\n}\n\nfunction isNode (arg) {\n  return arg && arg.nodeType;\n}\n\nfunction html (query) {\n  var args = [], len = arguments.length - 1;\n  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];\n\n  var element;\n\n  var type = typeof query;\n\n  if (type === 'string') {\n    element = createElement(query);\n  } else if (type === 'function') {\n    var Query = query;\n    element = new (Function.prototype.bind.apply( Query, [ null ].concat( args) ));\n  } else {\n    throw new Error('At least one argument required');\n  }\n\n  parseArgumentsInternal(getEl(element), args, true);\n\n  return element;\n}\n\nvar el = html;\nvar h = html;\n\nhtml.extend = function extendHtml () {\n  var args = [], len = arguments.length;\n  while ( len-- ) args[ len ] = arguments[ len ];\n\n  return html.bind.apply(html, [ this ].concat( args ));\n};\n\nfunction setChildren (parent) {\n  var children = [], len = arguments.length - 1;\n  while ( len-- > 0 ) children[ len ] = arguments[ len + 1 ];\n\n  var parentEl = getEl(parent);\n  var current = traverse(parent, children, parentEl.firstChild);\n\n  while (current) {\n    var next = current.nextSibling;\n\n    unmount(parent, current);\n\n    current = next;\n  }\n}\n\nfunction traverse (parent, children, _current) {\n  var current = _current;\n\n  var childEls = Array(children.length);\n\n  for (var i = 0; i < children.length; i++) {\n    childEls[i] = children[i] && getEl(children[i]);\n  }\n\n  for (var i$1 = 0; i$1 < children.length; i$1++) {\n    var child = children[i$1];\n\n    if (!child) {\n      continue;\n    }\n\n    var childEl = childEls[i$1];\n\n    if (childEl === current) {\n      current = current.nextSibling;\n      continue;\n    }\n\n    if (isNode(childEl)) {\n      var next = current && current.nextSibling;\n      var exists = child.__redom_index != null;\n      var replace = exists && next === childEls[i$1 + 1];\n\n      mount(parent, child, current, replace);\n\n      if (replace) {\n        current = next;\n      }\n\n      continue;\n    }\n\n    if (child.length != null) {\n      current = traverse(parent, child, current);\n    }\n  }\n\n  return current;\n}\n\nfunction listPool (View, key, initData) {\n  return new ListPool(View, key, initData);\n}\n\nvar ListPool = function ListPool (View, key, initData) {\n  this.View = View;\n  this.initData = initData;\n  this.oldLookup = {};\n  this.lookup = {};\n  this.oldViews = [];\n  this.views = [];\n\n  if (key != null) {\n    this.key = typeof key === 'function' ? key : propKey(key);\n  }\n};\n\nListPool.prototype.update = function update (data, context) {\n  var ref = this;\n    var View = ref.View;\n    var key = ref.key;\n    var initData = ref.initData;\n  var keySet = key != null;\n\n  var oldLookup = this.lookup;\n  var newLookup = {};\n\n  var newViews = Array(data.length);\n  var oldViews = this.views;\n\n  for (var i = 0; i < data.length; i++) {\n    var item = data[i];\n    var view = (void 0);\n\n    if (keySet) {\n      var id = key(item);\n\n      view = oldLookup[id] || new View(initData, item, i, data);\n      newLookup[id] = view;\n      view.__redom_id = id;\n    } else {\n      view = oldViews[i] || new View(initData, item, i, data);\n    }\n    view.update && view.update(item, i, data, context);\n\n    var el = getEl(view.el);\n\n    el.__redom_view = view;\n    newViews[i] = view;\n  }\n\n  this.oldViews = oldViews;\n  this.views = newViews;\n\n  this.oldLookup = oldLookup;\n  this.lookup = newLookup;\n};\n\nfunction propKey (key) {\n  return function (item) {\n    return item[key];\n  };\n}\n\nfunction list (parent, View, key, initData) {\n  return new List(parent, View, key, initData);\n}\n\nvar List = function List (parent, View, key, initData) {\n  this.View = View;\n  this.initData = initData;\n  this.views = [];\n  this.pool = new ListPool(View, key, initData);\n  this.el = ensureEl(parent);\n  this.keySet = key != null;\n};\n\nList.prototype.update = function update (data, context) {\n    if ( data === void 0 ) data = [];\n\n  var ref = this;\n    var keySet = ref.keySet;\n  var oldViews = this.views;\n\n  this.pool.update(data, context);\n\n  var ref$1 = this.pool;\n    var views = ref$1.views;\n    var lookup = ref$1.lookup;\n\n  if (keySet) {\n    for (var i = 0; i < oldViews.length; i++) {\n      var oldView = oldViews[i];\n      var id = oldView.__redom_id;\n\n      if (lookup[id] == null) {\n        oldView.__redom_index = null;\n        unmount(this, oldView);\n      }\n    }\n  }\n\n  for (var i$1 = 0; i$1 < views.length; i$1++) {\n    var view = views[i$1];\n\n    view.__redom_index = i$1;\n  }\n\n  setChildren(this, views);\n\n  if (keySet) {\n    this.lookup = lookup;\n  }\n  this.views = views;\n};\n\nList.extend = function extendList (parent, View, key, initData) {\n  return List.bind(List, parent, View, key, initData);\n};\n\nlist.extend = List.extend;\n\n/* global Node */\n\nfunction place (View, initData) {\n  return new Place(View, initData);\n}\n\nvar Place = function Place (View, initData) {\n  this.el = text('');\n  this.visible = false;\n  this.view = null;\n  this._placeholder = this.el;\n\n  if (View instanceof Node) {\n    this._el = View;\n  } else if (View.el instanceof Node) {\n    this._el = View;\n    this.view = View;\n  } else {\n    this._View = View;\n  }\n\n  this._initData = initData;\n};\n\nPlace.prototype.update = function update (visible, data) {\n  var placeholder = this._placeholder;\n  var parentNode = this.el.parentNode;\n\n  if (visible) {\n    if (!this.visible) {\n      if (this._el) {\n        mount(parentNode, this._el, placeholder);\n        unmount(parentNode, placeholder);\n\n        this.el = getEl(this._el);\n        this.visible = visible;\n      } else {\n        var View = this._View;\n        var view = new View(this._initData);\n\n        this.el = getEl(view);\n        this.view = view;\n\n        mount(parentNode, view, placeholder);\n        unmount(parentNode, placeholder);\n      }\n    }\n    this.view && this.view.update && this.view.update(data);\n  } else {\n    if (this.visible) {\n      if (this._el) {\n        mount(parentNode, placeholder, this._el);\n        unmount(parentNode, this._el);\n\n        this.el = placeholder;\n        this.visible = visible;\n\n        return;\n      }\n      mount(parentNode, placeholder, this.view);\n      unmount(parentNode, this.view);\n\n      this.el = placeholder;\n      this.view = null;\n    }\n  }\n  this.visible = visible;\n};\n\n/* global Node */\n\nfunction router (parent, Views, initData) {\n  return new Router(parent, Views, initData);\n}\n\nvar Router = function Router (parent, Views, initData) {\n  this.el = ensureEl(parent);\n  this.Views = Views;\n  this.initData = initData;\n};\n\nRouter.prototype.update = function update (route, data) {\n  if (route !== this.route) {\n    var Views = this.Views;\n    var View = Views[route];\n\n    this.route = route;\n\n    if (View && (View instanceof Node || View.el instanceof Node)) {\n      this.view = View;\n    } else {\n      this.view = View && new View(this.initData, data);\n    }\n\n    setChildren(this.el, [this.view]);\n  }\n  this.view && this.view.update && this.view.update(data, route);\n};\n\nvar ns = 'http://www.w3.org/2000/svg';\n\nfunction svg (query) {\n  var args = [], len = arguments.length - 1;\n  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];\n\n  var element;\n\n  var type = typeof query;\n\n  if (type === 'string') {\n    element = createElement(query, ns);\n  } else if (type === 'function') {\n    var Query = query;\n    element = new (Function.prototype.bind.apply( Query, [ null ].concat( args) ));\n  } else {\n    throw new Error('At least one argument required');\n  }\n\n  parseArgumentsInternal(getEl(element), args, true);\n\n  return element;\n}\n\nvar s = svg;\n\nsvg.extend = function extendSvg () {\n  var args = [], len = arguments.length;\n  while ( len-- ) args[ len ] = arguments[ len ];\n\n  return svg.bind.apply(svg, [ this ].concat( args ));\n};\n\nsvg.ns = ns;\n\n\n\n\n//# sourceURL=webpack://contact_management_system/./node_modules/redom/dist/redom.es.js?");

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst ansiRegex = __webpack_require__(/*! ansi-regex */ \"./node_modules/ansi-regex/index.js\");\n\nmodule.exports = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;\n\n\n//# sourceURL=webpack://contact_management_system/./node_modules/strip-ansi/index.js?");

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client-overlay.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-hot-middleware/client-overlay.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*eslint-env browser*/\n\nvar clientOverlay = document.createElement('div');\nclientOverlay.id = 'webpack-hot-middleware-clientOverlay';\nvar styles = {\n  background: 'rgba(0,0,0,0.85)',\n  color: '#e8e8e8',\n  lineHeight: '1.6',\n  whiteSpace: 'pre',\n  fontFamily: 'Menlo, Consolas, monospace',\n  fontSize: '13px',\n  position: 'fixed',\n  zIndex: 9999,\n  padding: '10px',\n  left: 0,\n  right: 0,\n  top: 0,\n  bottom: 0,\n  overflow: 'auto',\n  dir: 'ltr',\n  textAlign: 'left',\n};\n\nvar ansiHTML = __webpack_require__(/*! ansi-html-community */ \"./node_modules/ansi-html-community/index.js\");\nvar colors = {\n  reset: ['transparent', 'transparent'],\n  black: '181818',\n  red: 'ff3348',\n  green: '3fff4f',\n  yellow: 'ffd30e',\n  blue: '169be0',\n  magenta: 'f840b7',\n  cyan: '0ad8e9',\n  lightgrey: 'ebe7e3',\n  darkgrey: '6d7891',\n};\n\nvar htmlEntities = __webpack_require__(/*! html-entities */ \"./node_modules/html-entities/lib/index.js\");\n\nfunction showProblems(type, lines) {\n  clientOverlay.innerHTML = '';\n  lines.forEach(function (msg) {\n    msg = ansiHTML(htmlEntities.encode(msg));\n    var div = document.createElement('div');\n    div.style.marginBottom = '26px';\n    div.innerHTML = problemType(type) + ' in ' + msg;\n    clientOverlay.appendChild(div);\n  });\n  if (document.body) {\n    document.body.appendChild(clientOverlay);\n  }\n}\n\nfunction clear() {\n  if (document.body && clientOverlay.parentNode) {\n    document.body.removeChild(clientOverlay);\n  }\n}\n\nfunction problemType(type) {\n  var problemColors = {\n    errors: colors.red,\n    warnings: colors.yellow,\n  };\n  var color = problemColors[type] || colors.red;\n  return (\n    '<span style=\"background-color:#' +\n    color +\n    '; color:#000000; padding:3px 6px; border-radius: 4px;\">' +\n    type.slice(0, -1).toUpperCase() +\n    '</span>'\n  );\n}\n\nmodule.exports = function (options) {\n  for (var color in options.ansiColors) {\n    if (color in colors) {\n      colors[color] = options.ansiColors[color];\n    }\n    ansiHTML.setColors(colors);\n  }\n\n  for (var style in options.overlayStyles) {\n    styles[style] = options.overlayStyles[style];\n  }\n\n  for (var key in styles) {\n    clientOverlay.style[key] = styles[key];\n  }\n\n  return {\n    showProblems: showProblems,\n    clear: clear,\n  };\n};\n\nmodule.exports.clear = clear;\nmodule.exports.showProblems = showProblems;\n\n\n//# sourceURL=webpack://contact_management_system/./node_modules/webpack-hot-middleware/client-overlay.js?");

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client.js?path=http://localhost:3001/static/__webpack_hmr":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/webpack-hot-middleware/client.js?path=http://localhost:3001/static/__webpack_hmr ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var __resourceQuery = \"?path=http://localhost:3001/static/__webpack_hmr\";\n/* module decorator */ module = __webpack_require__.nmd(module);\n/*eslint-env browser*/\n/*global __resourceQuery __webpack_public_path__*/\n\nvar options = {\n  path: '/__webpack_hmr',\n  timeout: 20 * 1000,\n  overlay: true,\n  reload: false,\n  log: true,\n  warn: true,\n  name: '',\n  autoConnect: true,\n  overlayStyles: {},\n  overlayWarnings: false,\n  ansiColors: {},\n};\nif (true) {\n  var overrides = Object.fromEntries(\n    new URLSearchParams(__resourceQuery.slice(1))\n  );\n  setOverrides(overrides);\n}\n\nif (typeof window === 'undefined') {\n  // do nothing\n} else if (typeof window.EventSource === 'undefined') {\n  console.warn(\n    \"webpack-hot-middleware's client requires EventSource to work. \" +\n      'You should include a polyfill if you want to support this browser: ' +\n      'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools'\n  );\n} else {\n  if (options.autoConnect) {\n    connect();\n  }\n}\n\n/* istanbul ignore next */\nfunction setOptionsAndConnect(overrides) {\n  setOverrides(overrides);\n  connect();\n}\n\nfunction setOverrides(overrides) {\n  if (overrides.autoConnect)\n    options.autoConnect = overrides.autoConnect == 'true';\n  if (overrides.path) options.path = overrides.path;\n  if (overrides.timeout) options.timeout = overrides.timeout;\n  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';\n  if (overrides.reload) options.reload = overrides.reload !== 'false';\n  if (overrides.noInfo && overrides.noInfo !== 'false') {\n    options.log = false;\n  }\n  if (overrides.name) {\n    options.name = overrides.name;\n  }\n  if (overrides.quiet && overrides.quiet !== 'false') {\n    options.log = false;\n    options.warn = false;\n  }\n\n  if (overrides.dynamicPublicPath) {\n    options.path = __webpack_require__.p + options.path;\n  }\n\n  if (overrides.ansiColors)\n    options.ansiColors = JSON.parse(overrides.ansiColors);\n  if (overrides.overlayStyles)\n    options.overlayStyles = JSON.parse(overrides.overlayStyles);\n\n  if (overrides.overlayWarnings) {\n    options.overlayWarnings = overrides.overlayWarnings == 'true';\n  }\n}\n\nfunction EventSourceWrapper() {\n  var source;\n  var lastActivity = new Date();\n  var listeners = [];\n\n  init();\n  var timer = setInterval(function () {\n    if (new Date() - lastActivity > options.timeout) {\n      handleDisconnect();\n    }\n  }, options.timeout / 2);\n\n  function init() {\n    source = new window.EventSource(options.path);\n    source.onopen = handleOnline;\n    source.onerror = handleDisconnect;\n    source.onmessage = handleMessage;\n  }\n\n  function handleOnline() {\n    if (options.log) console.log('[HMR] connected');\n    lastActivity = new Date();\n  }\n\n  function handleMessage(event) {\n    lastActivity = new Date();\n    for (var i = 0; i < listeners.length; i++) {\n      listeners[i](event);\n    }\n  }\n\n  function handleDisconnect() {\n    clearInterval(timer);\n    source.close();\n    setTimeout(init, options.timeout);\n  }\n\n  return {\n    addMessageListener: function (fn) {\n      listeners.push(fn);\n    },\n  };\n}\n\nfunction getEventSourceWrapper() {\n  if (!window.__whmEventSourceWrapper) {\n    window.__whmEventSourceWrapper = {};\n  }\n  if (!window.__whmEventSourceWrapper[options.path]) {\n    // cache the wrapper for other entries loaded on\n    // the same page with the same options.path\n    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();\n  }\n  return window.__whmEventSourceWrapper[options.path];\n}\n\nfunction connect() {\n  getEventSourceWrapper().addMessageListener(handleMessage);\n\n  function handleMessage(event) {\n    if (event.data == '\\uD83D\\uDC93') {\n      return;\n    }\n    try {\n      processMessage(JSON.parse(event.data));\n    } catch (ex) {\n      if (options.warn) {\n        console.warn('Invalid HMR message: ' + event.data + '\\n' + ex);\n      }\n    }\n  }\n}\n\n// the reporter needs to be a singleton on the page\n// in case the client is being used by multiple bundles\n// we only want to report once.\n// all the errors will go to all clients\nvar singletonKey = '__webpack_hot_middleware_reporter__';\nvar reporter;\nif (typeof window !== 'undefined') {\n  if (!window[singletonKey]) {\n    window[singletonKey] = createReporter();\n  }\n  reporter = window[singletonKey];\n}\n\nfunction createReporter() {\n  var strip = __webpack_require__(/*! strip-ansi */ \"./node_modules/strip-ansi/index.js\");\n\n  var overlay;\n  if (typeof document !== 'undefined' && options.overlay) {\n    overlay = __webpack_require__(/*! ./client-overlay */ \"./node_modules/webpack-hot-middleware/client-overlay.js\")({\n      ansiColors: options.ansiColors,\n      overlayStyles: options.overlayStyles,\n    });\n  }\n\n  var styles = {\n    errors: 'color: #ff0000;',\n    warnings: 'color: #999933;',\n  };\n  var previousProblems = null;\n  function log(type, obj) {\n    var newProblems = obj[type]\n      .map(function (msg) {\n        return strip(msg);\n      })\n      .join('\\n');\n    if (previousProblems == newProblems) {\n      return;\n    } else {\n      previousProblems = newProblems;\n    }\n\n    var style = styles[type];\n    var name = obj.name ? \"'\" + obj.name + \"' \" : '';\n    var title = '[HMR] bundle ' + name + 'has ' + obj[type].length + ' ' + type;\n    // NOTE: console.warn or console.error will print the stack trace\n    // which isn't helpful here, so using console.log to escape it.\n    if (console.group && console.groupEnd) {\n      console.group('%c' + title, style);\n      console.log('%c' + newProblems, style);\n      console.groupEnd();\n    } else {\n      console.log(\n        '%c' + title + '\\n\\t%c' + newProblems.replace(/\\n/g, '\\n\\t'),\n        style + 'font-weight: bold;',\n        style + 'font-weight: normal;'\n      );\n    }\n  }\n\n  return {\n    cleanProblemsCache: function () {\n      previousProblems = null;\n    },\n    problems: function (type, obj) {\n      if (options.warn) {\n        log(type, obj);\n      }\n      if (overlay) {\n        if (options.overlayWarnings || type === 'errors') {\n          overlay.showProblems(type, obj[type]);\n          return false;\n        }\n        overlay.clear();\n      }\n      return true;\n    },\n    success: function () {\n      if (overlay) overlay.clear();\n    },\n    useCustomOverlay: function (customOverlay) {\n      overlay = customOverlay;\n    },\n  };\n}\n\nvar processUpdate = __webpack_require__(/*! ./process-update */ \"./node_modules/webpack-hot-middleware/process-update.js\");\n\nvar customHandler;\nvar subscribeAllHandler;\nfunction processMessage(obj) {\n  switch (obj.action) {\n    case 'building':\n      if (options.log) {\n        console.log(\n          '[HMR] bundle ' +\n            (obj.name ? \"'\" + obj.name + \"' \" : '') +\n            'rebuilding'\n        );\n      }\n      break;\n    case 'built':\n      if (options.log) {\n        console.log(\n          '[HMR] bundle ' +\n            (obj.name ? \"'\" + obj.name + \"' \" : '') +\n            'rebuilt in ' +\n            obj.time +\n            'ms'\n        );\n      }\n    // fall through\n    case 'sync':\n      if (obj.name && options.name && obj.name !== options.name) {\n        return;\n      }\n      var applyUpdate = true;\n      if (obj.errors.length > 0) {\n        if (reporter) reporter.problems('errors', obj);\n        applyUpdate = false;\n      } else if (obj.warnings.length > 0) {\n        if (reporter) {\n          var overlayShown = reporter.problems('warnings', obj);\n          applyUpdate = overlayShown;\n        }\n      } else {\n        if (reporter) {\n          reporter.cleanProblemsCache();\n          reporter.success();\n        }\n      }\n      if (applyUpdate) {\n        processUpdate(obj.hash, obj.modules, options);\n      }\n      break;\n    default:\n      if (customHandler) {\n        customHandler(obj);\n      }\n  }\n\n  if (subscribeAllHandler) {\n    subscribeAllHandler(obj);\n  }\n}\n\nif (module) {\n  module.exports = {\n    subscribeAll: function subscribeAll(handler) {\n      subscribeAllHandler = handler;\n    },\n    subscribe: function subscribe(handler) {\n      customHandler = handler;\n    },\n    useCustomOverlay: function useCustomOverlay(customOverlay) {\n      if (reporter) reporter.useCustomOverlay(customOverlay);\n    },\n    setOptionsAndConnect: setOptionsAndConnect,\n  };\n}\n\n\n//# sourceURL=webpack://contact_management_system/./node_modules/webpack-hot-middleware/client.js?");

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/process-update.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-hot-middleware/process-update.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * Based heavily on https://github.com/webpack/webpack/blob/\n *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js\n * Original copyright Tobias Koppers @sokra (MIT license)\n */\n\n/* global window __webpack_hash__ */\n\nif (false) {}\n\nvar hmrDocsUrl = 'https://webpack.js.org/concepts/hot-module-replacement/'; // eslint-disable-line max-len\n\nvar lastHash;\nvar failureStatuses = { abort: 1, fail: 1 };\nvar applyOptions = {\n  ignoreUnaccepted: true,\n  ignoreDeclined: true,\n  ignoreErrored: true,\n  onUnaccepted: function (data) {\n    console.warn(\n      'Ignored an update to unaccepted module ' + data.chain.join(' -> ')\n    );\n  },\n  onDeclined: function (data) {\n    console.warn(\n      'Ignored an update to declined module ' + data.chain.join(' -> ')\n    );\n  },\n  onErrored: function (data) {\n    console.error(data.error);\n    console.warn(\n      'Ignored an error while updating module ' +\n        data.moduleId +\n        ' (' +\n        data.type +\n        ')'\n    );\n  },\n};\n\nfunction upToDate(hash) {\n  if (hash) lastHash = hash;\n  return lastHash == __webpack_require__.h();\n}\n\nmodule.exports = function (hash, moduleMap, options) {\n  var reload = options.reload;\n  if (!upToDate(hash) && module.hot.status() == 'idle') {\n    if (options.log) console.log('[HMR] Checking for updates on the server...');\n    check();\n  }\n\n  function check() {\n    var cb = function (err, updatedModules) {\n      if (err) return handleError(err);\n\n      if (!updatedModules) {\n        if (options.warn) {\n          console.warn('[HMR] Cannot find update (Full reload needed)');\n          console.warn('[HMR] (Probably because of restarting the server)');\n        }\n        performReload();\n        return null;\n      }\n\n      var applyCallback = function (applyErr, renewedModules) {\n        if (applyErr) return handleError(applyErr);\n\n        if (!upToDate()) check();\n\n        logUpdates(updatedModules, renewedModules);\n      };\n\n      var applyResult = module.hot.apply(applyOptions, applyCallback);\n      // webpack 2 promise\n      if (applyResult && applyResult.then) {\n        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`\n        applyResult.then(function (outdatedModules) {\n          applyCallback(null, outdatedModules);\n        });\n        applyResult.catch(applyCallback);\n      }\n    };\n\n    var result = module.hot.check(false, cb);\n    // webpack 2 promise\n    if (result && result.then) {\n      result.then(function (updatedModules) {\n        cb(null, updatedModules);\n      });\n      result.catch(cb);\n    }\n  }\n\n  function logUpdates(updatedModules, renewedModules) {\n    var unacceptedModules = updatedModules.filter(function (moduleId) {\n      return renewedModules && renewedModules.indexOf(moduleId) < 0;\n    });\n\n    if (unacceptedModules.length > 0) {\n      if (options.warn) {\n        console.warn(\n          \"[HMR] The following modules couldn't be hot updated: \" +\n            '(Full reload needed)\\n' +\n            'This is usually because the modules which have changed ' +\n            '(and their parents) do not know how to hot reload themselves. ' +\n            'See ' +\n            hmrDocsUrl +\n            ' for more details.'\n        );\n        unacceptedModules.forEach(function (moduleId) {\n          console.warn('[HMR]  - ' + (moduleMap[moduleId] || moduleId));\n        });\n      }\n      performReload();\n      return;\n    }\n\n    if (options.log) {\n      if (!renewedModules || renewedModules.length === 0) {\n        console.log('[HMR] Nothing hot updated.');\n      } else {\n        console.log('[HMR] Updated modules:');\n        renewedModules.forEach(function (moduleId) {\n          console.log('[HMR]  - ' + (moduleMap[moduleId] || moduleId));\n        });\n      }\n\n      if (upToDate()) {\n        console.log('[HMR] App is up to date.');\n      }\n    }\n  }\n\n  function handleError(err) {\n    if (module.hot.status() in failureStatuses) {\n      if (options.warn) {\n        console.warn('[HMR] Cannot check for update (Full reload needed)');\n        console.warn('[HMR] ' + (err.stack || err.message));\n      }\n      performReload();\n      return;\n    }\n    if (options.warn) {\n      console.warn('[HMR] Update check failed: ' + (err.stack || err.message));\n    }\n  }\n\n  function performReload() {\n    if (reload) {\n      if (options.warn) console.warn('[HMR] Reloading page');\n      window.location.reload();\n    }\n  }\n};\n\n\n//# sourceURL=webpack://contact_management_system/./node_modules/webpack-hot-middleware/process-update.js?");

/***/ }),

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ \"./src/client/styles/main.scss\");\n/* harmony import */ var _js_views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/views */ \"./src/client/js/views.js\");\n\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/index.js?");

/***/ }),

/***/ "./src/client/js/api/userAuthorization.js":
/*!************************************************!*\
  !*** ./src/client/js/api/userAuthorization.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"userAuthorization\": () => (/* binding */ userAuthorization),\n/* harmony export */   \"userLogout\": () => (/* binding */ userLogout)\n/* harmony export */ });\nasync function userAuthorization(formData, url) {\r\n\tconst response = await fetch(`${url}`, {\r\n\t\tmethod: 'POST',\r\n\t\theaders: {\r\n\t\t\t'Content-Type': 'application/json',\r\n\t\t},\r\n\t\tbody: JSON.stringify(formData),\r\n\t});\r\n\r\n\tconst data = await response.json();\r\n\r\n\tif (!response.ok) {\r\n\t\tthrow new Error(data.message);\r\n\t}\r\n\r\n\tconst {token, ...userData} = data;\r\n\tlocalStorage.setItem('token', JSON.stringify(data.token));\r\n\r\n\treturn userData;\r\n}\r\n\r\nasync function userLogout() {\r\n\tconst token = JSON.parse(localStorage.getItem('token'));\r\n\tconst response = await fetch('/logout', {\r\n\t\tmethod: 'GET',\r\n\t\theaders: {\r\n\t\t\t'Content-Type': 'application/json',\r\n\t\t\tAuthorization: `Bearer ${token}`,\r\n\t\t},\r\n\t});\r\n\tif (response.ok) {\r\n\t\t['token', 'user'].forEach((key) => {\r\n\t\t\tlocalStorage.removeItem(key);\r\n\t\t});\r\n\t\tlocation.reload();\r\n\t}\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/api/userAuthorization.js?");

/***/ }),

/***/ "./src/client/js/classes/TabindexController.js":
/*!*****************************************************!*\
  !*** ./src/client/js/classes/TabindexController.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TabindexController\": () => (/* binding */ TabindexController)\n/* harmony export */ });\nclass TabindexController {\r\n\tinteractiveSelectors = 'a, button, input, textarea, [tabindex]';\r\n\r\n\tblockElementsList = [];\r\n\r\n\tconstructor(parentBlock) {\r\n\t\tthis.parrentBlock = parentBlock;\r\n\t}\r\n\r\n\tremoveFocus(currentBlock) {\r\n\t\tconst elements = this.parrentBlock.querySelectorAll(this.interactiveSelectors);\r\n\t\telements.forEach((el) => {\r\n\t\t\tconst tabIndex = el.getAttribute('tabindex');\r\n\t\t\tif (!currentBlock.contains(el)) {\r\n\t\t\t\tif (!tabIndex || tabIndex !== '-1') {\r\n\t\t\t\t\tel.setAttribute('tabindex', '-1');\r\n\t\t\t\t\tthis.blockElementsList.push(el);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t});\r\n\t}\r\n\r\n\treturnFocus() {\r\n\t\twhile (this.blockElementsList.length !== 0) {\r\n\t\t\tconst element = this.blockElementsList.pop();\r\n\t\t\tif (element.tagName.match(/a|button|input|textarea/i)) {\r\n\t\t\t\telement.removeAttribute('tabindex');\r\n\t\t\t} else {\r\n\t\t\t\telement.setAttribute('tabindex', '0');\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/classes/TabindexController.js?");

/***/ }),

/***/ "./src/client/js/components/authorization/createLoginForm.js":
/*!*******************************************************************!*\
  !*** ./src/client/js/components/authorization/createLoginForm.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createLoginForm\": () => (/* binding */ createLoginForm)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n\r\n\r\nfunction createLoginForm() {\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('form.form.form_auth', { name: 'login', hidden: false, novalidate: true }, [\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('h2.form__title', 'Форма входа'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('button.btn_toggle', { type: 'button' }, 'Зарегистрироваться'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('div.form__field.field', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('input.email', { type: 'text', name: 'email', autoComplete: 'off', 'data-valid': 'email', required: true }),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('label', 'Введите E-mail'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('small')\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('div.form__field.field', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('input.password', { type: 'password', name: 'password', autoComplete: 'off', 'data-valid': 'password', required: true }),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('label', 'Введите пароль'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('small')\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('button.btn.btn_auth', { type: 'submit' }, 'Отправить'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('p.error-message')\r\n\t]);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/authorization/createLoginForm.js?");

/***/ }),

/***/ "./src/client/js/components/authorization/createLogoutBtn.js":
/*!*******************************************************************!*\
  !*** ./src/client/js/components/authorization/createLogoutBtn.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createLogoutBtn\": () => (/* binding */ createLogoutBtn)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n/* harmony import */ var _api_userAuthorization_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/userAuthorization.js */ \"./src/client/js/api/userAuthorization.js\");\n\r\n\r\n\r\nfunction createLogoutBtn() {\r\n\tconst btn = (0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('button.logout-btn', { type: 'button' }, 'Выйти');\r\n\r\n\tbtn.addEventListener('click', _api_userAuthorization_js__WEBPACK_IMPORTED_MODULE_0__.userLogout);\r\n\r\n\treturn btn;\r\n};\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/authorization/createLogoutBtn.js?");

/***/ }),

/***/ "./src/client/js/components/authorization/createSignupForm.js":
/*!********************************************************************!*\
  !*** ./src/client/js/components/authorization/createSignupForm.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createSignupForm\": () => (/* binding */ createSignupForm)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n\r\n\r\nfunction createSignupForm() {\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('form.form.form_auth', { name: 'signup', hidden: true, novalidate: true }, [\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('h2.form__title', 'Форма регистрации'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('button.btn_toggle', { type: 'button' }, 'Войти'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('div.form__field.field', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('input.username', { type: 'text', name: 'username', autoComplete: 'off', 'data-valid': 'text', required: true  }),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('label', 'Введите имя'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('small')\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('div.form__field.field', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('input.email', { type: 'text', name: 'email', autoComplete: 'off', 'data-valid': 'email', required: true  }),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('label', 'Введите E-mail'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('small')\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('div.form__field.field', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('input.password', { type: 'password', name: 'password', autoComplete: 'off', 'data-valid': 'password', required: true  }),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('label', 'Введите пароль'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('small')\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('div.form__field.field', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('input.confirm-password', { type: 'password', name: 'confirm-password', autoComplete: 'off', 'data-valid': 'password', required: true  }),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('label', 'Повторите ввод пароля'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('small')\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('button.btn.btn_auth', { type: 'submit' }, 'Отправить'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('p.error-message')\r\n\t]);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/authorization/createSignupForm.js?");

/***/ }),

/***/ "./src/client/js/components/contentTable/createClientItem.js":
/*!*******************************************************************!*\
  !*** ./src/client/js/components/contentTable/createClientItem.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createClientItem\": () => (/* binding */ createClientItem)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n\r\n\r\nfunction modifiedData(str) {\r\n\tconst dateArr = str.split('T');\r\n\tconst date = dateArr[0].split('-').reverse().join('.');\r\n\tconst time = dateArr[1].split(':').slice(0, 2).join(':');\r\n\treturn {date, time};\r\n}\r\n\r\n// eslint-disable-next-line import/prefer-default-export\r\nfunction createClientItem(data) {\r\n\r\n\tconst dateCreate = modifiedData(data.createdAt);\r\n\tconst dateUpdate = modifiedData(data.updatedAt);\r\n\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('tr.clients-list__row', [\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('td.clients-list__item', `${data.clientId}`),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('td.clients-list__item', `${data.fullName}`),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('td.clients-list__item', `${dateCreate.date}`, (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('span', `${dateCreate.time}`)),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('td.clients-list__item', `${dateUpdate.date}`, (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('span', `${dateUpdate.time}`)),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('td.clients-list__item', `${data.contacts.toString()}`),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('td.clients-list__item', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('button.clients-list__edit-client', 'Изменить'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('button.clients-list__remove-client', 'Удалить'),\r\n\t\t]),\r\n\t])\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/contentTable/createClientItem.js?");

/***/ }),

/***/ "./src/client/js/components/contentTable/createClientsList.js":
/*!********************************************************************!*\
  !*** ./src/client/js/components/contentTable/createClientsList.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createClientsList\": () => (/* binding */ createClientsList)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n/* harmony import */ var _createClientItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createClientItem.js */ \"./src/client/js/components/contentTable/createClientItem.js\");\n/* harmony import */ var _createTableMessage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createTableMessage.js */ \"./src/client/js/components/contentTable/createTableMessage.js\");\n/* harmony import */ var _createTableErrorMsg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createTableErrorMsg.js */ \"./src/client/js/components/contentTable/createTableErrorMsg.js\");\n\r\n\r\n\r\n\r\n\r\nfunction createClientsList() {\r\n\tconst token = JSON.parse(localStorage.getItem('token'));\r\n\tconst table = (0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('table.clients-list');\r\n\tconst thead = (0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('thead.clients-list__head');\r\n\tconst tBody = (0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('tBody.clients-list__body.isLoading');\r\n\tconst headRow = (0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('tr.clients-list__row');\r\n\r\n\tconst dataTitle = [\r\n\t\t'ID',\r\n\t\t'Фамилия Имя Отчество',\r\n\t\t'Дата и время создания',\r\n\t\t'Последние изменения',\r\n\t\t'Контакты',\r\n\t\t'Действия',\r\n\t];\r\n\r\n\tdataTitle.forEach((title, index) => {\r\n\t\tconst headData = (0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('th.clients-list__data-head');\r\n\t\tlet filterBtn = null;\r\n\t\tindex <= 3 ? (filterBtn = (0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('button')) : (filterBtn = (0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('span'));\r\n\t\tfilterBtn.textContent = title;\r\n\t\tif (index === 0) {\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_3__.setAttr)(filterBtn, {className: 'active'});\r\n\t\t}\r\n\t\theadData.append(filterBtn);\r\n\t\theadRow.append(headData);\r\n\t});\r\n\r\n\ttable.addEventListener('click', (e) => {\r\n\t\tconst {target} = e;\r\n\t\tif (target.nodeName !== 'BUTTON') return;\r\n\t\tthead.querySelectorAll('button').forEach((btn) => {\r\n\t\t\tbtn.classList.remove('active');\r\n\t\t});\r\n\t\ttarget.classList.add('active');\r\n\t});\r\n\r\n\tfetch('/clients', {\r\n\t\tmethod: 'GET',\r\n\t\theaders: {\r\n\t\t\t'Content-Type': 'application/json',\r\n\t\t\tAuthorization: `Bearer ${token}`,\r\n\t\t},\r\n\t})\r\n\t\t.then((res) => {\r\n\t\t\tif (res.status !== 201) {\r\n\t\t\t\tthrow new Error('Server Error');\r\n\t\t\t} else {\r\n\t\t\t\treturn res.json();\r\n\t\t\t}\r\n\t\t})\r\n\t\t.then((data) => {\r\n\t\t\tif (!data.length) {\r\n\t\t\t\ttBody.append((0,_createTableMessage_js__WEBPACK_IMPORTED_MODULE_1__.createTableMessage)());\r\n\t\t\t}\r\n\t\t\tdata.forEach((clientData) => {\r\n\t\t\t\ttBody.append((0,_createClientItem_js__WEBPACK_IMPORTED_MODULE_0__.createClientItem)(clientData));\r\n\t\t\t});\r\n\t\t\ttBody.classList.remove('isLoading');\r\n\t\t})\r\n\t\t.catch((err) => {\r\n\t\t\ttBody.append((0,_createTableErrorMsg_js__WEBPACK_IMPORTED_MODULE_2__.createTableErrorMsg)(err));\r\n\t\t\ttBody.classList.remove('isLoading');\r\n\t\t});\r\n\r\n\tthead.append(headRow);\r\n\ttable.append(thead, tBody);\r\n\treturn {table, tBody};\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/contentTable/createClientsList.js?");

/***/ }),

/***/ "./src/client/js/components/contentTable/createTableErrorMsg.js":
/*!**********************************************************************!*\
  !*** ./src/client/js/components/contentTable/createTableErrorMsg.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createTableErrorMsg\": () => (/* binding */ createTableErrorMsg)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n\r\n\r\nfunction createTableErrorMsg(msg) {\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('p.table-error-msg', `${msg}`)\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/contentTable/createTableErrorMsg.js?");

/***/ }),

/***/ "./src/client/js/components/contentTable/createTableMessage.js":
/*!*********************************************************************!*\
  !*** ./src/client/js/components/contentTable/createTableMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createTableMessage\": () => (/* binding */ createTableMessage)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n\r\n\r\nfunction createTableMessage () {\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('p.table-message', 'Клиентов не найдено! Самое время добавить нового клиента.', [\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('span'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('span'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('span'),\r\n\t]);\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/contentTable/createTableMessage.js?");

/***/ }),

/***/ "./src/client/js/components/createAddButton.js":
/*!*****************************************************!*\
  !*** ./src/client/js/components/createAddButton.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createAddButton\": () => (/* binding */ createAddButton)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n\r\n\r\nfunction createAddButton() {\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('button.add-button.main__btn', { 'data-action': 'add' }, 'Добавить клиента');\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/createAddButton.js?");

/***/ }),

/***/ "./src/client/js/components/createHeader.js":
/*!**************************************************!*\
  !*** ./src/client/js/components/createHeader.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createHeader\": () => (/* binding */ createHeader)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n/* harmony import */ var _svgLogo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svgLogo.js */ \"./src/client/js/components/svgLogo.js\");\n/* harmony import */ var _createThemeSwitch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createThemeSwitch */ \"./src/client/js/components/createThemeSwitch.js\");\n\r\n\r\n\r\n\r\nfunction createHeader() {\r\n\tconst themeSwitch = (0,_createThemeSwitch__WEBPACK_IMPORTED_MODULE_1__.createThemeSwitch)();\r\n\tconst header = (0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('header.header');\r\n\r\n\tconst logo = (0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('.header__logo');\r\n\tlogo.innerHTML = (0,_svgLogo_js__WEBPACK_IMPORTED_MODULE_0__.svgLogo)();\r\n\r\n\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.setChildren)(header, [logo, themeSwitch]);\r\n\r\n\treturn {header, themeSwitch};\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/createHeader.js?");

/***/ }),

/***/ "./src/client/js/components/createSearchInput.js":
/*!*******************************************************!*\
  !*** ./src/client/js/components/createSearchInput.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createSearchInput\": () => (/* binding */ createSearchInput)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n\r\n\r\nfunction createSearchInput() {\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('input.header__input-search', { type: 'text', placeholder: 'Введите запрос' });\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/createSearchInput.js?");

/***/ }),

/***/ "./src/client/js/components/createThemeSwitch.js":
/*!*******************************************************!*\
  !*** ./src/client/js/components/createThemeSwitch.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createThemeSwitch\": () => (/* binding */ createThemeSwitch)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n\r\n\r\nfunction createThemeSwitch() {\r\n\tconst currentTheme = localStorage.getItem('theme');\r\n\r\n\tif (currentTheme) {\r\n\t\tdocument.documentElement.setAttribute('data-theme', currentTheme);\r\n\t}\r\n\r\n\tfunction switchTheme(input) {\r\n\t\tif (input.checked) {\r\n\t\t\tdocument.documentElement.setAttribute('data-theme', 'dark');\r\n\t\t\tlocalStorage.setItem('theme', 'dark');\r\n\t\t} else {\r\n\t\t\tdocument.documentElement.setAttribute('data-theme', 'light');\r\n\t\t\tlocalStorage.setItem('theme', 'light');\r\n\t\t}\r\n\t}\r\n\r\n\tfunction isCheckedByKey(switchLabel) {\r\n\t\tswitchLabel.addEventListener('keydown', (e) => {\r\n\t\t\tconst input = switchLabel.children[0];\r\n\t\t\tif (e.code === 'Enter') {\r\n\t\t\t\tinput.checked = !input.checked;\r\n\t\t\t\tswitchTheme(input);\r\n\t\t\t}\r\n\t\t});\r\n\t}\r\n\r\n\tfunction isChecked(input) {\r\n\t\tif (currentTheme === 'dark') {\r\n\t\t\tinput.checked = true; // eslint-disable-line no-param-reassign\r\n\t\t}\r\n\t\tinput.addEventListener('change', switchTheme.bind(null, input));\r\n\t}\r\n\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)(\r\n\t\t'.theme-switch-wrapper',\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('label.theme-switch', isCheckedByKey, { for: 'checkbox', tabindex: '0' }, [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('input#checkbox', isChecked, { type: 'checkbox' }),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('span.round'),\r\n\t\t]),\r\n\t);\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/createThemeSwitch.js?");

/***/ }),

/***/ "./src/client/js/components/createTitle.js":
/*!*************************************************!*\
  !*** ./src/client/js/components/createTitle.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createTitle\": () => (/* binding */ createTitle)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n\r\n\r\nfunction createTitle() {\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_0__.el)('h1.main__title', {}, 'Клиенты');\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/createTitle.js?");

/***/ }),

/***/ "./src/client/js/components/custom-select/createContactSelect.js":
/*!***********************************************************************!*\
  !*** ./src/client/js/components/custom-select/createContactSelect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"closingSelectOptions\": () => (/* binding */ closingSelectOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"selectActions\": () => (/* binding */ selectActions)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n/* harmony import */ var _pop_up_createAddOtherContactForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pop-up/createAddOtherContactForm.js */ \"./src/client/js/components/pop-up/createAddOtherContactForm.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/client/js/utils/index.js\");\n\r\n\r\n\r\n\r\nconst options = {\r\n\tphone: {\r\n\t\ttext: 'Телефон',\r\n\t\tvalid: 'phone',\r\n\t\tlabel: '+x (xxx) xxx-xx-xx'\r\n\t},\r\n\textPhone: {\r\n\t\ttext: 'Доп. телефон',\r\n\t\tvalid: 'phone',\r\n\t\tlabel: '+x (xxx) xxx-xx-xx'\r\n\t},\r\n\temail: {\r\n\t\ttext:  'Email',\r\n\t\tvalid: 'email',\r\n\t\tlabel: 'Введите Ваш е-mail'\r\n\t},\r\n\tfacebook: {\r\n\t\ttext:  'Facebook',\r\n\t\tvalid: 'link',\r\n\t\tlabel: 'Ex.: https://facebook.com'\r\n\t},\r\n\tvk: {\r\n\t\ttext:  'Vkontakte',\r\n\t\tvalid: 'link',\r\n\t\tlabel: 'Ex.: https://vk.com'\r\n\t},\r\n\tother: {\r\n\t\ttext:  'Другое',\r\n\t\tvalid: 'link',\r\n\t\tlabel: ''\r\n\t},\r\n};\r\n\r\n// Closing select-options by click anywhere\r\nfunction closingSelectOptions(event) {\r\n\tconst customSelects = document.querySelectorAll('.custom-select');\r\n\tif (customSelects.length > 0) {\r\n\t\tcustomSelects.forEach((select) => {\r\n\t\t\tif (!select.contains(event.target)) {\r\n\t\t\t\tselect.classList.remove('active');\r\n\t\t\t}\r\n\t\t});\r\n\t}\r\n}\r\n\r\ndocument.addEventListener('click', closingSelectOptions);\r\n\r\n// Select options action\r\nlet count = 0;\r\n\r\nfunction selectActions(event) {\r\n\tconst { target, code, type } = event;\r\n\tconst btn = this.querySelector('.custom-select__button');\r\n\tconst selectInput = this.querySelector('.custom-select__input');\r\n\tconst itemsList = this.querySelector('.custom-select__list');\r\n\tconst items = this.querySelectorAll('.custom-select__list-item');\r\n\tconst input = this.nextSibling.firstElementChild;\r\n\tconst label = this.nextSibling.querySelector('label');\r\n\r\n\tif (type === 'click' && target === btn) {\r\n\t\tthis.classList.toggle('active');\r\n\t}\r\n\r\n\t// Closing select-options by press key 'Escape' or 'Tab'\r\n\tif (code === 'Tab' || code === 'Escape') {\r\n\t\tthis.classList.remove('active');\r\n\t\tcount = 0;\r\n\t}\r\n\r\n\t// Selecting options by arrow keys\r\n\tif (this.closest('.active')) {\r\n\t\tif (code === 'ArrowDown') {\r\n\t\t\t++count;\r\n\t\t\tif (count === items.length + 1) count = 1;\r\n\t\t}\r\n\t\tif (code === 'ArrowUp') {\r\n\t\t\t--count;\r\n\t\t\tif (count < 1) count = items.length;\r\n\t\t}\r\n\t\tcount > 0 && items[count - 1].focus();\r\n\t}\r\n\r\n\t// Selected options\r\n\tif (\r\n\t\t((code === 'Enter' && itemsList.contains(target)) ||\r\n\t\t\t(target.closest('.custom-select__list-item') && type === 'click')) &&\r\n\t\ttarget.dataset.value !== 'other'\r\n\t) {\r\n\t\tinput.value = '';\r\n\t\t// input.nextElementSibling.hidden = true;\r\n\t\tbtn.textContent = target.textContent;\r\n\t\tselectInput.value = target.textContent;\r\n\t\tinput.name = target.dataset.value;\r\n\t\tinput.dataset.valid = options[target.dataset.value].valid;\r\n\t\tlabel.textContent = options[target.dataset.value].label;\r\n\t\tthis.classList.remove('active');\r\n\t\t(0,_utils__WEBPACK_IMPORTED_MODULE_1__.focusedElement)(input);\r\n\t\tcount = 0;\r\n\t}\r\n\r\n\tif (target.dataset.value === 'other' && (code === 'Enter' || code === 'Space' || type === 'click')) {\r\n\t\tconst form = document.querySelector('.form_clients');\r\n\t\tthis.classList.remove('active');\r\n\t\tconst contactField = target.closest('.contact-field');\r\n\t\tcontactField.append((0,_pop_up_createAddOtherContactForm_js__WEBPACK_IMPORTED_MODULE_0__.createAddOtherContactForm)(form));\r\n\t}\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\r\n\tconst select = (0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('div.custom-select', [\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('button.custom-select__button', (btn) => (0,_utils__WEBPACK_IMPORTED_MODULE_1__.focusedElement)(btn), { type: 'button' }, 'Телефон'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('ul.custom-select__list', [\r\n\t\t\tObject.entries(options).map(([val, text], index) =>\r\n\t\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)(\r\n\t\t\t\t\tindex === 0 ? 'li.custom-select__list-item.selected' : 'li.custom-select__list-item',\r\n\t\t\t\t\t{ 'data-value': val, tabindex: '0' },\r\n\t\t\t\t\ttext.text,\r\n\t\t\t\t),\r\n\t\t\t),\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('input.custom-select__input', {type: 'hidden', name: 'select', value: 'Телефон' })\r\n\t]);\r\n\r\n\tselect.addEventListener('click', selectActions);\r\n\tselect.addEventListener('keydown', selectActions);\r\n\r\n\treturn select;\r\n});\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/custom-select/createContactSelect.js?");

/***/ }),

/***/ "./src/client/js/components/index.js":
/*!*******************************************!*\
  !*** ./src/client/js/components/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createAddButton\": () => (/* reexport safe */ _createAddButton_js__WEBPACK_IMPORTED_MODULE_4__.createAddButton),\n/* harmony export */   \"createClientsList\": () => (/* reexport safe */ _contentTable_createClientsList_js__WEBPACK_IMPORTED_MODULE_8__.createClientsList),\n/* harmony export */   \"createHeader\": () => (/* reexport safe */ _createHeader_js__WEBPACK_IMPORTED_MODULE_0__.createHeader),\n/* harmony export */   \"createLoginForm\": () => (/* reexport safe */ _authorization_createLoginForm_js__WEBPACK_IMPORTED_MODULE_5__.createLoginForm),\n/* harmony export */   \"createLogoutBtn\": () => (/* reexport safe */ _authorization_createLogoutBtn_js__WEBPACK_IMPORTED_MODULE_7__.createLogoutBtn),\n/* harmony export */   \"createPopUp\": () => (/* reexport safe */ _pop_up_createPopUp_js__WEBPACK_IMPORTED_MODULE_9__.createPopUp),\n/* harmony export */   \"createSearchInput\": () => (/* reexport safe */ _createSearchInput_js__WEBPACK_IMPORTED_MODULE_2__.createSearchInput),\n/* harmony export */   \"createSignupForm\": () => (/* reexport safe */ _authorization_createSignupForm_js__WEBPACK_IMPORTED_MODULE_6__.createSignupForm),\n/* harmony export */   \"createTitle\": () => (/* reexport safe */ _createTitle_js__WEBPACK_IMPORTED_MODULE_3__.createTitle),\n/* harmony export */   \"svgLogo\": () => (/* reexport safe */ _svgLogo_js__WEBPACK_IMPORTED_MODULE_1__.svgLogo)\n/* harmony export */ });\n/* harmony import */ var _createHeader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createHeader.js */ \"./src/client/js/components/createHeader.js\");\n/* harmony import */ var _svgLogo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svgLogo.js */ \"./src/client/js/components/svgLogo.js\");\n/* harmony import */ var _createSearchInput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createSearchInput.js */ \"./src/client/js/components/createSearchInput.js\");\n/* harmony import */ var _createTitle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createTitle.js */ \"./src/client/js/components/createTitle.js\");\n/* harmony import */ var _createAddButton_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createAddButton.js */ \"./src/client/js/components/createAddButton.js\");\n/* harmony import */ var _authorization_createLoginForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./authorization/createLoginForm.js */ \"./src/client/js/components/authorization/createLoginForm.js\");\n/* harmony import */ var _authorization_createSignupForm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./authorization/createSignupForm.js */ \"./src/client/js/components/authorization/createSignupForm.js\");\n/* harmony import */ var _authorization_createLogoutBtn_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./authorization/createLogoutBtn.js */ \"./src/client/js/components/authorization/createLogoutBtn.js\");\n/* harmony import */ var _contentTable_createClientsList_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contentTable/createClientsList.js */ \"./src/client/js/components/contentTable/createClientsList.js\");\n/* harmony import */ var _pop_up_createPopUp_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pop-up/createPopUp.js */ \"./src/client/js/components/pop-up/createPopUp.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/index.js?");

/***/ }),

/***/ "./src/client/js/components/pop-up/createAddOtherContactForm.js":
/*!**********************************************************************!*\
  !*** ./src/client/js/components/pop-up/createAddOtherContactForm.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createAddOtherContactForm\": () => (/* binding */ createAddOtherContactForm),\n/* harmony export */   \"formOtherListener\": () => (/* binding */ formOtherListener)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/index.js */ \"./src/client/js/utils/index.js\");\n/* harmony import */ var _classes_TabindexController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/TabindexController.js */ \"./src/client/js/classes/TabindexController.js\");\n\r\n\r\n\r\n\r\nfunction removeAddOtherContactForm(element, addOtherTabindexController) {\r\n\taddOtherTabindexController.returnFocus();\r\n\telement.remove();\r\n\telement.removeEventListener('click', formOtherListener); // eslint-disable-line no-use-before-define\r\n\telement.removeEventListener('keydown', formOtherListener); // eslint-disable-line no-use-before-define\r\n}\r\n\r\nfunction formOtherListener([addOtherTabindexController], event) {\r\n\tconst { type, target, code } = event;\r\n\r\n\tconst contactField = target.closest('.contact-field');\r\n\tconst selectBtn = contactField.querySelector('.custom-select__button');\r\n\tconst selectInput = contactField.querySelector('.custom-select__input');\r\n\r\n\tif ((target.dataset.closeOther && type !== 'keydown') || code === 'Escape') {\r\n\t\tremoveAddOtherContactForm(this, addOtherTabindexController);\r\n\t\t(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.focusedElement)(selectBtn);\r\n\t}\r\n\r\n\tif (\r\n\t\t(target.closest('.add-other__submit') && type !== 'keydown') ||\r\n\t\t(code === 'Enter' && !target.dataset.closeOther)\r\n\t) {\r\n\t\tconst inputSocialName = contactField.querySelector('input[name=socialName]');\r\n\t\tconst inputSocialLink = contactField.querySelector('input[name=socialLink]');\r\n\t\tconst contactInput = contactField.querySelector('.contact-field__input');\r\n\r\n\t\tselectBtn.textContent = inputSocialName.value;\r\n\t\tselectInput.value = inputSocialName.value;\r\n\t\tcontactInput.value = inputSocialLink.value;\r\n\t\tcontactInput.nextElementSibling.hidden = false;\r\n\t\tcontactInput.name = 'other';\r\n\r\n\t\tremoveAddOtherContactForm(this, addOtherTabindexController);\r\n\t}\r\n}\r\n\r\nfunction createAddOtherContactForm(form) {\r\n\tconst addOtherTabindexController = new _classes_TabindexController_js__WEBPACK_IMPORTED_MODULE_1__.TabindexController(form);\r\n\tconst addOther = (0,redom__WEBPACK_IMPORTED_MODULE_2__.el)(\r\n\t\t'.add-other',\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('.add-other__wrapper', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('.add-other__inputs-group', [\r\n\t\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('input', (input) => (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.focusedElement)(input), {\r\n\t\t\t\t\ttype: 'text',\r\n\t\t\t\t\tname: 'socialName',\r\n\t\t\t\t\tplaceholder: 'Название соц.сети',\r\n\t\t\t\t}),\r\n\t\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('input', { type: 'text', name: 'socialLink', placeholder: 'Ссылка на соц.сеть' }),\r\n\t\t\t]),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('.add-other__btn-group', [\r\n\t\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('button.add-other__submit', { type: 'button' }, 'Добавить'),\r\n\t\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('button', { type: 'button', 'data-close-other': '1' }, 'Отменить'),\r\n\t\t\t]),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_2__.el)('button.add-other__close', { 'data-close-other': '1', type: 'button' }),\r\n\t\t]),\r\n\t);\r\n\taddOtherTabindexController.removeFocus(addOther);\r\n\taddOther.addEventListener('click', formOtherListener.bind(addOther, [addOtherTabindexController]));\r\n\taddOther.addEventListener('keydown', formOtherListener.bind(addOther, [addOtherTabindexController]));\r\n\treturn addOther;\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/pop-up/createAddOtherContactForm.js?");

/***/ }),

/***/ "./src/client/js/components/pop-up/createContactInput.js":
/*!***************************************************************!*\
  !*** ./src/client/js/components/pop-up/createContactInput.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n/* harmony import */ var _custom_select_createContactSelect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../custom-select/createContactSelect.js */ \"./src/client/js/components/custom-select/createContactSelect.js\");\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((target) => {\r\n\tconst contactsBlock = target.closest('.add-contact');\r\n\tconst select = (0,_custom_select_createContactSelect_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n\r\n\tconst contactField = (0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('.contact-field.field', [\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('div.contact-field__wrapper', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('input.contact-field__input', { type: 'text', name: 'phone', 'data-valid': 'phone', required: true }),\r\n\t\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('label', '+x (xxx) xxx-xx-xx'),\r\n\t\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('small')\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)(\r\n\t\t\t'button.contact-field__del-btn',\r\n\t\t\t{ type: 'button', 'data-action': 'del-contact', hidden: true },\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.svg)(\r\n\t\t\t\t'svg',\r\n\t\t\t\t{\r\n\t\t\t\t\twidth: '12',\r\n\t\t\t\t\theight: '12',\r\n\t\t\t\t\tviewBox: '0 0 12 12',\r\n\t\t\t\t\tfill: 'none',\r\n\t\t\t\t\txmlns: 'http://www.w3.org/2000/svg',\r\n\t\t\t\t},\r\n\t\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.svg)('path', {\r\n\t\t\t\t\td: 'M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z',\r\n\t\t\t\t\tfill: '#B0B0B0',\r\n\t\t\t\t}),\r\n\t\t\t),\r\n\t\t),\r\n\t]);\r\n\r\n\tcontactField.prepend(select);\r\n\tcontactsBlock.insertBefore(contactField, target);\r\n});\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/pop-up/createContactInput.js?");

/***/ }),

/***/ "./src/client/js/components/pop-up/createPopUp.js":
/*!********************************************************!*\
  !*** ./src/client/js/components/pop-up/createPopUp.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createPopUp\": () => (/* binding */ createPopUp)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/index.js */ \"./src/client/js/utils/index.js\");\n/* harmony import */ var _createPopUpForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createPopUpForm.js */ \"./src/client/js/components/pop-up/createPopUpForm.js\");\n/* harmony import */ var _popUpListener_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popUpListener.js */ \"./src/client/js/components/pop-up/popUpListener.js\");\n\r\n\r\n\r\n\r\n\r\nconst ADD_FORM_TITLE = 'Новый клиент';\r\nconst DEL_FORM_TITLE = 'Удалить клиента';\r\nconst CHANGE_FORM_TITLE = 'Изменить данные';\r\n\r\nfunction createPopUp(event) {\r\n\tconst { target } = event;\r\n\tif (document.body.querySelector('.pop-up')) return;\r\n\r\n\tconst form = (0,_createPopUpForm_js__WEBPACK_IMPORTED_MODULE_1__.createPopUpForm)();\r\n\r\n\twindow.__contactCount = 0;\r\n\tconst dataAction = target.dataset.action;\r\n\r\n\tfunction checkTitle(title) {\r\n\t\tconst titles = {\r\n\t\t\tadd: ADD_FORM_TITLE,\r\n\t\t\tchange: `${CHANGE_FORM_TITLE}<span> ID: 1111</span>`,\r\n\t\t\tdelete: DEL_FORM_TITLE,\r\n\t\t};\r\n\r\n\t\ttitle.textContent = titles[dataAction]; // eslint-disable-line no-param-reassign\r\n\t\treturn title;\r\n\t}\r\n\r\n\t_popUpListener_js__WEBPACK_IMPORTED_MODULE_2__.popUpTabindexController.removeFocus(form);\r\n\t(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.inputFormHover)(form);\r\n\r\n\tconst popUpOverlay = (0,redom__WEBPACK_IMPORTED_MODULE_3__.el)(\r\n\t\t'.pop-up',\r\n\t\t{ 'data-close': '' },\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('.pop-up__content', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('h3.pop-up__title', checkTitle),\r\n\t\t\tform,\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_3__.el)('button.pop-up__close', { 'data-close': '', type: 'button' }),\r\n\t\t]),\r\n\t);\r\n\r\n\tdocument.body.append(popUpOverlay);\r\n\r\n\tpopUpOverlay.addEventListener('click', _popUpListener_js__WEBPACK_IMPORTED_MODULE_2__.popUpListener);\r\n\tpopUpOverlay.addEventListener('input', _popUpListener_js__WEBPACK_IMPORTED_MODULE_2__.popUpListener);\r\n\tpopUpOverlay.addEventListener('submit', _popUpListener_js__WEBPACK_IMPORTED_MODULE_2__.popUpListener);\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/pop-up/createPopUp.js?");

/***/ }),

/***/ "./src/client/js/components/pop-up/createPopUpForm.js":
/*!************************************************************!*\
  !*** ./src/client/js/components/pop-up/createPopUpForm.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createPopUpForm\": () => (/* binding */ createPopUpForm)\n/* harmony export */ });\n/* harmony import */ var redom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redom */ \"./node_modules/redom/dist/redom.es.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ \"./src/client/js/utils/index.js\");\n\r\n\r\n\r\nfunction createPopUpForm() {\r\n\treturn (0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('form.form.form_clients', { name: 'add' }, [\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('div.form__field.field', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('input.form__field-input', (input) => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.focusedElement)(input), {\r\n\t\t\t\ttype: 'text',\r\n\t\t\t\tname: 'surname',\r\n\t\t\t\tautoComplete: 'off',\r\n\t\t\t\t'data-valid': 'text',\r\n\t\t\t\trequired: true\r\n\t\t\t}),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('label', 'Фамилия'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('small'),\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('div.form__field.field', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('input.form__field-input', { type: 'text', name: 'name', autoComplete: 'off', 'data-valid': 'text', required: true }),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('label', 'Имя'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('small'),\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('div.form__field.field', [\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('input.form__field-input', { type: 'text', name: 'midname', autoComplete: 'off', 'data-valid': 'text' }),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('label.not-required', 'Отчество'),\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('small'),\r\n\t\t]),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)(\r\n\t\t\t'.add-contact',\r\n\t\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)(\r\n\t\t\t\t'button.add-contact__btn',\r\n\t\t\t\t{ 'data-action': 'add-contact', type: 'button' },\r\n\t\t\t\t'Добавить контакт',\r\n\t\t\t),\r\n\t\t),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('button.btn.btn-clients', { type: 'submit', 'data-action': 'save' }, 'Сохранить'),\r\n\t\t(0,redom__WEBPACK_IMPORTED_MODULE_1__.el)('button.btn-reset', { 'data-close': '' }, 'Отмена'),\r\n\t]);\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/pop-up/createPopUpForm.js?");

/***/ }),

/***/ "./src/client/js/components/pop-up/deletePopUp.js":
/*!********************************************************!*\
  !*** ./src/client/js/components/pop-up/deletePopUp.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deletePopUp\": () => (/* binding */ deletePopUp)\n/* harmony export */ });\n/* harmony import */ var _createAddOtherContactForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createAddOtherContactForm.js */ \"./src/client/js/components/pop-up/createAddOtherContactForm.js\");\n/* harmony import */ var _custom_select_createContactSelect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../custom-select/createContactSelect.js */ \"./src/client/js/components/custom-select/createContactSelect.js\");\n\r\n\r\n\r\nfunction deletePopUp(popUp) {\r\n\tconst addOther = popUp.querySelector('.add-other');\r\n\tconst selects = popUp.querySelectorAll('.custom-select');\r\n\r\n\tpopUp.remove();\r\n\r\n\tif (addOther) {\r\n\t\taddOther.removeEventListener('click', _createAddOtherContactForm_js__WEBPACK_IMPORTED_MODULE_0__.formOtherListener);\r\n\t\taddOther.removeEventListener('keydown', _createAddOtherContactForm_js__WEBPACK_IMPORTED_MODULE_0__.formOtherListener);\r\n\t}\r\n\r\n\tif (selects) {\r\n\t\tselects.forEach((select) => {\r\n\t\t\tselect.removeEventListener('click', _custom_select_createContactSelect_js__WEBPACK_IMPORTED_MODULE_1__.selectActions);\r\n\t\t\tselect.removeEventListener('keydown', _custom_select_createContactSelect_js__WEBPACK_IMPORTED_MODULE_1__.selectActions);\r\n\t\t});\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/pop-up/deletePopUp.js?");

/***/ }),

/***/ "./src/client/js/components/pop-up/popUpListener.js":
/*!**********************************************************!*\
  !*** ./src/client/js/components/pop-up/popUpListener.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"popUpListener\": () => (/* binding */ popUpListener),\n/* harmony export */   \"popUpTabindexController\": () => (/* binding */ popUpTabindexController)\n/* harmony export */ });\n/* harmony import */ var _createContactInput_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createContactInput.js */ \"./src/client/js/components/pop-up/createContactInput.js\");\n/* harmony import */ var _deletePopUp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deletePopUp.js */ \"./src/client/js/components/pop-up/deletePopUp.js\");\n/* harmony import */ var _classes_TabindexController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classes/TabindexController.js */ \"./src/client/js/classes/TabindexController.js\");\n/* harmony import */ var _custom_select_createContactSelect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../custom-select/createContactSelect.js */ \"./src/client/js/components/custom-select/createContactSelect.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils */ \"./src/client/js/utils/index.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst popUpTabindexController = new _classes_TabindexController_js__WEBPACK_IMPORTED_MODULE_2__.TabindexController(document);\r\n\r\nlet countContacts = 0;\r\n\r\nfunction popUpListener(event) {\r\n\tevent.preventDefault();\r\n\tconst {target} = event;\r\n\r\n\tconst popUp = event.currentTarget;\r\n\tconst addContactBtn = popUp.querySelector('.add-contact__btn');\r\n\r\n\t// Add client contacts field\r\n\tif (target.dataset.action === 'add-contact') {\r\n\t\tif (++countContacts === 10) {\r\n\t\t\taddContactBtn.disabled = true;\r\n\t\t}\r\n\t\t(0,_createContactInput_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target);\r\n\t}\r\n\r\n\t// Delete client contacts field\r\n\tif (target.dataset.action === 'del-contact') {\r\n\t\tconst select = target.closest('.contact-field').querySelector('.custom-select');\r\n\t\t--countContacts;\r\n\t\taddContactBtn.disabled = false;\r\n\t\ttarget.closest('.contact-field').remove();\r\n\r\n\t\tselect.removeEventListener('click', _custom_select_createContactSelect_js__WEBPACK_IMPORTED_MODULE_3__.selectActions);\r\n\t\tselect.removeEventListener('keydown', _custom_select_createContactSelect_js__WEBPACK_IMPORTED_MODULE_3__.selectActions);\r\n\t}\r\n\r\n\tif (event instanceof InputEvent) {\r\n\t\tif (target.classList.contains('contact-field__input')) {\r\n\t\t\ttarget.nextElementSibling.hidden = target.value.length;\r\n\t\t\ttarget.closest('.contact-field__wrapper')\r\n\t\t\t\t.nextElementSibling.hidden = !target.value.length;\r\n\t\t}\r\n\t}\r\n\r\n\t// Save form data\r\n\tif (target.dataset.action === 'save') {\r\n\t\tconst token = JSON.parse(localStorage.getItem('token'));\r\n\t\tconst form = document.forms.add;\r\n\r\n\t\tconst formData = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.isFormValid)(form);\r\n\r\n\t\t// const formData = {};\r\n\t\t// const contacts = [];\r\n\r\n\t/*\t[...form.elements].forEach((input) => {\r\n\t\t\tif (input.nodeName === 'INPUT') {\r\n\t\t\t\tif (input.classList.contains('form__field-input')) {\r\n\t\t\t\t\tformData[input.name] = input.value;\r\n\t\t\t\t} else {\r\n\t\t\t\t\tconst socialName = input.previousSibling.querySelector('.custom-select__button').textContent;\r\n\t\t\t\t\tcontacts.push({type: input.name, socialName, socialLink: input.value});\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t\tformData.contacts = contacts;\r\n\r\n\t\tfetch('/clients', {\r\n\t\t\tmethod: 'POST',\r\n\t\t\theaders: {\r\n\t\t\t\t'Content-Type': 'application/json',\r\n\t\t\t\tAuthorization: `Bearer ${token}`,\r\n\t\t\t},\r\n\t\t\tbody: JSON.stringify(formData),\r\n\t\t}); */\r\n\t}\r\n\r\n\t// Delete pop-up window\r\n\tif (target.hasAttribute('data-close')) {\r\n\t\tcountContacts = 0;\r\n\t\t(0,_deletePopUp_js__WEBPACK_IMPORTED_MODULE_1__.deletePopUp)(popUp);\r\n\t\tpopUpTabindexController.returnFocus();\r\n\t\tpopUp.removeEventListener('click', popUpListener);\r\n\t\tpopUp.removeEventListener('input', popUpListener);\r\n\t\tpopUp.removeEventListener('submit', popUpListener);\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/pop-up/popUpListener.js?");

/***/ }),

/***/ "./src/client/js/components/svgLogo.js":
/*!*********************************************!*\
  !*** ./src/client/js/components/svgLogo.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"svgLogo\": () => (/* binding */ svgLogo)\n/* harmony export */ });\nconst svgLogo = () => `\r\n<svg width=\"432\" height=\"215\" viewBox=\"0 0 432 215\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<path class=\"figure\" d=\"M318.878 87.1398L306.868 122.43C306.148 124.54 306.608 126.88 308.078 128.56L332.638 156.61C334.108 158.29 336.368 159.06 338.558 158.62L375.128 151.37C377.318 150.94 379.108 149.37 379.828 147.25L391.838 111.96C392.558 109.85 392.098 107.51 390.628 105.83L366.068 77.7798C364.598 76.0998 362.338 75.3298 360.148 75.7698L323.578 83.0198C321.388 83.4598 319.588 85.0298 318.878 87.1398Z\"/>\r\n<path class=\"txt\" d=\"M192.648 107.81L192.698 107.74C196.708 102.16 200.468 96.3898 203.858 90.6298C207.178 85.1898 209.978 79.7598 212.198 74.4598C215.138 67.1098 216.628 59.5098 216.628 51.8898C216.628 49.0298 216.178 44.2798 215.358 38.5498C214.548 31.7598 209.698 24.5998 200.498 16.6198C191.728 9.28981 180.008 4.21981 165.658 1.55981L165.588 1.5498C158.078 0.399804 150.358 -0.110195 142.618 0.0198047C134.058 -0.110195 125.418 0.409804 116.898 1.5498C86.0185 6.0698 54.2885 15.5898 22.6085 29.8398L19.9985 30.7098L21.5685 33.1098C21.7785 33.4298 27.0785 40.7298 63.9985 30.7798C68.8285 29.4798 73.5985 28.0998 78.2185 26.7598C88.6785 23.7298 98.5685 20.8798 108.698 18.9798L108.828 18.9498C110.838 18.4498 113.098 18.1598 116.138 18.0098C116.618 18.0098 117.038 18.0098 117.398 18.0798C117.368 18.4398 117.218 18.9198 117.008 19.3398L116.888 19.6298C116.688 20.2398 115.718 22.1698 114.488 24.6198C113.838 25.9298 113.158 27.3198 112.428 28.7898C111.618 30.4398 110.758 32.1898 109.838 34.0398C105.858 41.8798 100.808 52.4998 93.9585 67.4298C87.5685 81.1998 81.2185 95.3098 75.0785 109.34C72.4885 115.23 69.9785 120.9 67.7985 125.65C65.8185 129.96 64.5085 132.6 63.9685 133.59C63.3485 134.07 61.2885 135.38 59.1085 136.76C49.0185 143.16 28.0385 156.49 14.9285 171.05L14.8885 171.1C13.1185 173.18 -2.28153 191.78 0.288469 203.35C0.998469 206.55 3.04847 209 6.19847 210.45C11.7385 212.99 17.8085 214.02 24.0585 214.02C42.2585 214.02 62.0585 205.26 75.2385 199.42L76.5285 198.85C99.5885 188.08 121.098 174.79 140.438 159.37C160.318 144.1 177.878 126.75 192.648 107.81ZM160.338 114.54C158.498 116.5 154.748 119.99 149.198 124.93C143.048 130.4 136.748 135.73 131.388 140.23C125.268 145.37 120.318 149.31 116.688 151.95C85.6785 174.15 58.8185 188.04 36.8585 193.22H36.8485C33.6685 193.99 30.0385 194.52 26.0585 194.79C26.0085 194.79 25.9585 194.79 25.9085 194.8H25.0485C23.6985 194.8 22.6085 194.71 21.8185 194.52C21.1585 194.36 20.6585 193.86 20.5985 193.29C20.5885 193.23 20.5885 193.17 20.5885 193.11C20.5885 191.66 21.5985 188.06 28.3285 180.25C31.5485 176.79 34.9885 173.47 38.5885 170.36C42.4585 166.9 46.0085 164.04 49.4285 161.61C49.8885 161.31 50.4385 161.04 51.0285 160.83C50.9885 161.15 50.9585 161.44 50.8885 161.67C50.2085 163.34 49.8785 165.11 49.8785 167.08C49.8785 168.2 50.0085 169.24 50.3085 170.44C50.6785 172.34 51.9785 174.12 53.7985 175.23C54.8685 175.93 56.2485 176.33 57.6185 176.33C57.8285 176.33 58.0985 176.31 58.4185 176.27C58.7385 176.24 59.0885 176.2 59.5085 176.2L59.7485 176.19C60.9385 176.06 62.1085 175.62 63.1385 174.93C63.6885 174.56 64.1585 174.12 64.5285 173.62C65.3585 172.5 66.8885 169.94 70.4885 160.71C73.1985 153.8 74.9485 149.68 76.1885 147.31C77.5685 144.55 78.9185 143.47 79.5885 143.08C83.6685 140.75 87.8785 138.66 92.8585 136.51C99.7485 133.39 106.808 130.45 113.388 127.75C128.498 121.75 141.028 117.38 150.628 114.75C155.908 113.31 159.678 112.57 161.828 112.56C161.328 113.3 160.868 113.92 160.338 114.54ZM162.008 96.8398C159.588 97.0898 157.248 97.4798 154.878 97.9998C141.438 100.74 123.028 106.83 100.168 116.1L100.158 116.11C96.2285 117.74 93.1185 118.91 90.6485 119.69L90.5585 119.72C90.1385 119.87 89.7085 120.04 89.2885 120.21C88.7185 120.43 88.1685 120.65 87.6285 120.83C87.9985 119.27 91.2285 111.82 92.4585 108.97C95.7085 101.48 99.7585 92.4798 104.508 82.2398C108.668 73.2698 113.588 62.7198 118.588 52.4498C122.278 44.6698 126.058 37.1398 129.838 30.0798C131.178 27.7898 132.268 25.4698 133.028 23.8298C133.698 22.4998 134.258 21.0098 134.708 19.3498C134.808 18.9398 134.898 18.5598 134.988 18.2098C135.208 17.2998 135.388 16.5798 135.538 16.1198L135.608 15.8498C135.648 15.6398 135.698 15.5298 135.888 15.3398C135.948 15.2798 136.088 15.2198 136.268 15.1898C138.818 14.6798 140.998 14.4998 143.148 14.5998H143.258C143.448 14.5998 143.728 14.6098 144.108 14.6298C144.988 14.6698 146.318 14.7298 148.118 14.7298C151.558 14.8598 154.958 15.1098 158.208 15.4698C176.418 17.6598 189.148 22.6098 196.048 30.1998C199.398 34.1398 201.028 38.8098 201.028 44.4598C201.028 49.9898 199.478 56.5198 196.428 63.8298C193.928 69.6198 190.728 75.6198 186.648 82.1398C182.598 88.5898 179.368 92.9498 176.768 95.4698C176.738 95.4998 176.698 95.5298 176.668 95.5598L175.298 96.7298C174.978 96.9998 174.578 97.1398 174.158 97.1098L169.588 96.8298C168.358 96.6998 167.158 96.6998 166.008 96.6998C164.838 96.6998 163.518 96.6998 162.008 96.8398Z\"/>\r\n<path class=\"txt\" d=\"M430.368 61.8598C428.058 52.3798 420.718 46.4398 408.638 44.2398C406.118 43.6698 403.268 43.3098 399.658 43.1098C391.498 42.6498 380.658 43.3798 367.418 45.2898C353.268 47.5198 339.448 51.1298 326.368 56.0198C315.168 60.0398 309.578 64.5798 309.278 69.8898C309.248 70.4398 309.208 71.0598 309.328 71.6798C309.558 73.3098 310.408 74.7998 311.738 75.9598C312.768 76.9198 313.998 77.4598 315.318 77.5298C315.708 77.5498 316.188 77.5798 316.718 77.4098C317.638 77.2398 318.528 76.7998 319.008 76.4798C319.768 76.0298 320.658 75.4698 321.598 74.8698C328.028 70.4498 338.378 66.4598 352.358 62.9998C366.358 59.5498 380.538 57.5498 394.418 57.0598C396.508 57.0598 398.678 57.0598 400.538 57.1698C404.388 57.3898 408.188 57.9498 411.868 58.8598C414.608 59.4998 416.838 60.4398 418.408 61.5998C419.118 62.1298 419.628 62.8998 419.788 63.7698C419.858 64.1598 419.888 64.5598 419.858 64.9698C419.698 67.7798 417.438 73.1898 407.558 82.9698C402.328 88.2898 343.998 130.81 331.008 142.17C323.848 148.44 332.758 156.05 340.578 150.54C393.198 113.47 393.378 113.87 394.138 113.26C405.598 104.36 413.128 97.9498 417.808 93.1298C422.308 88.7598 425.978 83.6698 428.668 78.0598C430.188 75.1598 431.078 72.0498 431.248 69.0798C431.398 66.5998 431.088 64.1098 430.368 61.8598Z\" />\r\n<path class=\"txt\" d=\"M381.608 158.37C381.528 158.36 381.468 158.35 381.388 158.35L379.968 158.32C375.058 158.32 364.628 159.66 347.158 162.53C331.888 165.02 314.468 168.37 292.318 173.07L290.068 173.53C287.528 174.05 285.248 174.52 283.158 175C281.988 175.29 280.718 175.5 279.378 175.71C279.498 175.51 279.628 175.34 279.768 175.2C282.778 172.5 296.168 161.9 324.738 140.26C343.648 125.91 359.448 113.75 370.438 105.08C371.828 103.99 374.198 103.52 374.538 101.83C377.668 85.9698 371.278 88.2498 355.148 97.4698C341.798 105.1 330.498 116.44 313.608 129.26C311.458 130.88 309.408 132.44 307.418 133.95C303.728 135.38 299.568 137.16 294.688 139.3C275.318 147.55 263.118 151.62 258.098 151.62C255.348 151.62 253.908 150.66 253.908 148.75C253.908 147.08 254.988 144.8 257.018 141.69C257.738 140.37 258.448 139.3 258.928 138.22C259.408 137.5 259.648 136.79 259.768 136.07C259.648 134.75 259.168 133.56 258.218 132.6C257.258 131.52 256.068 130.57 254.628 129.97C253.668 129.49 252.478 129.37 251.398 129.37C248.288 129.49 245.418 130.33 242.788 131.64C241.468 132.24 240.038 132.72 238.598 132.96C238.238 132.96 237.998 132.96 237.758 132.84C237.158 132.6 236.918 131.88 236.918 130.57C236.918 129.85 236.918 129.25 237.038 128.54C237.158 127.82 237.158 127.11 237.158 126.39C237.158 124.96 236.918 123.52 236.318 122.2C235.478 120.77 234.168 119.57 232.608 118.85C231.178 118.01 229.378 117.53 227.588 117.53C225.078 117.65 222.568 118.25 220.178 119.08C216.828 120.16 210.968 123.03 202.718 127.93C199.968 129.6 197.578 130.92 195.658 132C194.458 132.72 193.388 133.32 192.188 133.79H191.708H191.588C191.348 133.79 191.228 133.67 191.228 133.43C191.228 132.59 192.658 130.32 195.418 126.85C196.618 125.42 197.688 123.86 198.648 122.31C199.128 121.47 199.488 120.4 199.488 119.32C199.488 116.81 198.288 115.25 196.018 114.54C195.298 114.42 194.698 114.3 193.988 114.3C192.078 114.42 190.398 115.02 188.968 115.97C185.978 118.84 183.108 121.95 180.598 125.18C176.528 129.96 172.588 134.99 168.518 140.37C165.288 144.44 162.418 148.74 159.788 153.05C158.708 154.84 157.998 156.76 157.878 158.79C157.878 159.63 157.998 160.46 158.358 161.3C158.838 162.14 159.558 162.85 160.388 163.45C161.108 164.05 161.938 164.65 163.138 164.77C164.338 165.01 165.408 165.13 166.608 165.13C167.688 165.13 168.638 165.01 169.598 164.89C170.438 164.77 171.268 164.53 172.108 164.17C173.778 163.21 175.218 162.14 176.648 160.94C178.918 159.15 181.548 156.99 184.418 154.6C191.118 148.98 198.288 143.6 205.708 138.7C212.768 134.04 217.188 131.76 219.098 131.76C220.058 131.76 220.528 132.12 220.528 132.72C220.528 133.68 219.688 135.23 218.018 137.38C214.908 141.8 212.998 145.15 212.518 147.54C212.278 148.14 212.158 148.86 212.158 149.45C212.158 151 212.878 152.44 214.068 153.52C215.148 154.84 216.818 155.67 218.608 155.67C219.568 155.67 220.518 155.55 221.358 155.31C222.788 155.07 225.898 153.4 230.808 150.41C234.638 147.9 237.388 146.58 239.058 146.58C239.778 146.46 240.608 146.94 240.728 147.66C240.968 148.14 241.328 148.62 241.568 149.09C242.168 149.93 242.768 151.12 243.478 152.44C245.388 156.39 249.098 159.5 253.878 160.81C255.548 161.29 277.908 155.31 279.578 155.31C279.638 155.31 279.708 155.3 279.768 155.29C257.818 172.74 255.938 175.94 255.558 177.26C254.778 178.76 254.378 180.43 254.378 182.09C254.378 185.62 256.548 188.56 260.868 190.87C262.478 191.68 264.078 192.09 265.568 192.08C266.128 192.08 266.678 192.02 267.208 191.91C267.268 191.9 267.328 191.89 267.398 191.89C271.388 191.75 275.338 191.26 279.088 190.44C284.648 189.45 292.728 187.76 303.088 185.4C317.648 182.11 332.308 179.1 346.668 176.45C361.028 173.79 371.128 172.16 377.538 171.46C377.558 171.46 377.588 171.46 377.608 171.45C380.858 171.31 383.898 170.72 386.188 170.22L386.338 170.18C387.258 169.9 389.678 169.15 390.078 166.83C390.238 166.26 390.238 165.75 390.238 165.36C390.248 160.14 383.878 158.81 381.608 158.37Z\"/>\r\n</svg>\r\n`\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/components/svgLogo.js?");

/***/ }),

/***/ "./src/client/js/utils/focusedElement.js":
/*!***********************************************!*\
  !*** ./src/client/js/utils/focusedElement.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"focusedElement\": () => (/* binding */ focusedElement)\n/* harmony export */ });\nfunction focusedElement(el) {\r\n\tsetTimeout(() => {\r\n\t\tel.focus();\r\n\t});\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/utils/focusedElement.js?");

/***/ }),

/***/ "./src/client/js/utils/index.js":
/*!**************************************!*\
  !*** ./src/client/js/utils/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"focusedElement\": () => (/* reexport safe */ _focusedElement_js__WEBPACK_IMPORTED_MODULE_1__.focusedElement),\n/* harmony export */   \"inputFormHover\": () => (/* reexport safe */ _inputFormHover_js__WEBPACK_IMPORTED_MODULE_2__.inputFormHover),\n/* harmony export */   \"isFormValid\": () => (/* reexport safe */ _validationForms_js__WEBPACK_IMPORTED_MODULE_0__.isFormValid),\n/* harmony export */   \"removeError\": () => (/* reexport safe */ _validationForms_js__WEBPACK_IMPORTED_MODULE_0__.removeError),\n/* harmony export */   \"toggleForms\": () => (/* reexport safe */ _toggleForms_js__WEBPACK_IMPORTED_MODULE_3__.toggleForms)\n/* harmony export */ });\n/* harmony import */ var _validationForms_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validationForms.js */ \"./src/client/js/utils/validationForms.js\");\n/* harmony import */ var _focusedElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./focusedElement.js */ \"./src/client/js/utils/focusedElement.js\");\n/* harmony import */ var _inputFormHover_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inputFormHover.js */ \"./src/client/js/utils/inputFormHover.js\");\n/* harmony import */ var _toggleForms_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toggleForms.js */ \"./src/client/js/utils/toggleForms.js\");\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/utils/index.js?");

/***/ }),

/***/ "./src/client/js/utils/inputFormHover.js":
/*!***********************************************!*\
  !*** ./src/client/js/utils/inputFormHover.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"inputFormHover\": () => (/* binding */ inputFormHover)\n/* harmony export */ });\n// Input hover effects\r\nfunction inputFormHover(form) {\r\n\tfor (let i = 0; i < form.length; i++) {\r\n\t\tif (form[i].nodeName === 'INPUT') {\r\n\t\t\tform[i].addEventListener('input', () => {\r\n\t\t\t\tform[i].value.trim() !== ''\r\n\t\t\t\t\t? form[i].classList.add('not-empty')\r\n\t\t\t\t\t: form[i].classList.remove('not-empty');\r\n\t\t\t});\r\n\t\t}\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/utils/inputFormHover.js?");

/***/ }),

/***/ "./src/client/js/utils/toggleForms.js":
/*!********************************************!*\
  !*** ./src/client/js/utils/toggleForms.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"toggleForms\": () => (/* binding */ toggleForms)\n/* harmony export */ });\n/* harmony import */ var _validationForms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validationForms */ \"./src/client/js/utils/validationForms.js\");\n// Authorization form Toggle\r\n\r\n\r\nfunction toggleForms(forms) {\r\n\tforms\r\n\t\t.map((form) => form.querySelector('.btn_toggle'))\r\n\t\t.forEach((btn) => {\r\n\t\t\tbtn.addEventListener('click', () => {\r\n\t\t\t\tforms.forEach((form) => {\r\n\t\t\t\t\t// eslint-disable-next-line no-param-reassign\r\n\t\t\t\t\tform.hidden = !form.hidden;\r\n\t\t\t\t\t[...form.elements].forEach(el => {\r\n\t\t\t\t\t\tif(el.nodeName === 'INPUT') {\r\n\t\t\t\t\t\t\tel.value = '';\r\n\t\t\t\t\t\t\tel.classList.remove('not-empty');\r\n\t\t\t\t\t\t\t(0,_validationForms__WEBPACK_IMPORTED_MODULE_0__.removeError)(el)\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t})\r\n\t\t\t\t});\r\n\t\t\t});\r\n\t\t});\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/utils/toggleForms.js?");

/***/ }),

/***/ "./src/client/js/utils/validationForms.js":
/*!************************************************!*\
  !*** ./src/client/js/utils/validationForms.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isFormValid\": () => (/* binding */ isFormValid),\n/* harmony export */   \"removeError\": () => (/* binding */ removeError)\n/* harmony export */ });\nconst showError = (input, errMsg) => {\r\n\tconst formField = input.closest('div.field');\r\n\tformField.classList.add('error');\r\n\tconst errField = formField.querySelector('small');\r\n\terrField.textContent = errMsg;\r\n};\r\n\r\nconst removeError = (input) => {\r\n\tconst formField = input.closest('div.field');\r\n\tformField.classList.remove('error');\r\n\tconst errField = formField.querySelector('small');\r\n\terrField.textContent = '';\r\n};\r\n\r\nconst validationParams = {\r\n\ttext: {\r\n\t\tregExp: /^[а-яА-ЯёЁa-zA-Z._]{0,20}$/,\r\n\t\tmsg: 'Ваше имя не корректно',\r\n\t},\r\n\temail: {\r\n\t\tregExp: /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/,\r\n\t\tmsg: 'E-mail введен не корректно',\r\n\t},\r\n\tpassword: {\r\n\t\tregExp: /^.{6}$/,\r\n\t\tmsg: 'Введено не достаточное количество символов',\r\n\t},\r\n\t'confirm-password': {\r\n\t\tregExp: /^.{6}/,\r\n\t\tmsg: 'Введен не верный пароль',\r\n\t},\r\n\tphone: {\r\n\t\tregExp: /^((8|\\+\\d{1,2})[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$/,\r\n\t\tmsg: 'Введен не верный номер телефона',\r\n\t},\r\n\tlink: {\r\n\t\tregExp: /^https?:\\/\\/[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/,\r\n\t\tmsg: 'Ссылка указанна не верно',\r\n\t}\r\n};\r\n\r\nfunction isFormValid(form) {\r\n\tlet isValid = true, password, formData = {};\r\n\r\n\tconst inputs = [...form.elements].filter((el) => el.nodeName === 'INPUT');\r\n\tif(form.name === 'signup') {\r\n\t\tpassword = inputs.find((el) => el.name === 'password').value.trim();\r\n\t}\r\n\r\n\tform.addEventListener('input', (e) => {\r\n\t\tif (e.target.dataset.valid && validationParams[e.target.dataset.valid].regExp.test(e.target.value.trim())) {\r\n\t\t\tremoveError(e.target);\r\n\t\t}\r\n\t});\r\n\r\n\tinputs.forEach((input) => {\r\n\t\tconst value = input.value.trim();\r\n\t\tconst { valid } = input.dataset;\r\n\r\n\t\tif(valid) {\r\n\t\t\tconst errMsg = !value && input.required ? 'Поле обязательно для заполнения' : validationParams[valid].msg;\r\n\r\n\t\tif ((value === '' && input.required) || !validationParams[valid].regExp.test(value)) {\r\n\t\t\tshowError(input, errMsg);\r\n\t\t\tisValid = false;\r\n\t\t} else {\r\n\t\t\tformData = { ...formData, [input.name]: value };\r\n\t\t}\r\n\r\n\t\tif (name === 'confirm-password' && value !== password) {\r\n\t\t\tshowError(input, errMsg);\r\n\t\t\tisValid = false;\r\n\t\t}}\r\n\t});\r\n\r\n\tif (isValid) return formData;\r\n}\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/utils/validationForms.js?");

/***/ }),

/***/ "./src/client/js/views.js":
/*!********************************!*\
  !*** ./src/client/js/views.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/client/js/utils/index.js\");\n/* harmony import */ var _api_userAuthorization_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/userAuthorization.js */ \"./src/client/js/api/userAuthorization.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ \"./src/client/js/components/index.js\");\n\r\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\tconst token = JSON.parse(localStorage.getItem('token'));\r\n\tconst main = document.getElementById('main');\r\n\r\n\tconst {header, themeSwitch} = (0,_components__WEBPACK_IMPORTED_MODULE_2__.createHeader)();\r\n\r\n\tfunction createApp() {\r\n\t\tconst searchInput = (0,_components__WEBPACK_IMPORTED_MODULE_2__.createSearchInput)();\r\n\t\tconst logoutBtn = (0,_components__WEBPACK_IMPORTED_MODULE_2__.createLogoutBtn)();\r\n\t\tconst title = (0,_components__WEBPACK_IMPORTED_MODULE_2__.createTitle)();\r\n\t\tconst clientsList = (0,_components__WEBPACK_IMPORTED_MODULE_2__.createClientsList)();\r\n\t\tconst addButton = (0,_components__WEBPACK_IMPORTED_MODULE_2__.createAddButton)();\r\n\r\n\t\taddButton.addEventListener('click', _components__WEBPACK_IMPORTED_MODULE_2__.createPopUp);\r\n\r\n\t\tmain.innerHTML = '';\r\n\t\theader.classList.remove('no-auth');\r\n\t\theader.insertBefore(searchInput, themeSwitch);\r\n\t\theader.insertBefore(logoutBtn, themeSwitch);\r\n\t\tmain.append(title, clientsList.table, addButton);\r\n\t}\r\n\r\n\tif (!token) {\r\n\t\theader.classList.add('no-auth');\r\n\t\tconst loginForm = (0,_components__WEBPACK_IMPORTED_MODULE_2__.createLoginForm)();\r\n\t\tconst signupForm = (0,_components__WEBPACK_IMPORTED_MODULE_2__.createSignupForm)();\r\n\r\n\t\t(0,_utils__WEBPACK_IMPORTED_MODULE_0__.toggleForms)([loginForm, signupForm]);\r\n\r\n\t\t[loginForm, signupForm].forEach((form) => {\r\n\t\t\t(0,_utils__WEBPACK_IMPORTED_MODULE_0__.inputFormHover)(form);\r\n\t\t\tconst errorMessage = form.querySelector('.error-message');\r\n\t\t\tform.addEventListener('submit', async (e) => {\r\n\t\t\t\te.preventDefault();\r\n\t\t\t\tconst formData = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isFormValid)(e.target);\r\n\t\t\t\tif (formData) {\r\n\t\t\t\t\ttry {\r\n\t\t\t\t\t\tconst userData = await (0,_api_userAuthorization_js__WEBPACK_IMPORTED_MODULE_1__.userAuthorization)(formData, `/${e.target.name}`);\r\n\t\t\t\t\t\tlocalStorage.setItem('user', JSON.stringify(userData));\r\n\t\t\t\t\t\tcreateApp(userData);\r\n\t\t\t\t\t} catch (err) {\r\n\t\t\t\t\t\terrorMessage.textContent = err.message;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t});\r\n\r\n\t\tmain.append(loginForm, signupForm);\r\n\t} else {\r\n\t\tconst userData = JSON.parse(localStorage.getItem('user'));\r\n\t\tcreateApp(userData);\r\n\t}\r\n\r\n\tdocument.body.insertBefore(header, main);\r\n});\r\n\n\n//# sourceURL=webpack://contact_management_system/./src/client/js/views.js?");

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
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("7872eb1c4e09e36717dd")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "contact_management_system:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/static/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatecontact_management_system"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/client/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./node_modules/webpack-hot-middleware/client.js?path=http://localhost:3001/static/__webpack_hmr");
/******/ 	
/******/ })()
;