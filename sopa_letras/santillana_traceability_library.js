// VERSION 1.0 GLOBALBITHOUSE 03-02-2022

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["santillana_traceability_library"] = factory();
	else
		root["santillana_traceability_library"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var customWindow = window;
customWindow.SANTILLANA_TRACE = __webpack_require__(/*! ./traceability/trace */ "./src/traceability/trace.ts").instance;


/***/ }),

/***/ "./src/traceability/helpers/manage-url.ts":
/*!************************************************!*\
  !*** ./src/traceability/helpers/manage-url.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getURLParameter = void 0;
function getURLParameter(parametro, location) {
    var getGET = function (location) {
        var get;
        if (typeof get === "undefined") {
            get = {};
            var loc = location || document.location.href;
            if (loc.indexOf('?') > 0) {
                var getString = loc.split('?')[1];
                var GET = getString.split('&');
                for (var i = 0, l = GET.length; i < l; i++) {
                    var tmp = GET[i].split('=');
                    get[tmp[0]] = unescape(decodeURI(tmp[1]));
                }
            }
            return get;
        }
        else {
            return {};
        }
    };
    var response = getGET(location)[parametro] || null;
    if (response === "false") {
        return false;
    }
    else if (response === "true") {
        return true;
    }
    else {
        return response;
    }
}
exports.getURLParameter = getURLParameter;


/***/ }),

/***/ "./src/traceability/trace.ts":
/*!***********************************!*\
  !*** ./src/traceability/trace.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
var traceability_api_factory_1 = __webpack_require__(/*! ./types/traceability-api.factory */ "./src/traceability/types/traceability-api.factory.ts");
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var Trace = (function () {
    function Trace() {
        this._traceabilityModule = null;
        this._hasTrace = false;
        this._traceabilityApiFactory = new traceability_api_factory_1.TraceabilityApiFactory(axios_1.default);
    }
    Object.defineProperty(Trace.prototype, "hasTrace", {
        get: function () {
            return this._hasTrace;
        },
        enumerable: false,
        configurable: true
    });
    Trace.getInstance = function () {
        if (!Trace.instance) {
            Trace.instance = new Trace();
        }
        return Trace.instance;
    };
    Trace.prototype.loadTraceabilityModule = function () {
        try {
            this._traceabilityModule = this._traceabilityApiFactory.factoryMethod();
            this._hasTrace = true;
        }
        catch (e) {
            this._hasTrace = false;
            console.info('Traza no encontrada', ':::', e);
        }
    };
    Trace.prototype.setMaxScore = function (maxScore) {
        if (!this.hasTrace)
            return;
        this._traceabilityModule.setMaxScore(maxScore);
    };
    Trace.prototype.setMinScore = function (minScore) {
        if (!this.hasTrace)
            return;
        this._traceabilityModule.setMinScore(minScore);
    };
    Trace.prototype.setData = function (data) {
        if (!this.hasTrace)
            return;
        this._traceabilityModule.setDataToStore(data);
    };
    Trace.prototype.getData = function () {
        if (!this.hasTrace)
            return null;
        return this._traceabilityModule.getDataStored();
    };
    Trace.prototype.initialize = function () {
        if (!this.hasTrace)
            return false;
        this._traceabilityModule.initialize();
    };
    Trace.prototype.complete = function (score) {
        if (!this.hasTrace)
            return false;
        this._traceabilityModule.complete(score);
    };
    Trace.prototype.finish = function () {
        if (!this.hasTrace)
            return false;
        this._traceabilityModule.finish();
    };
    return Trace;
}());
var traceInstance = Trace.getInstance();
traceInstance.loadTraceabilityModule();
exports.instance = traceInstance;


/***/ }),

