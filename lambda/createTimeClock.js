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
/******/ 	return __webpack_require__(__webpack_require__.s = 420);
/******/ })
/************************************************************************/
/******/ ({

/***/ 214:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/request/index.js'");

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["handler"] = handler;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_request__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_request__);


/* eslint-disable */

var token = localStorage.getItem('humanityToken');
var BASE_URL = 'https://www.humanity.com/api/v2/';

function handler(event, context, callback) {
  console.log(event.queryStringParameters);
  // var id = JSON.parse( event.queryStringParameters.id )
  // var inOut = JSON.parse( event.queryStringParameters.inOut )
  var id = event.queryStringParameters.id.toString();
  var inOut = event.queryStringParameters.inOut.toString();
  var method = '';
  if (inOut == 'clockin') {
    method = 'POST';
  }
  if (inOut == 'clockout') {
    method = 'PUT';
  }
  console.log(inOut);
  var options = {
    method: method,
    // url: "https://www.humanity.com/api/v2/employees/" + i+ "/?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77",
    url: "https://www.humanity.com/api/v2/timeclock/savenote" + id + "?access_token=" + token,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: Object(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__["default"])({
      "id": id,
      "notes": "asdfasdf"
    })
  };
  Object(__WEBPACK_IMPORTED_MODULE_2_request__["default"])(options, function (error, response, body) {
    var cache = [];
    var id = 'none';
    if (response.body) {
      try {
        id = response.body;
      } catch (error) {
        console.log(error);
      }
    }
    // var id = response.body.payload.id
    if (error) throw new Error(error);
    console.log(id);
    if (id != 'none') {
      var x = Object(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__["default"])(id, function (key, value) {
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
    }
    cache = null; // Enable garbage collection
    // console.log( x )
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: x
    });
  });
}

/***/ }),

/***/ 75:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/babel-runtime/helpers/typeof.js'");

/***/ }),

/***/ 99:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/babel-runtime/core-js/json/stringify.js'");

/***/ })

/******/ })));