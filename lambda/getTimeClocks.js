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
/******/ 	return __webpack_require__(__webpack_require__.s = 338);
/******/ })
/************************************************************************/
/******/ ({

/***/ 131:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/axios/index.js'");

/***/ }),

/***/ 318:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/babel-runtime/core-js/promise.js'");

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["handler"] = handler;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);




// const token = '?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77'
var BASE_URL = 'https://www.humanity.com/api/v2/';

var instance = __WEBPACK_IMPORTED_MODULE_3_axios__["default"].create({
  baseURL: BASE_URL,
  timeout: false
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  //eslint-disable-next-line
  /* global window Store */
  config.headers.common['Access-Control-Allow-Origin'] = '*';

  return config;
}, function (error) {
  // Do something with request error
  return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__["default"].reject(error);
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error.config);
  return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__["default"].reject(error);
});
function handler(event, context, callback) {
  // var start_date = JSON.parse( event.queryStringParameters.start_date )
  // var end_date = JSON.parse( event.queryStringParameters.end_date )
  // var employee = JSON.parse( event.queryStringParameters.employee )

  instance.get('timeclocks?access_token=edc0b9be800a28b7b5f1135f8038e55fa891bcfe', {
    params: event.queryStringParameters
  }).then(function (response) {
    var cache = [];
    console.log(response.data.data);
    var x = Object(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__["default"])(response.data.data, function (key, value) {
      if ((typeof value === 'undefined' ? 'undefined' : Object(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__["default"])(value)) === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
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
}

// /* eslint-disable */
// var axios = require( 'axios' )
// const humanity = axios.create( {
//   baseURL: "https://www.humanity.com/api/v2/timeclocks/?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77",
//   timeout: 7000,
//    headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },

// } )
// exports.handler = ( event, context, callback ) => {
//   snipeit.get( 'https://www.humanity.com/api/v2/timeclocks/?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77' ).then( data => {
//     var cache = [];
//     var x = JSON.stringify( data.data, function ( key, value ) {
//       if ( typeof value === 'object' && value !== null ) {
//         if ( cache.indexOf( value ) !== -1 ) {
//           // Circular reference found, discard key
//           return;
//         }
//         // Store value in our collection
//         cache.push( value );
//       }
//       return value;
//     } );
//     cache = null; // Enable garbage collection
//     callback( null, {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*'
//       },
//       body: x,
//     } )

//   } );
// }

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/babel-runtime/core-js/json/stringify.js'");

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/babel-runtime/helpers/typeof.js'");

/***/ })

/******/ })));