/***/ "./src/traceability/types/av-api.ts":
/*!******************************************!*\
  !*** ./src/traceability/types/av-api.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvAPI = void 0;
var traceability_api_contract_1 = __webpack_require__(/*! ./traceability-api.contract */ "./src/traceability/types/traceability-api.contract.ts");
var AvAPI = (function (_super) {
    __extends(AvAPI, _super);
    function AvAPI() {
        return _super.call(this) || this;
    }
    AvAPI.prototype.initialize = function () {
        try {
            this.trace('AV:::Initialized');
            this._startTime = new Date().getTime() / 1000;
            var data = this.getDataFromUrl();
            var _key = "";
            var avData = {};
            if (!(data.resourceId.indexOf("open") < 0)) {
                console.log("se guarda en AV que se ha abierto un recurso");
                var resourceId = data.resourceId.replace("open", "");
                var unitId = data.unitId.replace("openUnidad_", "");
                avData = __assign(__assign({}, avData), { abierto: 'OK', unidad: unitId, recurso: resourceId });
                _key = resourceId;
                this.sendToAv(_key, avData);
            }
            return true;
        }
        catch (e) {
            this.trace('AV Api No encontrada');
            return false;
        }
    };
    AvAPI.prototype.complete = function (score) {
        if (score === void 0) { score = null; }
        try {
            var data = this.getDataFromUrl();
            var avData = {};
            var _key = "";
            this._startTime = this.getStartTime() || new Date().getTime() / 1000;
            this._endTime = new Date().getTime() / 1000;
            var duration = Math.round(this._endTime - this._startTime);
            console.log("se guarda en AV que se ha realizado una actividad");
            var _unitId = data.unitId.replace("Unidad_", "");
            var _activityId = data.activityId.replace("Actividad_", "");
            avData = __assign(__assign({}, avData), { unidad: _unitId, actividad: _activityId, duracion: duration, calificacion: score });
            _key = _activityId;
            this.sendToAv(_key, avData);
        }
        catch (e) {
            this.trace('WC Api No encontrada');
            return false;
        }
    };
    AvAPI.prototype.sendToAv = function (key, avData) {
        var jsonAVdata = JSON.stringify(avData);
        console.log("se tiene este json que se va a mandar a AV \n" + jsonAVdata + "\ncon key \n" + key);
        var myWindow = window;
        while (myWindow !== myWindow.parent) {
            myWindow = myWindow.parent;
        }
        myWindow.postMessage({ type: 'setTraza', key: key, info: jsonAVdata }, '*');
    };
    AvAPI.prototype.finish = function () {
        try {
            this.trace('AV:::Finish');
            return true;
        }
        catch (e) {
            this.trace('AV Api No encontrada');
            return false;
        }
    };
    AvAPI.prototype.setDataToStore = function (data) {
        console.warn('setDataToStore::: Not available in WC');
    };
    AvAPI.prototype.getDataStored = function () {
        console.warn('getDataStored::: Not available in WC');
        return null;
        ;
    };
    return AvAPI;
}(traceability_api_contract_1.TraceabilityApiContract));
exports.AvAPI = AvAPI;


/***/ }),

