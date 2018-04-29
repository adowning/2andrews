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
/******/ 	return __webpack_require__(__webpack_require__.s = 426);
/******/ })
/************************************************************************/
/******/ ({

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(427);

var ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
  if (!event.requestContext.authorizer) {
    errorResponse('Authorization not configured', context.awsRequestId, callback);
    return;
  }
  var params = {
    TableName: 'PACKAGES_TABLE'
    // Key: {
    //   'KEY_NAME': VALUE
    // }
  };

  docClient.get(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);
    }
  });

  //   const rideId = toUrlString(randomBytes(16));
  //   console.log('Received event (', rideId, '): ', event);

  //   // Because we're using a Cognito User Pools authorizer, all of the claims
  //   // included in the authentication token are provided in the request context.
  //   // This includes the username as well as other attributes.
  //   const username = event.requestContext.authorizer.claims['cognito:username'];

  //   // The body field of the event in a proxy integration is a raw string.
  //   // In order to extract meaningful values, we need to first parse this string
  //   // into an object. A more robust implementation might inspect the Content-Type
  //   // header first and use a different parsing strategy based on that value.
  //   const requestBody = JSON.parse(event.body);

  //   savePackage(primaryAssetID, assetList, department).then(() => {
  //     // You can use the callback function to provide a return value from your Node.js
  //     // Lambda functions. The first parameter is used for failed invocations. The
  //     // second parameter specifies the result data of the invocation.

  //     // Because this Lambda function is called by an API Gateway proxy integration
  //     // the result object must use the following structure.
  //     callback(null, {
  //       statusCode: 201,
  //       body: JSON.stringify({
  //         PackageId: packageId,
  //         // Unicorn: unicorn,
  //         // Eta: '30 seconds',
  //         // Rider: username,
  //       }),
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     });
  //   }).catch((err) => {
  //     console.error(err);

  //     // If there is an error during processing, catch it and return
  //     // from the Lambda function successfully. Specify a 500 HTTP status
  //     // code and provide an error message in the body. This will provide a
  //     // more meaningful error response to the end client.
  //     errorResponse(err.message, context.awsRequestId, callback)
  //   });
  // };

  // // This is where you would implement logic to find the optimal unicorn for
  // // this ride (possibly invoking another Lambda function as a microservice.)
  // // For simplicity, we'll just pick a unicorn at random.
  // function findPackages() {
  //   //console.log('Finding unicorn for ', pickupLocation.Latitude, ', ', pickupLocation.Longitude);
  //   return packages
  // }

  // function updatePackage(primaryAssetID, assetList, department) {
  //   return ddb.put({
  //     TableName: 'Packages',
  //     Item: {
  //       PrimaryAssetID: primaryAssetID,
  //       AssetList: assetList,
  //       Department: department,
  //       AlertList: alertList
  //     },
  //   }).promise();
  // }

  // function toUrlString(buffer) {
  //   return buffer.toString('base64')
  //     .replace(/\+/g, '-')
  //     .replace(/\//g, '_')
  //     .replace(/=/g, '');
  // }

  // function errorResponse(errorMessage, awsRequestId, callback) {
  //   callback(null, {
  //     statusCode: 500,
  //     body: JSON.stringify({
  //       Error: errorMessage,
  //       Reference: awsRequestId,
  //     }),
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   });
};

/***/ }),

/***/ 427:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/ash/Documents/andrews-admin-app/node_modules/aws-sdk/lib/aws.js'");

/***/ })

/******/ })));