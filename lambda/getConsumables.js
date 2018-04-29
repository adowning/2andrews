(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 421);
/******/ })
/************************************************************************/
/******/ ({

/***/ 114:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/axios/index.js'");

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);


/* eslint-disable */
var axios = __webpack_require__(114);
var snipeit = axios.create({
  baseURL: 'http://47.219.112.177:83/api/',
  timeout: 7000,
  headers: {
    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg2YzM2MTgxMzhmMTgxZWFiNjYxODA0ZWVlM2JjYjJjYmMzM2FjMWVlNjM2YjY5NDZkNzVlMzhmZmM4NTFjYzBkYjg1MGI4OGUyZThiYjU2In0.eyJhdWQiOiI4IiwianRpIjoiODZjMzYxODEzOGYxODFlYWI2NjE4MDRlZWUzYmNiMmNiYzMzYWMxZWU2MzZiNjk0NmQ3NWUzOGZmYzg1MWNjMGRiODUwYjg4ZTJlOGJiNTYiLCJpYXQiOjE1MjM0NjQ0NDMsIm5iZiI6MTUyMzQ2NDQ0MywiZXhwIjoxNTU1MDAwNDQzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.vOFDvt-779QzbItigmgjZdNaTYmKkuiduL01HJbgR3_oQ-_EKtDVt8KS2FZ-8QAcBgVwuXOZm-ZgssB92cEVvwspQsjiH8T1RTVB9ZpFK5HQU_hhErpBuaWD_FkupjzYz_PnJqDzU8j6I79vAPbkCF_NNPyI0DsjwXMSTx_a8d0yItfxroxHWdHaD9_MFPbO9l_TmYmu42aaQG9wMVNZUqvpk6iFiiS_mOQBh3sdwR-CCxnfz0lIMydfFEjfnNlmkexA0ThorMJKAr4YB28nVWQnoTf-Fx8mNdH42OLlzWGj0ZWCJAIHVpDiECGZw0xL6dCngJgCXvPHWpI7H2Lj6HL1vkJr4DLsd-oZlAk2h3u0g5W839ENoSaFJdt9t6Imk4MEAf8P2W0n5plhBjcpUJJXni93tSA5RO2_XQXRprWmUKMEvFajey2aNIVUq1rcW7PaFciwRDT5wkxFb294zhR_ElAF52Yzjq1ZH78_2hMsDyWq7sFrZ-Th-pPmXKsaUmNch8AZOSbeoqQyCGNduPjLZaV1qqeZhWGJD4bw9YLBdRliiqCSkV9UHYqauO0b8ZYFjZ5dC1s1E3TnsFya93LQG_rLMeeaZ9tQ6AfnHx4liL5fdB_LQNw8zLN_iGn0WdQZtWOMP2EJfB0lECBOnI5AnHRnWrGWJzCe3s6IxZo'
  }
});
exports.handler = function (event, context, callback) {
  snipeit.get('http://47.219.112.177:83/api/v1/consumables').then(function (data) {
    var cache = [];
    var x = Object(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__["default"])(data.data, function (key, value) {
      if ((typeof value === 'undefined' ? 'undefined' : Object(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__["default"])(value)) === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // Enable garbage collection
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: x
    });
  });
};

/***/ }),

/***/ 75:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/babel-runtime/helpers/typeof.js'");

/***/ }),

/***/ 99:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/babel-runtime/core-js/json/stringify.js'");

/***/ })

/******/ })));