/***/ "./src/traceability/types/scorm-api.ts":
/*!*********************************************!*\
  !*** ./src/traceability/types/scorm-api.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScormAPI = void 0;
var traceability_api_contract_1 = __webpack_require__(/*! ./traceability-api.contract */ "./src/traceability/types/traceability-api.contract.ts");
var VERSION;
(function (VERSION) {
    VERSION["SCORM_2004"] = "2004";
    VERSION["SCORM_12"] = "1.2";
})(VERSION || (VERSION = {}));
var ScormAPI = (function (_super) {
    __extends(ScormAPI, _super);
    function ScormAPI() {
        var _this = _super.call(this) || this;
        _this._apiHandle = null;
        _this._connectionActive = false;
        _this._handleCompletionStatus = true;
        _this._handleExitMode = true;
        _this._countInteractions = 0;
        return _this;
    }
    Object.defineProperty(ScormAPI.prototype, "connectionActive", {
        get: function () {
            return this._connectionActive;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScormAPI.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: false,
        configurable: true
    });
    ScormAPI.prototype.setMaxScore = function (score) {
        this.setData("cmi.core.score.max", String(score));
        this.setData("cmi.objectives.0.score.max", String(score));
        this.saveData();
        this._maxScore = score;
    };
    ScormAPI.prototype.setMinScore = function (score) {
        this.setData("cmi.core.score.min", String(score));
        this.setData("cmi.objectives.0.score.min", String(score));
        this.setData("cmi.objectives.0.score.raw", String(score));
        this.saveData();
        this._minScore = score;
    };
    ScormAPI.prototype.initialize = function () {
        var success = false, completionStatus = this._completionStatusData, traceMsgPrefix = "SCORM::initialize ";
        this.trace("initialize called.");
        if (!this.connectionActive) {
            var API = this.getAPIHandle(), errorCode = 0;
            if (API) {
                switch (this.version) {
                    case VERSION.SCORM_12:
                        success = this.makeBoolean(API.LMSInitialize(""));
                        break;
                    case VERSION.SCORM_2004:
                        success = this.makeBoolean(API.Initialize(""));
                        break;
                }
                if (success) {
                    errorCode = this.debugGetCode();
                    if (errorCode !== null && errorCode === 0) {
                        this._countInteractions = Number(this.getData("cmi.interactions._count"));
                        this._connectionActive = true;
                        this._startTime = new Date().getTime() / 1000;
                        if (this.getData("cmi.core.entry") == "ab-initio") {
                            this.setData("cmi.core.lesson_location", location.href);
                            this.setData("cmi.core.score.max", String(this.getMaxScore()));
                            this.setData("cmi.core.score.min", String(this.getMinScore()));
                            this.setData("cmi.core.score.raw", String(this.getMinScore()));
                            this.setData("cmi.objectives.0.id", "objetivo_0");
                            this.setData("cmi.objectives.0.status", "incomplete");
                            this.setData("cmi.objectives.0.score.max", String(this.getMaxScore()));
                            this.setData("cmi.objectives.0.score.min", String(this.getMinScore()));
                            this.setData("cmi.objectives.0.score.raw", String(this.getMinScore()));
                            this.setData("cmi.interactions." + this._countInteractions + ".id", "interaccion_0");
                            this.setData("cmi.interactions." + this._countInteractions + ".objectives.0.id", "objetivo_0");
                        }
                        if (this._handleCompletionStatus) {
                            completionStatus = this.getStatus();
                            if (completionStatus) {
                                switch (this._completionStatusData) {
                                    case "not attempted":
                                        this.setStatus("incomplete");
                                        break;
                                    case "unknown":
                                        this.setStatus("incomplete");
                                        break;
                                }
                            }
                        }
                        this.saveData();
                        this.debugShowInfo();
                    }
                    else {
                        success = false;
                        this.trace(traceMsgPrefix + "failed. \nError code: " + errorCode + " \nError info: " + this.debugGetInfo(String(errorCode)));
                    }
                }
                else {
                    errorCode = this.debugGetCode();
                    if (errorCode !== null && errorCode !== 0) {
                        this.trace(traceMsgPrefix + "failed. \nError code: " + errorCode + " \nError info: " + this.debugGetInfo(String(errorCode)));
                    }
                    else {
                        this.trace(traceMsgPrefix + "failed: No response from server.");
                    }
                }
            }
            else {
                this.trace(traceMsgPrefix + "failed: API is null.");
            }
        }
        else {
            this.trace(traceMsgPrefix + "aborted: Connection already active.");
        }
        return success;
    };
    ScormAPI.prototype.complete = function (score) {
        //if (score === void 0) { score = null; }
        try {
            this._score = score ;
            this._startTime = this.getStartTime() || new Date().getTime() / 1000;
            this._endTime = new Date().getTime() / 1000;
            var digitalObjectDuration = this.calculateDuration(this.getStartTime(), this.getEndTime());
            this.setData("cmi.interactions." + this._countInteractions + ".time", digitalObjectDuration);
            if (this.getScore() >= (this.getMaxScore() / 2)) {
                this.setData("cmi.objectives.0.score.raw", this.getScore());
                this.setData("cmi.objectives.0.status", "passed");
                this.setData("cmi.core.score.raw", this.getScore());
                this.setStatus("passed");
            }
            else {
                this.setData("cmi.objectives.0.score.raw", this.getScore());
                this.setData("cmi.objectives.0.status", "failed");
                this.setData("cmi.core.score.raw", this.getScore());
                this.setStatus("failed");
            }
            this.saveData();
            this.debugShowInfo();
            return true;
        }
        catch (e) {
            this.trace('Scorm Api No encontrada');
            return false;
        }
    };
    ScormAPI.prototype.finish = function () {
        var success = false, traceMsgPrefix = "SCORM::Finish ";
        if (this.connectionActive) {
            var API = this.getAPIHandle(), errorCode = 0;
            if (API) {
                if (this._handleExitMode && !this._exitStatusData) {
                    if (this._completionStatusData !== "completed" && this._completionStatusData !== "passed") {
                        switch (this.version) {
                            case VERSION.SCORM_12:
                                success = this.setData("cmi.core.exit", "suspend");
                                break;
                            case VERSION.SCORM_2004:
                                success = this.setData("cmi.exit", "suspend");
                                break;
                        }
                    }
                    else {
                        switch (this.version) {
                            case VERSION.SCORM_12:
                                success = this.setData("cmi.core.exit", "logout");
                                break;
                            case VERSION.SCORM_2004:
                                success = this.setData("cmi.exit", "normal");
                                break;
                        }
                    }
                }
                switch (this.version) {
                    case VERSION.SCORM_12:
                        success = this.makeBoolean(API.LMSFinish(""));
                        break;
                    case VERSION.SCORM_2004:
                        success = this.makeBoolean(API.Terminate(""));
                        break;
                }
                if (success) {
                    this._connectionActive = false;
                }
                else {
                    errorCode = this.debugGetCode();
                    this.trace(traceMsgPrefix + "failed. \nError code: " + errorCode + " \nError info: " + this.debugGetInfo(String(errorCode)));
                }
            }
            else {
                this.trace(traceMsgPrefix + "failed: API is null.");
            }
        }
        else {
            this.trace(traceMsgPrefix + "aborted: Connection already terminated.");
        }
        this.debugShowInfo();
        return success;
    };
    ScormAPI.prototype.setDataToStore = function (data) {
        this.setData("cmi.suspend_data", data);
        this.saveData();
    };
    ScormAPI.prototype.getDataStored = function () {
        return this.getData("cmi.suspend_data");
    };
    ScormAPI.prototype.getAPIHandle = function () {
        if (this._apiHandle == null) {
            this._apiHandle = this.getAPI();
        }
        return this._apiHandle;
    };
    ScormAPI.prototype.getAPI = function () {
        var theAPI = this.findAPI(window);
        if ((theAPI == null) && (window.opener != null) && (typeof (window.opener) != "undefined")) {
            theAPI = this.findAPI(window.opener);
        }
        if (theAPI == null) {
            throw new Error("No encuentra API Scorm");
        }
        return theAPI;
    };
    ScormAPI.prototype.findAPI = function (win) {
        var findAPITries = 0;
        var API = null;
        while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
            findAPITries++;
            if (findAPITries > 7) {
                console.info("Error finding API -- too deeply nested.");
                return null;
            }
            win = win.parent;
        }
        if (this.version) {
            switch (this.version) {
                case "2004":
                    if (win.API_1484_11) {
                        API = win.API_1484_11;
                    }
                    else {
                        this.trace("SCORM version 2004 was specified by user, but API_1484_11 cannot be found.");
                    }
                    break;
                case "1.2":
                    if (win.API) {
                        API = win.API;
                    }
                    else {
                        this.trace(" SCORM version 1.2 was specified by user, but API cannot be found.");
                    }
                    break;
            }
        }
        else {
            if (win.API_1484_11) {
                this._version = VERSION.SCORM_2004;
                API = win.API_1484_11;
            }
            else if (win.API) {
                this._version = VERSION.SCORM_12;
                API = win.API;
            }
        }
        if (API) {
            this.trace(" API found. Version: " + this.version);
            this.trace("API: " + API);
        }
        else {
            this.trace("Error finding API. \nFind attempts: " + findAPITries + ". \nFind attempt limit: " + 7);
        }
        return API;
    };
    ScormAPI.prototype.getStatus = function () {
        var cmi = "";
        switch (this.version) {
            case VERSION.SCORM_12:
                cmi = "cmi.core.lesson_status";
                break;
            case VERSION.SCORM_2004:
                cmi = "cmi.completion_status";
                break;
        }
        return this.getData(cmi);
    };
    ScormAPI.prototype.setStatus = function (status) {
        var success = false, traceMsgPrefix = "SCORM::setStatus::failed", cmi = "";
        switch (this.version) {
            case VERSION.SCORM_12:
                cmi = "cmi.core.lesson_status";
                break;
            case VERSION.SCORM_2004:
                cmi = "cmi.completion_status";
                break;
        }
        if (status !== null) {
            success = this.setData(cmi, status);
        }
        else {
            success = false;
            this.trace(traceMsgPrefix + ": status was not specified.");
        }
        return success;
    };
    ScormAPI.prototype.getData = function (parameter) {
        var value = null, traceMsgPrefix = "SCORM::getData(" + parameter + ") ";
        if (this.connectionActive) {
            var API = this.getAPIHandle(), errorCode = 0;
            if (API) {
                switch (this.version) {
                    case VERSION.SCORM_12:
                        value = API.LMSGetValue(parameter);
                        break;
                    case VERSION.SCORM_2004:
                        value = API.GetValue(parameter);
                        break;
                }
                errorCode = this.debugGetCode();
                if (value !== "" && errorCode === 0) {
                    switch (parameter) {
                        case "cmi.core.lesson_status":
                        case "cmi.completion_status":
                            this._completionStatusData = value;
                            break;
                        case "cmi.core.exit":
                        case "cmi.exit":
                            this._exitStatusData = value;
                            break;
                    }
                }
                else {
                    this.trace(traceMsgPrefix + "failed. \nError code: " + errorCode + "\nError info: " + this.debugGetInfo(String(errorCode)));
                }
            }
            else {
                this.trace(traceMsgPrefix + "failed: API is null.");
            }
        }
        else {
            this.trace(traceMsgPrefix + "failed: API connection is inactive.");
        }
        this.trace(traceMsgPrefix + " value: " + value);
        return String(value);
    };
    ScormAPI.prototype.setData = function (parameter, value) {
        var success = false, traceMsgPrefix = "SCORM::setData(" + parameter + ") ";
        if (this.connectionActive) {
            var API = this.getAPIHandle(), errorCode = 0;
            if (API) {
                switch (this.version) {
                    case VERSION.SCORM_12:
                        success = this.makeBoolean(API.LMSSetValue(parameter, value));
                        break;
                    case VERSION.SCORM_2004:
                        success = this.makeBoolean(API.SetValue(parameter, value));
                        break;
                }
                if (success) {
                    if (parameter === "cmi.core.lesson_status" || parameter === "cmi.completion_status") {
                        this._completionStatusData = value;
                    }
                }
                else {
                    this.trace(traceMsgPrefix + "failed. \nError code: " + errorCode + ". \nError info: " + this.debugGetInfo(String(errorCode)));
                }
            }
            else {
                this.trace(traceMsgPrefix + "failed: API is null.");
            }
        }
        else {
            this.trace(traceMsgPrefix + "failed: API connection is inactive.");
        }
        return success;
    };
    ScormAPI.prototype.saveData = function () {
        var success = false, traceMsgPrefix = "SCORM::saveData::failed";
        if (this.connectionActive) {
            var API = this.getAPIHandle();
            if (API) {
                switch (this.version) {
                    case VERSION.SCORM_12:
                        success = this.makeBoolean(API.LMSCommit(""));
                        break;
                    case VERSION.SCORM_2004:
                        success = this.makeBoolean(API.Commit(""));
                        break;
                }
            }
            else {
                this.trace(traceMsgPrefix + ": API is null.");
            }
        }
        else {
            this.trace(traceMsgPrefix + ": API connection is inactive.");
        }
        return success;
    };
    ScormAPI.prototype.debugGetCode = function () {
        var API = this.getAPIHandle(), code = 0;
        if (API) {
            switch (this.version) {
                case VERSION.SCORM_12:
                    code = parseInt(API.LMSGetLastError(), 10);
                    break;
                case VERSION.SCORM_2004:
                    code = parseInt(API.GetLastError(), 10);
                    break;
            }
        }
        else {
            this.trace("SCORM::debugGetCode failed: API is null.");
        }
        return code;
    };
    ScormAPI.prototype.debugGetInfo = function (errorCode) {
        var API = this.getAPIHandle(), result = "";
        if (API) {
            switch (this.version) {
                case VERSION.SCORM_12:
                    result = API.LMSGetErrorString(errorCode.toString());
                    break;
                case VERSION.SCORM_2004:
                    result = API.GetErrorString(errorCode.toString());
                    break;
            }
        }
        else {
            this.trace("SCORM::debugGetInfo failed: API is null.");
        }
        return String(result);
    };
    ScormAPI.prototype.debugGetDiasnosticInfo = function (errorCode) {
        var API = this.getAPIHandle(), result = "";
        if (API) {
            switch (this.version) {
                case VERSION.SCORM_12:
                    result = API.LMSGetDiagnostic(errorCode);
                    break;
                case VERSION.SCORM_2004:
                    result = API.GetDiagnostic(errorCode);
                    break;
            }
        }
        else {
            this.trace("SCORM::debugGetDiagnosticInfo failed: API is null.");
        }
        return String(result);
    };
    ScormAPI.prototype.debugShowInfo = function () {
        var message0 = "cmi.core.student_id: " + this.getData("cmi.core.student_id") + "\n" +
            "cmi.core.student_name: " + this.getData("cmi.core.student_name") + "\n" +
            "cmi.core.lesson_location: " + this.getData("cmi.core.lesson_location") + "\n" +
            "cmi.core.credit: " + this.getData("cmi.core.credit") + "\n" +
            "cmi.core.lesson_status: " + this.getData("cmi.core.lesson_status") + "\n" +
            "cmi.core.entry: " + this.getData("cmi.core.entry") + "\n" +
            "cmi.core.score.raw: " + this.getData("cmi.core.score.raw") + "\n" +
            "cmi.core.score.min: " + this.getData("cmi.core.score.min") + "\n" +
            "cmi.core.score.max: " + this.getData("cmi.core.score.max") + "\n" +
            "cmi.core.total_time: " + this.getData("cmi.core.total_time") + "\n" +
            "cmi.core.lesson_mode: " + this.getData("cmi.core.lesson_mode") + "\n" +
            "cmi.launch_data: " + this.getData("cmi.launch_data") + "\n" +
            "cmi.comments: " + this.getData("cmi.comments") + "\n" +
            "cmi.commnets_from_lms: " + this.getData("cmi.commnets_from_lms") + "\n" +
            "cmi.suspend_data: " + this.getData("cmi.suspend_data") + "\n" +
            "cmi.student_data.mastery_score: " + this.getData("cmi.student_data.mastery_score") + "\n" +
            "cmi.student_data.max_time_allowed: " + this.getData("cmi.student_data.max_time_allowed") + "\n" +
            "cmi.student_data.time_limit_action: " + this.getData("cmi.student_data.time_limit_action") + "\n" +
            "cmi.student_preference.audio: " + this.getData("cmi.student_preference.audio") + "\n" +
            "cmi.student_preference.language: " + this.getData("cmi.student_preference.language") + "\n" +
            "cmi.student_preference.speed: " + this.getData("cmi.student_preference.speed") + "\n" +
            "cmi.student_preference.text: " + this.getData("cmi.student_preference.text") + "\n" +
            "";
        this.trace(message0);
        var countObjetives = Number(this.getData("cmi.objectives._count"));
        var message1 = "cmi.objectives._count:" + countObjetives + "\n\n";
        for (var i = 0; i < countObjetives; i++) {
            message1 += ("cmi.objectives." + i + ".id: " + this.getData("cmi.objectives." + i + ".id") + "\n");
            message1 += ("cmi.objectives." + i + ".status: " + this.getData("cmi.objectives." + i + ".status") + "\n");
            message1 += ("cmi.objectives." + i + ".score.raw: " + this.getData("cmi.objectives." + i + ".score.raw") + "\n");
            message1 += ("cmi.objectives." + i + ".score.max: " + this.getData("cmi.objectives." + i + ".score.max") + "\n");
            message1 += ("cmi.objectives." + i + ".score.min: " + this.getData("cmi.objectives." + i + ".score.min") + "\n");
        }
        this.trace(message1);
        var message2 = "";
        var countInteractions = Number(this.getData("cmi.interactions._count"));
        message2 += ("cmi.interactions._count: " + countInteractions + "\n" + "\n");
        message2 += ("cmi.interactions._children: " + this.getData("cmi.interactions._children") + "\n");
        for (var i = 0; i < countInteractions; i++) {
            message2 += ("cmi.interactions." + i + ".id: " + this.getData("cmi.interactions." + i + ".id") + "\n");
            message2 += ("cmi.interactions." + i + ".time: " + this.getData("cmi.interactions." + i + ".time") + "\n");
            message2 += ("cmi.interactions." + i + ".type: " + this.getData("cmi.interactions." + i + ".type") + "\n");
            message2 += ("cmi.interactions." + i + ".weighting: " + this.getData("cmi.interactions." + i + ".weighting") + "\n");
            message2 += ("cmi.interactions." + i + ".result: " + this.getData("cmi.interactions." + i + ".result") + "\n");
            message2 += ("cmi.interactions." + i + ".latency: " + this.getData("cmi.interactions." + i + ".latency") + "\n");
            message2 += ("cmi.interactions." + i + ".student_response: " + this.getData("cmi.interactions." + i + ".student_response") + "\n");
            var countInteractionsObjective = Number(this.getData("cmi.interactions." + i + ".objectives._count"));
            message2 += ("cmi.interactions." + i + ".objectives._count: " + countInteractionsObjective + "\n");
            for (var k = 0; k < countInteractionsObjective; k++) {
                message2 += "cmi.interactions." + i + ".objectives." + k + ".id: " + this.getData("cmi.interactions." + i + ".objectives." + k + ".id") + "\n";
            }
            var countInteractionsCorrectResponses = Number(this.getData("cmi.interactions." + i + ".corect_responses._count"));
            message2 += ("cmi.interactions." + i + ".correct_responses._count: " + countInteractionsCorrectResponses + "\n");
            for (var k = 0; k < countInteractionsCorrectResponses; k++) {
                message2 += "cmi.interactions." + i + ".correct_responses." + k + ".pattern: " + this.getData("cmi.interactions." + i + ".correct_responses." + k + ".pattern") + "\n";
            }
        }
        this.trace(message2);
        return;
    };
    return ScormAPI;
}(traceability_api_contract_1.TraceabilityApiContract));
exports.ScormAPI = ScormAPI;


/***/ }),

/***/ "./src/traceability/types/traceability-api.contract.ts":
/*!*************************************************************!*\
  !*** ./src/traceability/types/traceability-api.contract.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceabilityApiContract = void 0;
var manage_url_1 = __webpack_require__(/*! ../helpers/manage-url */ "./src/traceability/helpers/manage-url.ts");
var TraceabilityApiContract = (function () {
    function TraceabilityApiContract() {
        this._debug = true;
        this._maxScore = 100;
        this._minScore = 0;
    }
    TraceabilityApiContract.prototype.getDebug = function () {
        return this._debug;
    };
    TraceabilityApiContract.prototype.setDebug = function (debug) {
        this._debug = debug;
    };
    TraceabilityApiContract.prototype.getMaxScore = function () {
        return this._maxScore;
    };
    TraceabilityApiContract.prototype.setMaxScore = function (score) {
        this._maxScore = score;
    };
    TraceabilityApiContract.prototype.getMinScore = function () {
        return this._minScore;
    };
    TraceabilityApiContract.prototype.setMinScore = function (score) {
        this._minScore = score;
    };
    TraceabilityApiContract.prototype.getScore = function () {
        return this._score;
    };
    TraceabilityApiContract.prototype.getStartTime = function () {
        return this._startTime;
    };
    TraceabilityApiContract.prototype.getEndTime = function () {
        return this._endTime;
    };
    TraceabilityApiContract.prototype.calculateDuration = function (startTime, endTime) {
        var duration = endTime - startTime;
        var digitalObjectDuration = "";
        var myValue = (Math.floor(duration / 3600000));
        if (myValue < 10) {
            digitalObjectDuration += "0";
        }
        digitalObjectDuration += myValue + ":";
        duration = duration % 3600000;
        myValue = (Math.floor(duration / 60000));
        if (myValue < 10) {
            digitalObjectDuration += "0";
        }
        digitalObjectDuration += myValue + ":";
        duration = duration % 60000;
        myValue = (Math.floor(duration / 1000));
        if (myValue < 10) {
            digitalObjectDuration += "0";
        }
        digitalObjectDuration += myValue + ".";
        duration = duration % 1000;
        myValue = (Math.floor(duration / 10));
        digitalObjectDuration += myValue;
        return digitalObjectDuration;
    };
    TraceabilityApiContract.prototype.getDataFromUrl = function () {
        return {
            unitId: manage_url_1.getURLParameter('unitId') || "unitX",
            activityId: manage_url_1.getURLParameter('activityId') || "activityX",
            resourceId: manage_url_1.getURLParameter('resourceId') || "resourceX",
        };
    };
    TraceabilityApiContract.prototype.trace = function (msg) {
        if (this.getDebug()) {
            if (window.console) {
                console.log(msg);
            }
            else {
            }
        }
    };
    TraceabilityApiContract.prototype.makeBoolean = function (string) {
        switch (string.toLowerCase()) {
            case "true":
            case "yes":
            case "1": return true;
            case "false":
            case "no":
            case "0":
            case null: return false;
            default: return Boolean(string);
        }
    };
    return TraceabilityApiContract;
}());
exports.TraceabilityApiContract = TraceabilityApiContract;


/***/ }),

/***/ "./src/traceability/types/traceability-api.factory.ts":
/*!************************************************************!*\
  !*** ./src/traceability/types/traceability-api.factory.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceabilityApiFactory = void 0;
var manage_url_1 = __webpack_require__(/*! ../helpers/manage-url */ "./src/traceability/helpers/manage-url.ts");
var scorm_api_1 = __webpack_require__(/*! ./scorm-api */ "./src/traceability/types/scorm-api.ts");
var webcontent_api_1 = __webpack_require__(/*! ./webcontent-api */ "./src/traceability/types/webcontent-api.ts");
var av_api_1 = __webpack_require__(/*! ./av-api */ "./src/traceability/types/av-api.ts");
var TraceabilityApiFactory = (function () {
    function TraceabilityApiFactory(http) {
        this.http = http;
    }
    TraceabilityApiFactory.prototype.factoryMethod = function () {
        var scorm = manage_url_1.getURLParameter('scorm');
        var trackId = manage_url_1.getURLParameter('trackId');
        var av = manage_url_1.getURLParameter('av');
        if (String(scorm) == 'true') {
            return new scorm_api_1.ScormAPI();
        }
        if (trackId && trackId != "" && trackId != "undefined") {
            return new webcontent_api_1.WebcontentAPI(this.http);
        }
        if (String(av) == 'true') {
            return new av_api_1.AvAPI();
        }
        throw new Error("No encuentra traza");
    };
    return TraceabilityApiFactory;
}());
exports.TraceabilityApiFactory = TraceabilityApiFactory;


/***/ }),

/***/ "./src/traceability/types/webcontent-api.ts":
/*!**************************************************!*\
  !*** ./src/traceability/types/webcontent-api.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebcontentAPI = void 0;
var traceability_api_contract_1 = __webpack_require__(/*! ./traceability-api.contract */ "./src/traceability/types/traceability-api.contract.ts");
var manage_url_1 = __webpack_require__(/*! ../helpers/manage-url */ "./src/traceability/helpers/manage-url.ts");
var WebcontentAPI = (function (_super) {
    __extends(WebcontentAPI, _super);
    function WebcontentAPI(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    WebcontentAPI.prototype.initialize = function () {
        try {
            this._startTime = new Date().getTime() / 1000;
            this.trace('WC:::Initialized');
            return true;
        }
        catch (e) {
            this.trace('WC Api No encontrada');
            return false;
        }
    };
    WebcontentAPI.prototype.complete = function (score) {
        var _this = this;
        if (score === void 0) { score = null; }
        try {
            var data = this.getDataFromUrl();
            this._startTime = this.getStartTime() || new Date().getTime() / 1000;
            this._endTime = new Date().getTime() / 1000;
            var duration = Math.round(this._endTime - this._startTime);
            var oRAo = {};
            oRAo.r_minCalificacion = this.getMinScore();
            oRAo.r_calificacion = score;
            oRAo.r_maxCalificacion = this.getMaxScore();
            oRAo.r_intentos = 1;
            oRAo.r_maxIntentos = 1;
            oRAo.r_estado = "FINALIZADO";
            oRAo.r_uRLVerResultados = "";
            oRAo.r_fechaHoraInicio = this._startTime;
            oRAo.r_maxDuracion = 86400;
            oRAo.r_duracion = duration;
            var oRDo = {};
            oRDo.rd_idDetalle = "";
            oRDo.rd_idTipoDetalle = "PREGUNTA";
            oRDo.rd_descripcion = "Descripcion";
            oRDo.rd_minCalificacion = 0;
            oRDo.rd_calificacion = this.getScore();
            oRDo.rd_maxCalificacion = this.getMaxScore();
            oRDo.rd_intentos = 1;
            oRDo.rd_maxIntentos = 1;
            oRDo.rd_peso = 1;
            oRDo.rd_info = "";
            oRDo.rd_fechaHoraInicio = this._startTime;
            oRDo.rd_maxDuracion = 86400;
            oRDo.rd_duracion = duration;
            oRDo.r_calificacion = score;
            var aRD = [];
            aRD.push(oRDo);
            var oJSo = {};
            var urlToken = manage_url_1.getURLParameter('token') || "";
            if (urlToken && urlToken != '') {
                oJSo.token = urlToken;
            }
            oJSo.trackId = manage_url_1.getURLParameter('trackId');
            oJSo.unitID = data.unitId;
            if (data.activityId.indexOf("READ_Unidad_") < 0) {
                oJSo.activityID = data.activityId;
            }
            oJSo.result = oRAo;
            oJSo.detail = {};
            oJSo.detail.resultDetail = aRD;
            var params = 'data='+JSON.stringify(oJSo);


          this.http.post("/LicenseManager/tracking/", params).then(function (res) {
                _this.trace('complete WC response!!!');
                _this.trace(res);
            }, function (err) {
                _this.trace('WC data didnt send');
            });
            this.trace('WC:::completed');
            return true;
        }
        catch (e) {
            this.trace('WC Api No encontrada');
            return false;
        }
    };
    WebcontentAPI.prototype.finish = function () {
        try {
            this.trace('WC:::Finish');
            return true;
        }
        catch (e) {
            this.trace('WC Api No encontrada');
            return false;
        }
    };
    WebcontentAPI.prototype.setDataToStore = function (data) {
        console.warn('setDataToStore::: Not available in WC');
    };
    WebcontentAPI.prototype.getDataStored = function () {
        console.warn('getDataStored::: Not available in WC');
        return null;
        ;
    };
    return WebcontentAPI;
}(traceability_api_contract_1.TraceabilityApiContract));
exports.WebcontentAPI = WebcontentAPI;


/***/ })

/******/ });
});
//# sourceMappingURL=santillana_traceability_library.js.map
