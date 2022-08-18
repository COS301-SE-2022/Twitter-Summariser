var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@middy/core/index.js
var require_core = __commonJS({
  "node_modules/@middy/core/index.js"(exports, module2) {
    "use strict";
    var middy2 = (baseHandler = () => {
    }, plugin) => {
      var _plugin$beforePrefetc;
      plugin === null || plugin === void 0 ? void 0 : (_plugin$beforePrefetc = plugin.beforePrefetch) === null || _plugin$beforePrefetc === void 0 ? void 0 : _plugin$beforePrefetc.call(plugin);
      const beforeMiddlewares = [];
      const afterMiddlewares = [];
      const onErrorMiddlewares = [];
      const instance = (event = {}, context = {}) => {
        var _plugin$requestStart;
        plugin === null || plugin === void 0 ? void 0 : (_plugin$requestStart = plugin.requestStart) === null || _plugin$requestStart === void 0 ? void 0 : _plugin$requestStart.call(plugin);
        const request = {
          event,
          context,
          response: void 0,
          error: void 0,
          internal: {}
        };
        return runRequest(request, [...beforeMiddlewares], baseHandler, [...afterMiddlewares], [...onErrorMiddlewares], plugin);
      };
      instance.use = (middlewares) => {
        if (Array.isArray(middlewares)) {
          for (const middleware of middlewares) {
            instance.applyMiddleware(middleware);
          }
          return instance;
        }
        return instance.applyMiddleware(middlewares);
      };
      instance.applyMiddleware = (middleware) => {
        const {
          before,
          after,
          onError
        } = middleware;
        if (!before && !after && !onError) {
          throw new Error('Middleware must be an object containing at least one key among "before", "after", "onError"');
        }
        if (before)
          instance.before(before);
        if (after)
          instance.after(after);
        if (onError)
          instance.onError(onError);
        return instance;
      };
      instance.before = (beforeMiddleware) => {
        beforeMiddlewares.push(beforeMiddleware);
        return instance;
      };
      instance.after = (afterMiddleware) => {
        afterMiddlewares.unshift(afterMiddleware);
        return instance;
      };
      instance.onError = (onErrorMiddleware) => {
        onErrorMiddlewares.push(onErrorMiddleware);
        return instance;
      };
      instance.__middlewares = {
        before: beforeMiddlewares,
        after: afterMiddlewares,
        onError: onErrorMiddlewares
      };
      return instance;
    };
    var runRequest = async (request, beforeMiddlewares, baseHandler, afterMiddlewares, onErrorMiddlewares, plugin) => {
      try {
        await runMiddlewares(request, beforeMiddlewares, plugin);
        if (request.response === void 0) {
          var _plugin$beforeHandler, _plugin$afterHandler;
          plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeHandler = plugin.beforeHandler) === null || _plugin$beforeHandler === void 0 ? void 0 : _plugin$beforeHandler.call(plugin);
          request.response = await baseHandler(request.event, request.context);
          plugin === null || plugin === void 0 ? void 0 : (_plugin$afterHandler = plugin.afterHandler) === null || _plugin$afterHandler === void 0 ? void 0 : _plugin$afterHandler.call(plugin);
          await runMiddlewares(request, afterMiddlewares, plugin);
        }
      } catch (e) {
        request.response = void 0;
        request.error = e;
        try {
          await runMiddlewares(request, onErrorMiddlewares, plugin);
        } catch (e2) {
          e2.originalError = request.error;
          request.error = e2;
          throw request.error;
        }
        if (request.response === void 0)
          throw request.error;
      } finally {
        var _plugin$requestEnd;
        await (plugin === null || plugin === void 0 ? void 0 : (_plugin$requestEnd = plugin.requestEnd) === null || _plugin$requestEnd === void 0 ? void 0 : _plugin$requestEnd.call(plugin, request));
      }
      return request.response;
    };
    var runMiddlewares = async (request, middlewares, plugin) => {
      for (const nextMiddleware of middlewares) {
        var _plugin$beforeMiddlew, _plugin$afterMiddlewa;
        plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeMiddlew = plugin.beforeMiddleware) === null || _plugin$beforeMiddlew === void 0 ? void 0 : _plugin$beforeMiddlew.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name);
        const res = await (nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware(request));
        plugin === null || plugin === void 0 ? void 0 : (_plugin$afterMiddlewa = plugin.afterMiddleware) === null || _plugin$afterMiddlewa === void 0 ? void 0 : _plugin$afterMiddlewa.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name);
        if (res !== void 0) {
          request.response = res;
          return;
        }
      }
    };
    module2.exports = middy2;
  }
});

// node_modules/@middy/util/codes.json
var require_codes = __commonJS({
  "node_modules/@middy/util/codes.json"(exports, module2) {
    module2.exports = {
      "100": "Continue",
      "101": "Switching Protocols",
      "102": "Processing",
      "103": "Early Hints",
      "200": "OK",
      "201": "Created",
      "202": "Accepted",
      "203": "Non-Authoritative Information",
      "204": "No Content",
      "205": "Reset Content",
      "206": "Partial Content",
      "207": "Multi-Status",
      "208": "Already Reported",
      "226": "IM Used",
      "300": "Multiple Choices",
      "301": "Moved Permanently",
      "302": "Found",
      "303": "See Other",
      "304": "Not Modified",
      "305": "Use Proxy",
      "306": "(Unused)",
      "307": "Temporary Redirect",
      "308": "Permanent Redirect",
      "400": "Bad Request",
      "401": "Unauthorized",
      "402": "Payment Required",
      "403": "Forbidden",
      "404": "Not Found",
      "405": "Method Not Allowed",
      "406": "Not Acceptable",
      "407": "Proxy Authentication Required",
      "408": "Request Timeout",
      "409": "Conflict",
      "410": "Gone",
      "411": "Length Required",
      "412": "Precondition Failed",
      "413": "Payload Too Large",
      "414": "URI Too Long",
      "415": "Unsupported Media Type",
      "416": "Range Not Satisfiable",
      "417": "Expectation Failed",
      "418": "I'm a teapot",
      "421": "Misdirected Request",
      "422": "Unprocessable Entity",
      "423": "Locked",
      "424": "Failed Dependency",
      "425": "Unordered Collection",
      "426": "Upgrade Required",
      "428": "Precondition Required",
      "429": "Too Many Requests",
      "431": "Request Header Fields Too Large",
      "451": "Unavailable For Legal Reasons",
      "500": "Internal Server Error",
      "501": "Not Implemented",
      "502": "Bad Gateway",
      "503": "Service Unavailable",
      "504": "Gateway Timeout",
      "505": "HTTP Version Not Supported",
      "506": "Variant Also Negotiates",
      "507": "Insufficient Storage",
      "508": "Loop Detected",
      "509": "Bandwidth Limit Exceeded",
      "510": "Not Extended",
      "511": "Network Authentication Required"
    };
  }
});

// node_modules/@middy/util/index.js
var require_util = __commonJS({
  "node_modules/@middy/util/index.js"(exports, module2) {
    "use strict";
    var {
      Agent
    } = require("https");
    var awsClientDefaultOptions = {
      httpOptions: {
        agent: new Agent({
          secureProtocol: "TLSv1_2_method"
        })
      }
    };
    var createPrefetchClient = (options) => {
      const awsClientOptions = {
        ...awsClientDefaultOptions,
        ...options.awsClientOptions
      };
      const client = new options.AwsClient(awsClientOptions);
      if (options.awsClientCapture) {
        return options.awsClientCapture(client);
      }
      return client;
    };
    var createClient = async (options, request) => {
      let awsClientCredentials = {};
      if (options.awsClientAssumeRole) {
        if (!request)
          throw new Error("Request required when assuming role");
        awsClientCredentials = await getInternal({
          credentials: options.awsClientAssumeRole
        }, request);
      }
      awsClientCredentials = {
        ...awsClientCredentials,
        ...options.awsClientOptions
      };
      return createPrefetchClient({
        ...options,
        awsClientOptions: awsClientCredentials
      });
    };
    var canPrefetch = (options) => {
      return !(options !== null && options !== void 0 && options.awsClientAssumeRole) && !(options !== null && options !== void 0 && options.disablePrefetch);
    };
    var getInternal = async (variables, request) => {
      if (!variables || !request)
        return {};
      let keys = [];
      let values = [];
      if (variables === true) {
        keys = values = Object.keys(request.internal);
      } else if (typeof variables === "string") {
        keys = values = [variables];
      } else if (Array.isArray(variables)) {
        keys = values = variables;
      } else if (typeof variables === "object") {
        keys = Object.keys(variables);
        values = Object.values(variables);
      }
      const promises = [];
      for (const internalKey of values) {
        var _valuePromise;
        const pathOptionKey = internalKey.split(".");
        const rootOptionKey = pathOptionKey.shift();
        let valuePromise = request.internal[rootOptionKey];
        if (typeof ((_valuePromise = valuePromise) === null || _valuePromise === void 0 ? void 0 : _valuePromise.then) !== "function") {
          valuePromise = Promise.resolve(valuePromise);
        }
        promises.push(valuePromise.then((value) => pathOptionKey.reduce((p, c) => p === null || p === void 0 ? void 0 : p[c], value)));
      }
      values = await Promise.allSettled(promises);
      const errors = values.filter((res) => res.status === "rejected").map((res) => res.reason.message);
      if (errors.length)
        throw new Error(JSON.stringify(errors));
      return keys.reduce((obj, key, index) => ({
        ...obj,
        [sanitizeKey(key)]: values[index].value
      }), {});
    };
    var sanitizeKeyPrefixLeadingNumber = /^([0-9])/;
    var sanitizeKeyRemoveDisallowedChar = /[^a-zA-Z0-9]+/g;
    var sanitizeKey = (key) => {
      return key.replace(sanitizeKeyPrefixLeadingNumber, "_$1").replace(sanitizeKeyRemoveDisallowedChar, "_");
    };
    var cache = {};
    var processCache = (options, fetch = () => void 0, request) => {
      const {
        cacheExpiry,
        cacheKey
      } = options;
      if (cacheExpiry) {
        const cached = getCache(cacheKey);
        const unexpired = cached && (cacheExpiry < 0 || cached.expiry > Date.now());
        if (unexpired && cached.modified) {
          const value2 = fetch(request, cached.value);
          cache[cacheKey] = {
            value: {
              ...cached.value,
              ...value2
            },
            expiry: cached.expiry
          };
          return cache[cacheKey];
        }
        if (unexpired) {
          return {
            ...cached,
            cache: true
          };
        }
      }
      const value = fetch(request);
      const expiry = Date.now() + cacheExpiry;
      if (cacheExpiry) {
        cache[cacheKey] = {
          value,
          expiry
        };
      }
      return {
        value,
        expiry
      };
    };
    var getCache = (key) => {
      return cache[key];
    };
    var modifyCache = (cacheKey, value) => {
      if (!cache[cacheKey])
        return;
      cache[cacheKey] = {
        ...cache[cacheKey],
        value,
        modified: true
      };
    };
    var clearCache = (keys = null) => {
      var _keys;
      keys = (_keys = keys) !== null && _keys !== void 0 ? _keys : Object.keys(cache);
      if (!Array.isArray(keys))
        keys = [keys];
      for (const cacheKey of keys) {
        cache[cacheKey] = void 0;
      }
    };
    var jsonSafeParse = (string, reviver) => {
      if (typeof string !== "string")
        return string;
      const firstChar = string[0];
      if (firstChar !== "{" && firstChar !== "[" && firstChar !== '"')
        return string;
      try {
        return JSON.parse(string, reviver);
      } catch (e) {
      }
      return string;
    };
    var normalizeHttpResponse = (response) => {
      var _response$headers, _response;
      if (response === void 0) {
        response = {};
      } else if (Array.isArray(response) || typeof response !== "object" || response === null) {
        response = {
          body: response
        };
      }
      response.headers = (_response$headers = (_response = response) === null || _response === void 0 ? void 0 : _response.headers) !== null && _response$headers !== void 0 ? _response$headers : {};
      return response;
    };
    var statuses = require_codes();
    var {
      inherits
    } = require("util");
    var createErrorRegexp = /[^a-zA-Z]/g;
    var createError = (code, message, properties = {}) => {
      const name = statuses[code].replace(createErrorRegexp, "");
      const className = name.substr(-5) !== "Error" ? name + "Error" : name;
      function HttpError(message2) {
        const msg = message2 !== null && message2 !== void 0 ? message2 : statuses[code];
        const err = new Error(msg);
        Error.captureStackTrace(err, HttpError);
        Object.setPrototypeOf(err, HttpError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(HttpError, Error);
      const desc = Object.getOwnPropertyDescriptor(HttpError, "name");
      desc.value = className;
      Object.defineProperty(HttpError, "name", desc);
      Object.assign(HttpError.prototype, {
        status: code,
        statusCode: code,
        expose: code < 500
      }, properties);
      return new HttpError(message);
    };
    module2.exports = {
      createPrefetchClient,
      createClient,
      canPrefetch,
      getInternal,
      sanitizeKey,
      processCache,
      getCache,
      modifyCache,
      clearCache,
      jsonSafeParse,
      normalizeHttpResponse,
      createError
    };
  }
});

// node_modules/@middy/http-json-body-parser/index.js
var require_http_json_body_parser = __commonJS({
  "node_modules/@middy/http-json-body-parser/index.js"(exports, module2) {
    "use strict";
    var mimePattern = /^application\/(.+\+)?json(;.*)?$/;
    var defaults = {
      reviver: void 0
    };
    var httpJsonBodyParserMiddleware = (opts = {}) => {
      const options = {
        ...defaults,
        ...opts
      };
      const httpJsonBodyParserMiddlewareBefore = async (request) => {
        var _headers$ContentType;
        const {
          headers,
          body
        } = request.event;
        const contentTypeHeader = (_headers$ContentType = headers === null || headers === void 0 ? void 0 : headers["Content-Type"]) !== null && _headers$ContentType !== void 0 ? _headers$ContentType : headers === null || headers === void 0 ? void 0 : headers["content-type"];
        if (mimePattern.test(contentTypeHeader)) {
          try {
            const data = request.event.isBase64Encoded ? Buffer.from(body, "base64").toString() : body;
            request.event.rawBody = body;
            request.event.body = JSON.parse(data, options.reviver);
          } catch (err) {
            const {
              createError
            } = require_util();
            throw createError(422, "Content type defined as JSON but an invalid JSON was provided");
          }
        }
      };
      return {
        before: httpJsonBodyParserMiddlewareBefore
      };
    };
    module2.exports = httpJsonBodyParserMiddleware;
  }
});

// node_modules/event-target-shim/dist/event-target-shim.js
var require_event_target_shim = __commonJS({
  "node_modules/event-target-shim/dist/event-target-shim.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var privateData = /* @__PURE__ */ new WeakMap();
    var wrappers = /* @__PURE__ */ new WeakMap();
    function pd(event) {
      const retv = privateData.get(event);
      console.assert(
        retv != null,
        "'this' is expected an Event object, but got",
        event
      );
      return retv;
    }
    function setCancelFlag(data) {
      if (data.passiveListener != null) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
          console.error(
            "Unable to preventDefault inside passive event listener invocation.",
            data.passiveListener
          );
        }
        return;
      }
      if (!data.event.cancelable) {
        return;
      }
      data.canceled = true;
      if (typeof data.event.preventDefault === "function") {
        data.event.preventDefault();
      }
    }
    function Event(eventTarget, event) {
      privateData.set(this, {
        eventTarget,
        event,
        eventPhase: 2,
        currentTarget: eventTarget,
        canceled: false,
        stopped: false,
        immediateStopped: false,
        passiveListener: null,
        timeStamp: event.timeStamp || Date.now()
      });
      Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });
      const keys = Object.keys(event);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in this)) {
          Object.defineProperty(this, key, defineRedirectDescriptor(key));
        }
      }
    }
    Event.prototype = {
      get type() {
        return pd(this).event.type;
      },
      get target() {
        return pd(this).eventTarget;
      },
      get currentTarget() {
        return pd(this).currentTarget;
      },
      composedPath() {
        const currentTarget = pd(this).currentTarget;
        if (currentTarget == null) {
          return [];
        }
        return [currentTarget];
      },
      get NONE() {
        return 0;
      },
      get CAPTURING_PHASE() {
        return 1;
      },
      get AT_TARGET() {
        return 2;
      },
      get BUBBLING_PHASE() {
        return 3;
      },
      get eventPhase() {
        return pd(this).eventPhase;
      },
      stopPropagation() {
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.stopPropagation === "function") {
          data.event.stopPropagation();
        }
      },
      stopImmediatePropagation() {
        const data = pd(this);
        data.stopped = true;
        data.immediateStopped = true;
        if (typeof data.event.stopImmediatePropagation === "function") {
          data.event.stopImmediatePropagation();
        }
      },
      get bubbles() {
        return Boolean(pd(this).event.bubbles);
      },
      get cancelable() {
        return Boolean(pd(this).event.cancelable);
      },
      preventDefault() {
        setCancelFlag(pd(this));
      },
      get defaultPrevented() {
        return pd(this).canceled;
      },
      get composed() {
        return Boolean(pd(this).event.composed);
      },
      get timeStamp() {
        return pd(this).timeStamp;
      },
      get srcElement() {
        return pd(this).eventTarget;
      },
      get cancelBubble() {
        return pd(this).stopped;
      },
      set cancelBubble(value) {
        if (!value) {
          return;
        }
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.cancelBubble === "boolean") {
          data.event.cancelBubble = true;
        }
      },
      get returnValue() {
        return !pd(this).canceled;
      },
      set returnValue(value) {
        if (!value) {
          setCancelFlag(pd(this));
        }
      },
      initEvent() {
      }
    };
    Object.defineProperty(Event.prototype, "constructor", {
      value: Event,
      configurable: true,
      writable: true
    });
    if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
      Object.setPrototypeOf(Event.prototype, window.Event.prototype);
      wrappers.set(window.Event.prototype, Event);
    }
    function defineRedirectDescriptor(key) {
      return {
        get() {
          return pd(this).event[key];
        },
        set(value) {
          pd(this).event[key] = value;
        },
        configurable: true,
        enumerable: true
      };
    }
    function defineCallDescriptor(key) {
      return {
        value() {
          const event = pd(this).event;
          return event[key].apply(event, arguments);
        },
        configurable: true,
        enumerable: true
      };
    }
    function defineWrapper(BaseEvent, proto) {
      const keys = Object.keys(proto);
      if (keys.length === 0) {
        return BaseEvent;
      }
      function CustomEvent(eventTarget, event) {
        BaseEvent.call(this, eventTarget, event);
      }
      CustomEvent.prototype = Object.create(BaseEvent.prototype, {
        constructor: { value: CustomEvent, configurable: true, writable: true }
      });
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in BaseEvent.prototype)) {
          const descriptor = Object.getOwnPropertyDescriptor(proto, key);
          const isFunc = typeof descriptor.value === "function";
          Object.defineProperty(
            CustomEvent.prototype,
            key,
            isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key)
          );
        }
      }
      return CustomEvent;
    }
    function getWrapper(proto) {
      if (proto == null || proto === Object.prototype) {
        return Event;
      }
      let wrapper = wrappers.get(proto);
      if (wrapper == null) {
        wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
        wrappers.set(proto, wrapper);
      }
      return wrapper;
    }
    function wrapEvent(eventTarget, event) {
      const Wrapper = getWrapper(Object.getPrototypeOf(event));
      return new Wrapper(eventTarget, event);
    }
    function isStopped(event) {
      return pd(event).immediateStopped;
    }
    function setEventPhase(event, eventPhase) {
      pd(event).eventPhase = eventPhase;
    }
    function setCurrentTarget(event, currentTarget) {
      pd(event).currentTarget = currentTarget;
    }
    function setPassiveListener(event, passiveListener) {
      pd(event).passiveListener = passiveListener;
    }
    var listenersMap = /* @__PURE__ */ new WeakMap();
    var CAPTURE = 1;
    var BUBBLE = 2;
    var ATTRIBUTE = 3;
    function isObject(x) {
      return x !== null && typeof x === "object";
    }
    function getListeners(eventTarget) {
      const listeners = listenersMap.get(eventTarget);
      if (listeners == null) {
        throw new TypeError(
          "'this' is expected an EventTarget object, but got another value."
        );
      }
      return listeners;
    }
    function defineEventAttributeDescriptor(eventName) {
      return {
        get() {
          const listeners = getListeners(this);
          let node = listeners.get(eventName);
          while (node != null) {
            if (node.listenerType === ATTRIBUTE) {
              return node.listener;
            }
            node = node.next;
          }
          return null;
        },
        set(listener) {
          if (typeof listener !== "function" && !isObject(listener)) {
            listener = null;
          }
          const listeners = getListeners(this);
          let prev = null;
          let node = listeners.get(eventName);
          while (node != null) {
            if (node.listenerType === ATTRIBUTE) {
              if (prev !== null) {
                prev.next = node.next;
              } else if (node.next !== null) {
                listeners.set(eventName, node.next);
              } else {
                listeners.delete(eventName);
              }
            } else {
              prev = node;
            }
            node = node.next;
          }
          if (listener !== null) {
            const newNode = {
              listener,
              listenerType: ATTRIBUTE,
              passive: false,
              once: false,
              next: null
            };
            if (prev === null) {
              listeners.set(eventName, newNode);
            } else {
              prev.next = newNode;
            }
          }
        },
        configurable: true,
        enumerable: true
      };
    }
    function defineEventAttribute(eventTargetPrototype, eventName) {
      Object.defineProperty(
        eventTargetPrototype,
        `on${eventName}`,
        defineEventAttributeDescriptor(eventName)
      );
    }
    function defineCustomEventTarget(eventNames) {
      function CustomEventTarget() {
        EventTarget.call(this);
      }
      CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
        constructor: {
          value: CustomEventTarget,
          configurable: true,
          writable: true
        }
      });
      for (let i = 0; i < eventNames.length; ++i) {
        defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
      }
      return CustomEventTarget;
    }
    function EventTarget() {
      if (this instanceof EventTarget) {
        listenersMap.set(this, /* @__PURE__ */ new Map());
        return;
      }
      if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return defineCustomEventTarget(arguments[0]);
      }
      if (arguments.length > 0) {
        const types = new Array(arguments.length);
        for (let i = 0; i < arguments.length; ++i) {
          types[i] = arguments[i];
        }
        return defineCustomEventTarget(types);
      }
      throw new TypeError("Cannot call a class as a function");
    }
    EventTarget.prototype = {
      addEventListener(eventName, listener, options) {
        if (listener == null) {
          return;
        }
        if (typeof listener !== "function" && !isObject(listener)) {
          throw new TypeError("'listener' should be a function or an object.");
        }
        const listeners = getListeners(this);
        const optionsIsObj = isObject(options);
        const capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        const newNode = {
          listener,
          listenerType,
          passive: optionsIsObj && Boolean(options.passive),
          once: optionsIsObj && Boolean(options.once),
          next: null
        };
        let node = listeners.get(eventName);
        if (node === void 0) {
          listeners.set(eventName, newNode);
          return;
        }
        let prev = null;
        while (node != null) {
          if (node.listener === listener && node.listenerType === listenerType) {
            return;
          }
          prev = node;
          node = node.next;
        }
        prev.next = newNode;
      },
      removeEventListener(eventName, listener, options) {
        if (listener == null) {
          return;
        }
        const listeners = getListeners(this);
        const capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        let prev = null;
        let node = listeners.get(eventName);
        while (node != null) {
          if (node.listener === listener && node.listenerType === listenerType) {
            if (prev !== null) {
              prev.next = node.next;
            } else if (node.next !== null) {
              listeners.set(eventName, node.next);
            } else {
              listeners.delete(eventName);
            }
            return;
          }
          prev = node;
          node = node.next;
        }
      },
      dispatchEvent(event) {
        if (event == null || typeof event.type !== "string") {
          throw new TypeError('"event.type" should be a string.');
        }
        const listeners = getListeners(this);
        const eventName = event.type;
        let node = listeners.get(eventName);
        if (node == null) {
          return true;
        }
        const wrappedEvent = wrapEvent(this, event);
        let prev = null;
        while (node != null) {
          if (node.once) {
            if (prev !== null) {
              prev.next = node.next;
            } else if (node.next !== null) {
              listeners.set(eventName, node.next);
            } else {
              listeners.delete(eventName);
            }
          } else {
            prev = node;
          }
          setPassiveListener(
            wrappedEvent,
            node.passive ? node.listener : null
          );
          if (typeof node.listener === "function") {
            try {
              node.listener.call(this, wrappedEvent);
            } catch (err) {
              if (typeof console !== "undefined" && typeof console.error === "function") {
                console.error(err);
              }
            }
          } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
            node.listener.handleEvent(wrappedEvent);
          }
          if (isStopped(wrappedEvent)) {
            break;
          }
          node = node.next;
        }
        setPassiveListener(wrappedEvent, null);
        setEventPhase(wrappedEvent, 0);
        setCurrentTarget(wrappedEvent, null);
        return !wrappedEvent.defaultPrevented;
      }
    };
    Object.defineProperty(EventTarget.prototype, "constructor", {
      value: EventTarget,
      configurable: true,
      writable: true
    });
    if (typeof window !== "undefined" && typeof window.EventTarget !== "undefined") {
      Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
    }
    exports.defineEventAttribute = defineEventAttribute;
    exports.EventTarget = EventTarget;
    exports.default = EventTarget;
    module2.exports = EventTarget;
    module2.exports.EventTarget = module2.exports["default"] = EventTarget;
    module2.exports.defineEventAttribute = defineEventAttribute;
  }
});

// node_modules/abort-controller/dist/abort-controller.js
var require_abort_controller = __commonJS({
  "node_modules/abort-controller/dist/abort-controller.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var eventTargetShim = require_event_target_shim();
    var AbortSignal = class extends eventTargetShim.EventTarget {
      constructor() {
        super();
        throw new TypeError("AbortSignal cannot be constructed directly");
      }
      get aborted() {
        const aborted = abortedFlags.get(this);
        if (typeof aborted !== "boolean") {
          throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
        }
        return aborted;
      }
    };
    eventTargetShim.defineEventAttribute(AbortSignal.prototype, "abort");
    function createAbortSignal() {
      const signal = Object.create(AbortSignal.prototype);
      eventTargetShim.EventTarget.call(signal);
      abortedFlags.set(signal, false);
      return signal;
    }
    function abortSignal(signal) {
      if (abortedFlags.get(signal) !== false) {
        return;
      }
      abortedFlags.set(signal, true);
      signal.dispatchEvent({ type: "abort" });
    }
    var abortedFlags = /* @__PURE__ */ new WeakMap();
    Object.defineProperties(AbortSignal.prototype, {
      aborted: { enumerable: true }
    });
    if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
      Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal"
      });
    }
    var AbortController = class {
      constructor() {
        signals.set(this, createAbortSignal());
      }
      get signal() {
        return getSignal(this);
      }
      abort() {
        abortSignal(getSignal(this));
      }
    };
    var signals = /* @__PURE__ */ new WeakMap();
    function getSignal(controller) {
      const signal = signals.get(controller);
      if (signal == null) {
        throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
      }
      return signal;
    }
    Object.defineProperties(AbortController.prototype, {
      signal: { enumerable: true },
      abort: { enumerable: true }
    });
    if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
      Object.defineProperty(AbortController.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortController"
      });
    }
    exports.AbortController = AbortController;
    exports.AbortSignal = AbortSignal;
    exports.default = AbortController;
    module2.exports = AbortController;
    module2.exports.AbortController = module2.exports["default"] = AbortController;
    module2.exports.AbortSignal = AbortSignal;
  }
});

// node_modules/twitter-v2/node_modules/node-fetch/lib/index.js
var require_lib = __commonJS({
  "node_modules/twitter-v2/node_modules/node-fetch/lib/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var Stream = _interopDefault(require("stream"));
    var http = _interopDefault(require("http"));
    var Url = _interopDefault(require("url"));
    var https = _interopDefault(require("https"));
    var zlib = _interopDefault(require("zlib"));
    var Readable = Stream.Readable;
    var BUFFER = Symbol("buffer");
    var TYPE = Symbol("type");
    var Blob = class {
      constructor() {
        this[TYPE] = "";
        const blobParts = arguments[0];
        const options = arguments[1];
        const buffers = [];
        let size = 0;
        if (blobParts) {
          const a = blobParts;
          const length = Number(a.length);
          for (let i = 0; i < length; i++) {
            const element = a[i];
            let buffer;
            if (element instanceof Buffer) {
              buffer = element;
            } else if (ArrayBuffer.isView(element)) {
              buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
            } else if (element instanceof ArrayBuffer) {
              buffer = Buffer.from(element);
            } else if (element instanceof Blob) {
              buffer = element[BUFFER];
            } else {
              buffer = Buffer.from(typeof element === "string" ? element : String(element));
            }
            size += buffer.length;
            buffers.push(buffer);
          }
        }
        this[BUFFER] = Buffer.concat(buffers);
        let type = options && options.type !== void 0 && String(options.type).toLowerCase();
        if (type && !/[^\u0020-\u007E]/.test(type)) {
          this[TYPE] = type;
        }
      }
      get size() {
        return this[BUFFER].length;
      }
      get type() {
        return this[TYPE];
      }
      text() {
        return Promise.resolve(this[BUFFER].toString());
      }
      arrayBuffer() {
        const buf = this[BUFFER];
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        return Promise.resolve(ab);
      }
      stream() {
        const readable = new Readable();
        readable._read = function() {
        };
        readable.push(this[BUFFER]);
        readable.push(null);
        return readable;
      }
      toString() {
        return "[object Blob]";
      }
      slice() {
        const size = this.size;
        const start = arguments[0];
        const end = arguments[1];
        let relativeStart, relativeEnd;
        if (start === void 0) {
          relativeStart = 0;
        } else if (start < 0) {
          relativeStart = Math.max(size + start, 0);
        } else {
          relativeStart = Math.min(start, size);
        }
        if (end === void 0) {
          relativeEnd = size;
        } else if (end < 0) {
          relativeEnd = Math.max(size + end, 0);
        } else {
          relativeEnd = Math.min(end, size);
        }
        const span = Math.max(relativeEnd - relativeStart, 0);
        const buffer = this[BUFFER];
        const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        const blob = new Blob([], { type: arguments[2] });
        blob[BUFFER] = slicedBuffer;
        return blob;
      }
    };
    Object.defineProperties(Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
      value: "Blob",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function FetchError(message, type, systemError) {
      Error.call(this, message);
      this.message = message;
      this.type = type;
      if (systemError) {
        this.code = this.errno = systemError.code;
      }
      Error.captureStackTrace(this, this.constructor);
    }
    FetchError.prototype = Object.create(Error.prototype);
    FetchError.prototype.constructor = FetchError;
    FetchError.prototype.name = "FetchError";
    var convert;
    try {
      convert = require("encoding").convert;
    } catch (e) {
    }
    var INTERNALS = Symbol("Body internals");
    var PassThrough = Stream.PassThrough;
    function Body(body) {
      var _this = this;
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
      let size = _ref$size === void 0 ? 0 : _ref$size;
      var _ref$timeout = _ref.timeout;
      let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
      if (body == null) {
        body = null;
      } else if (isURLSearchParams(body)) {
        body = Buffer.from(body.toString());
      } else if (isBlob(body))
        ;
      else if (Buffer.isBuffer(body))
        ;
      else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        body = Buffer.from(body);
      } else if (ArrayBuffer.isView(body)) {
        body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
      } else if (body instanceof Stream)
        ;
      else {
        body = Buffer.from(String(body));
      }
      this[INTERNALS] = {
        body,
        disturbed: false,
        error: null
      };
      this.size = size;
      this.timeout = timeout;
      if (body instanceof Stream) {
        body.on("error", function(err) {
          const error = err.name === "AbortError" ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
          _this[INTERNALS].error = error;
        });
      }
    }
    Body.prototype = {
      get body() {
        return this[INTERNALS].body;
      },
      get bodyUsed() {
        return this[INTERNALS].disturbed;
      },
      arrayBuffer() {
        return consumeBody.call(this).then(function(buf) {
          return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        });
      },
      blob() {
        let ct = this.headers && this.headers.get("content-type") || "";
        return consumeBody.call(this).then(function(buf) {
          return Object.assign(
            new Blob([], {
              type: ct.toLowerCase()
            }),
            {
              [BUFFER]: buf
            }
          );
        });
      },
      json() {
        var _this2 = this;
        return consumeBody.call(this).then(function(buffer) {
          try {
            return JSON.parse(buffer.toString());
          } catch (err) {
            return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
          }
        });
      },
      text() {
        return consumeBody.call(this).then(function(buffer) {
          return buffer.toString();
        });
      },
      buffer() {
        return consumeBody.call(this);
      },
      textConverted() {
        var _this3 = this;
        return consumeBody.call(this).then(function(buffer) {
          return convertBody(buffer, _this3.headers);
        });
      }
    };
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    Body.mixIn = function(proto) {
      for (const name of Object.getOwnPropertyNames(Body.prototype)) {
        if (!(name in proto)) {
          const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
          Object.defineProperty(proto, name, desc);
        }
      }
    };
    function consumeBody() {
      var _this4 = this;
      if (this[INTERNALS].disturbed) {
        return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
      }
      this[INTERNALS].disturbed = true;
      if (this[INTERNALS].error) {
        return Body.Promise.reject(this[INTERNALS].error);
      }
      let body = this.body;
      if (body === null) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      if (isBlob(body)) {
        body = body.stream();
      }
      if (Buffer.isBuffer(body)) {
        return Body.Promise.resolve(body);
      }
      if (!(body instanceof Stream)) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      let accum = [];
      let accumBytes = 0;
      let abort = false;
      return new Body.Promise(function(resolve, reject) {
        let resTimeout;
        if (_this4.timeout) {
          resTimeout = setTimeout(function() {
            abort = true;
            reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
          }, _this4.timeout);
        }
        body.on("error", function(err) {
          if (err.name === "AbortError") {
            abort = true;
            reject(err);
          } else {
            reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
          }
        });
        body.on("data", function(chunk) {
          if (abort || chunk === null) {
            return;
          }
          if (_this4.size && accumBytes + chunk.length > _this4.size) {
            abort = true;
            reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
            return;
          }
          accumBytes += chunk.length;
          accum.push(chunk);
        });
        body.on("end", function() {
          if (abort) {
            return;
          }
          clearTimeout(resTimeout);
          try {
            resolve(Buffer.concat(accum, accumBytes));
          } catch (err) {
            reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
          }
        });
      });
    }
    function convertBody(buffer, headers) {
      if (typeof convert !== "function") {
        throw new Error("The package `encoding` must be installed to use the textConverted() function");
      }
      const ct = headers.get("content-type");
      let charset = "utf-8";
      let res, str;
      if (ct) {
        res = /charset=([^;]*)/i.exec(ct);
      }
      str = buffer.slice(0, 1024).toString();
      if (!res && str) {
        res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
      }
      if (!res && str) {
        res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
        if (!res) {
          res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
          if (res) {
            res.pop();
          }
        }
        if (res) {
          res = /charset=(.*)/i.exec(res.pop());
        }
      }
      if (!res && str) {
        res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
      }
      if (res) {
        charset = res.pop();
        if (charset === "gb2312" || charset === "gbk") {
          charset = "gb18030";
        }
      }
      return convert(buffer, "UTF-8", charset).toString();
    }
    function isURLSearchParams(obj) {
      if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
        return false;
      }
      return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
    }
    function isBlob(obj) {
      return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
    }
    function clone(instance) {
      let p1, p2;
      let body = instance.body;
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof Stream && typeof body.getBoundary !== "function") {
        p1 = new PassThrough();
        p2 = new PassThrough();
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS].body = p1;
        body = p2;
      }
      return body;
    }
    function extractContentType(body) {
      if (body === null) {
        return null;
      } else if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      } else if (isURLSearchParams(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      } else if (isBlob(body)) {
        return body.type || null;
      } else if (Buffer.isBuffer(body)) {
        return null;
      } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        return null;
      } else if (ArrayBuffer.isView(body)) {
        return null;
      } else if (typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${body.getBoundary()}`;
      } else if (body instanceof Stream) {
        return null;
      } else {
        return "text/plain;charset=UTF-8";
      }
    }
    function getTotalBytes(instance) {
      const body = instance.body;
      if (body === null) {
        return 0;
      } else if (isBlob(body)) {
        return body.size;
      } else if (Buffer.isBuffer(body)) {
        return body.length;
      } else if (body && typeof body.getLengthSync === "function") {
        if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
          return body.getLengthSync();
        }
        return null;
      } else {
        return null;
      }
    }
    function writeToStream(dest, instance) {
      const body = instance.body;
      if (body === null) {
        dest.end();
      } else if (isBlob(body)) {
        body.stream().pipe(dest);
      } else if (Buffer.isBuffer(body)) {
        dest.write(body);
        dest.end();
      } else {
        body.pipe(dest);
      }
    }
    Body.Promise = global.Promise;
    var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
    var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
    function validateName(name) {
      name = `${name}`;
      if (invalidTokenRegex.test(name) || name === "") {
        throw new TypeError(`${name} is not a legal HTTP header name`);
      }
    }
    function validateValue(value) {
      value = `${value}`;
      if (invalidHeaderCharRegex.test(value)) {
        throw new TypeError(`${value} is not a legal HTTP header value`);
      }
    }
    function find(map, name) {
      name = name.toLowerCase();
      for (const key in map) {
        if (key.toLowerCase() === name) {
          return key;
        }
      }
      return void 0;
    }
    var MAP = Symbol("map");
    var Headers = class {
      constructor() {
        let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        this[MAP] = /* @__PURE__ */ Object.create(null);
        if (init instanceof Headers) {
          const rawHeaders = init.raw();
          const headerNames = Object.keys(rawHeaders);
          for (const headerName of headerNames) {
            for (const value of rawHeaders[headerName]) {
              this.append(headerName, value);
            }
          }
          return;
        }
        if (init == null)
          ;
        else if (typeof init === "object") {
          const method = init[Symbol.iterator];
          if (method != null) {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            const pairs = [];
            for (const pair of init) {
              if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
                throw new TypeError("Each header pair must be iterable");
              }
              pairs.push(Array.from(pair));
            }
            for (const pair of pairs) {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              this.append(pair[0], pair[1]);
            }
          } else {
            for (const key of Object.keys(init)) {
              const value = init[key];
              this.append(key, value);
            }
          }
        } else {
          throw new TypeError("Provided initializer must be an object");
        }
      }
      get(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key === void 0) {
          return null;
        }
        return this[MAP][key].join(", ");
      }
      forEach(callback) {
        let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
        let pairs = getHeaders(this);
        let i = 0;
        while (i < pairs.length) {
          var _pairs$i = pairs[i];
          const name = _pairs$i[0], value = _pairs$i[1];
          callback.call(thisArg, value, name, this);
          pairs = getHeaders(this);
          i++;
        }
      }
      set(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        this[MAP][key !== void 0 ? key : name] = [value];
      }
      append(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        if (key !== void 0) {
          this[MAP][key].push(value);
        } else {
          this[MAP][name] = [value];
        }
      }
      has(name) {
        name = `${name}`;
        validateName(name);
        return find(this[MAP], name) !== void 0;
      }
      delete(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key !== void 0) {
          delete this[MAP][key];
        }
      }
      raw() {
        return this[MAP];
      }
      keys() {
        return createHeadersIterator(this, "key");
      }
      values() {
        return createHeadersIterator(this, "value");
      }
      [Symbol.iterator]() {
        return createHeadersIterator(this, "key+value");
      }
    };
    Headers.prototype.entries = Headers.prototype[Symbol.iterator];
    Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
      value: "Headers",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Headers.prototype, {
      get: { enumerable: true },
      forEach: { enumerable: true },
      set: { enumerable: true },
      append: { enumerable: true },
      has: { enumerable: true },
      delete: { enumerable: true },
      keys: { enumerable: true },
      values: { enumerable: true },
      entries: { enumerable: true }
    });
    function getHeaders(headers) {
      let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
      const keys = Object.keys(headers[MAP]).sort();
      return keys.map(kind === "key" ? function(k) {
        return k.toLowerCase();
      } : kind === "value" ? function(k) {
        return headers[MAP][k].join(", ");
      } : function(k) {
        return [k.toLowerCase(), headers[MAP][k].join(", ")];
      });
    }
    var INTERNAL = Symbol("internal");
    function createHeadersIterator(target, kind) {
      const iterator = Object.create(HeadersIteratorPrototype);
      iterator[INTERNAL] = {
        target,
        kind,
        index: 0
      };
      return iterator;
    }
    var HeadersIteratorPrototype = Object.setPrototypeOf({
      next() {
        if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
          throw new TypeError("Value of `this` is not a HeadersIterator");
        }
        var _INTERNAL = this[INTERNAL];
        const target = _INTERNAL.target, kind = _INTERNAL.kind, index = _INTERNAL.index;
        const values = getHeaders(target, kind);
        const len = values.length;
        if (index >= len) {
          return {
            value: void 0,
            done: true
          };
        }
        this[INTERNAL].index = index + 1;
        return {
          value: values[index],
          done: false
        };
      }
    }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
    Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
      value: "HeadersIterator",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function exportNodeCompatibleHeaders(headers) {
      const obj = Object.assign({ __proto__: null }, headers[MAP]);
      const hostHeaderKey = find(headers[MAP], "Host");
      if (hostHeaderKey !== void 0) {
        obj[hostHeaderKey] = obj[hostHeaderKey][0];
      }
      return obj;
    }
    function createHeadersLenient(obj) {
      const headers = new Headers();
      for (const name of Object.keys(obj)) {
        if (invalidTokenRegex.test(name)) {
          continue;
        }
        if (Array.isArray(obj[name])) {
          for (const val of obj[name]) {
            if (invalidHeaderCharRegex.test(val)) {
              continue;
            }
            if (headers[MAP][name] === void 0) {
              headers[MAP][name] = [val];
            } else {
              headers[MAP][name].push(val);
            }
          }
        } else if (!invalidHeaderCharRegex.test(obj[name])) {
          headers[MAP][name] = [obj[name]];
        }
      }
      return headers;
    }
    var INTERNALS$1 = Symbol("Response internals");
    var STATUS_CODES = http.STATUS_CODES;
    var Response = class {
      constructor() {
        let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        Body.call(this, body, opts);
        const status = opts.status || 200;
        const headers = new Headers(opts.headers);
        if (body != null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          url: opts.url,
          status,
          statusText: opts.statusText || STATUS_CODES[status],
          headers,
          counter: opts.counter
        };
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      clone() {
        return new Response(clone(this), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected
        });
      }
    };
    Body.mixIn(Response.prototype);
    Object.defineProperties(Response.prototype, {
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    Object.defineProperty(Response.prototype, Symbol.toStringTag, {
      value: "Response",
      writable: false,
      enumerable: false,
      configurable: true
    });
    var INTERNALS$2 = Symbol("Request internals");
    var parse_url = Url.parse;
    var format_url = Url.format;
    var streamDestructionSupported = "destroy" in Stream.Readable.prototype;
    function isRequest(input) {
      return typeof input === "object" && typeof input[INTERNALS$2] === "object";
    }
    function isAbortSignal(signal) {
      const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
      return !!(proto && proto.constructor.name === "AbortSignal");
    }
    var Request = class {
      constructor(input) {
        let init = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        let parsedURL;
        if (!isRequest(input)) {
          if (input && input.href) {
            parsedURL = parse_url(input.href);
          } else {
            parsedURL = parse_url(`${input}`);
          }
          input = {};
        } else {
          parsedURL = parse_url(input.url);
        }
        let method = init.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        Body.call(this, inputBody, {
          timeout: init.timeout || input.timeout || 0,
          size: init.size || input.size || 0
        });
        const headers = new Headers(init.headers || input.headers || {});
        if (inputBody != null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init)
          signal = init.signal;
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal");
        }
        this[INTERNALS$2] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal
        };
        this.follow = init.follow !== void 0 ? init.follow : input.follow !== void 0 ? input.follow : 20;
        this.compress = init.compress !== void 0 ? init.compress : input.compress !== void 0 ? input.compress : true;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
      }
      get method() {
        return this[INTERNALS$2].method;
      }
      get url() {
        return format_url(this[INTERNALS$2].parsedURL);
      }
      get headers() {
        return this[INTERNALS$2].headers;
      }
      get redirect() {
        return this[INTERNALS$2].redirect;
      }
      get signal() {
        return this[INTERNALS$2].signal;
      }
      clone() {
        return new Request(this);
      }
    };
    Body.mixIn(Request.prototype);
    Object.defineProperty(Request.prototype, Symbol.toStringTag, {
      value: "Request",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true }
    });
    function getNodeRequestOptions(request) {
      const parsedURL = request[INTERNALS$2].parsedURL;
      const headers = new Headers(request[INTERNALS$2].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      if (!parsedURL.protocol || !parsedURL.hostname) {
        throw new TypeError("Only absolute URLs are supported");
      }
      if (!/^https?:$/.test(parsedURL.protocol)) {
        throw new TypeError("Only HTTP(S) protocols are supported");
      }
      if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
        throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
      }
      let contentLengthValue = null;
      if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body != null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number") {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate");
      }
      let agent = request.agent;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      return Object.assign({}, parsedURL, {
        method: request.method,
        headers: exportNodeCompatibleHeaders(headers),
        agent
      });
    }
    function AbortError(message) {
      Error.call(this, message);
      this.type = "aborted";
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
    AbortError.prototype = Object.create(Error.prototype);
    AbortError.prototype.constructor = AbortError;
    AbortError.prototype.name = "AbortError";
    var PassThrough$1 = Stream.PassThrough;
    var resolve_url = Url.resolve;
    function fetch(url, opts) {
      if (!fetch.Promise) {
        throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
      }
      Body.Promise = fetch.Promise;
      return new fetch.Promise(function(resolve, reject) {
        const request = new Request(url, opts);
        const options = getNodeRequestOptions(request);
        const send = (options.protocol === "https:" ? https : http).request;
        const signal = request.signal;
        let response = null;
        const abort = function abort2() {
          let error = new AbortError("The user aborted a request.");
          reject(error);
          if (request.body && request.body instanceof Stream.Readable) {
            request.body.destroy(error);
          }
          if (!response || !response.body)
            return;
          response.body.emit("error", error);
        };
        if (signal && signal.aborted) {
          abort();
          return;
        }
        const abortAndFinalize = function abortAndFinalize2() {
          abort();
          finalize();
        };
        const req = send(options);
        let reqTimeout;
        if (signal) {
          signal.addEventListener("abort", abortAndFinalize);
        }
        function finalize() {
          req.abort();
          if (signal)
            signal.removeEventListener("abort", abortAndFinalize);
          clearTimeout(reqTimeout);
        }
        if (request.timeout) {
          req.once("socket", function(socket) {
            reqTimeout = setTimeout(function() {
              reject(new FetchError(`network timeout at: ${request.url}`, "request-timeout"));
              finalize();
            }, request.timeout);
          });
        }
        req.on("error", function(err) {
          reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
          finalize();
        });
        req.on("response", function(res) {
          clearTimeout(reqTimeout);
          const headers = createHeadersLenient(res.headers);
          if (fetch.isRedirect(res.statusCode)) {
            const location = headers.get("Location");
            const locationURL = location === null ? null : resolve_url(request.url, location);
            switch (request.redirect) {
              case "error":
                reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
                finalize();
                return;
              case "manual":
                if (locationURL !== null) {
                  try {
                    headers.set("Location", locationURL);
                  } catch (err) {
                    reject(err);
                  }
                }
                break;
              case "follow":
                if (locationURL === null) {
                  break;
                }
                if (request.counter >= request.follow) {
                  reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
                  finalize();
                  return;
                }
                const requestOpts = {
                  headers: new Headers(request.headers),
                  follow: request.follow,
                  counter: request.counter + 1,
                  agent: request.agent,
                  compress: request.compress,
                  method: request.method,
                  body: request.body,
                  signal: request.signal,
                  timeout: request.timeout,
                  size: request.size
                };
                if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                  reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
                  finalize();
                  return;
                }
                if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
                  requestOpts.method = "GET";
                  requestOpts.body = void 0;
                  requestOpts.headers.delete("content-length");
                }
                resolve(fetch(new Request(locationURL, requestOpts)));
                finalize();
                return;
            }
          }
          res.once("end", function() {
            if (signal)
              signal.removeEventListener("abort", abortAndFinalize);
          });
          let body = res.pipe(new PassThrough$1());
          const response_options = {
            url: request.url,
            status: res.statusCode,
            statusText: res.statusMessage,
            headers,
            size: request.size,
            timeout: request.timeout,
            counter: request.counter
          };
          const codings = headers.get("Content-Encoding");
          if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
            response = new Response(body, response_options);
            resolve(response);
            return;
          }
          const zlibOptions = {
            flush: zlib.Z_SYNC_FLUSH,
            finishFlush: zlib.Z_SYNC_FLUSH
          };
          if (codings == "gzip" || codings == "x-gzip") {
            body = body.pipe(zlib.createGunzip(zlibOptions));
            response = new Response(body, response_options);
            resolve(response);
            return;
          }
          if (codings == "deflate" || codings == "x-deflate") {
            const raw = res.pipe(new PassThrough$1());
            raw.once("data", function(chunk) {
              if ((chunk[0] & 15) === 8) {
                body = body.pipe(zlib.createInflate());
              } else {
                body = body.pipe(zlib.createInflateRaw());
              }
              response = new Response(body, response_options);
              resolve(response);
            });
            return;
          }
          if (codings == "br" && typeof zlib.createBrotliDecompress === "function") {
            body = body.pipe(zlib.createBrotliDecompress());
            response = new Response(body, response_options);
            resolve(response);
            return;
          }
          response = new Response(body, response_options);
          resolve(response);
        });
        writeToStream(req, request);
      });
    }
    fetch.isRedirect = function(code) {
      return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
    };
    fetch.Promise = global.Promise;
    module2.exports = exports = fetch;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = exports;
    exports.Headers = Headers;
    exports.Request = Request;
    exports.Response = Response;
    exports.FetchError = FetchError;
  }
});

// node_modules/oauth-1.0a/oauth-1.0a.js
var require_oauth_1_0a = __commonJS({
  "node_modules/oauth-1.0a/oauth-1.0a.js"(exports, module2) {
    if (typeof module2 !== "undefined" && typeof exports !== "undefined") {
      module2.exports = OAuth;
    }
    function OAuth(opts) {
      if (!(this instanceof OAuth)) {
        return new OAuth(opts);
      }
      if (!opts) {
        opts = {};
      }
      if (!opts.consumer) {
        throw new Error("consumer option is required");
      }
      this.consumer = opts.consumer;
      this.nonce_length = opts.nonce_length || 32;
      this.version = opts.version || "1.0";
      this.parameter_seperator = opts.parameter_seperator || ", ";
      this.realm = opts.realm;
      if (typeof opts.last_ampersand === "undefined") {
        this.last_ampersand = true;
      } else {
        this.last_ampersand = opts.last_ampersand;
      }
      this.signature_method = opts.signature_method || "PLAINTEXT";
      if (this.signature_method == "PLAINTEXT" && !opts.hash_function) {
        opts.hash_function = function(base_string, key) {
          return key;
        };
      }
      if (!opts.hash_function) {
        throw new Error("hash_function option is required");
      }
      this.hash_function = opts.hash_function;
      this.body_hash_function = opts.body_hash_function || this.hash_function;
    }
    OAuth.prototype.authorize = function(request, token) {
      var oauth_data = {
        oauth_consumer_key: this.consumer.key,
        oauth_nonce: this.getNonce(),
        oauth_signature_method: this.signature_method,
        oauth_timestamp: this.getTimeStamp(),
        oauth_version: this.version
      };
      if (!token) {
        token = {};
      }
      if (token.key !== void 0) {
        oauth_data.oauth_token = token.key;
      }
      if (!request.data) {
        request.data = {};
      }
      if (request.includeBodyHash) {
        oauth_data.oauth_body_hash = this.getBodyHash(request, token.secret);
      }
      oauth_data.oauth_signature = this.getSignature(request, token.secret, oauth_data);
      return oauth_data;
    };
    OAuth.prototype.getSignature = function(request, token_secret, oauth_data) {
      return this.hash_function(this.getBaseString(request, oauth_data), this.getSigningKey(token_secret));
    };
    OAuth.prototype.getBodyHash = function(request, token_secret) {
      var body = typeof request.data === "string" ? request.data : JSON.stringify(request.data);
      if (!this.body_hash_function) {
        throw new Error("body_hash_function option is required");
      }
      return this.body_hash_function(body, this.getSigningKey(token_secret));
    };
    OAuth.prototype.getBaseString = function(request, oauth_data) {
      return request.method.toUpperCase() + "&" + this.percentEncode(this.getBaseUrl(request.url)) + "&" + this.percentEncode(this.getParameterString(request, oauth_data));
    };
    OAuth.prototype.getParameterString = function(request, oauth_data) {
      var base_string_data;
      if (oauth_data.oauth_body_hash) {
        base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.deParamUrl(request.url))));
      } else {
        base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.mergeObject(request.data, this.deParamUrl(request.url)))));
      }
      var data_str = "";
      for (var i = 0; i < base_string_data.length; i++) {
        var key = base_string_data[i].key;
        var value = base_string_data[i].value;
        if (value && Array.isArray(value)) {
          value.sort();
          var valString = "";
          value.forEach(function(item, i2) {
            valString += key + "=" + item;
            if (i2 < value.length) {
              valString += "&";
            }
          }.bind(this));
          data_str += valString;
        } else {
          data_str += key + "=" + value + "&";
        }
      }
      data_str = data_str.substr(0, data_str.length - 1);
      return data_str;
    };
    OAuth.prototype.getSigningKey = function(token_secret) {
      token_secret = token_secret || "";
      if (!this.last_ampersand && !token_secret) {
        return this.percentEncode(this.consumer.secret);
      }
      return this.percentEncode(this.consumer.secret) + "&" + this.percentEncode(token_secret);
    };
    OAuth.prototype.getBaseUrl = function(url) {
      return url.split("?")[0];
    };
    OAuth.prototype.deParam = function(string) {
      var arr = string.split("&");
      var data = {};
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i].split("=");
        item[1] = item[1] || "";
        if (data[item[0]]) {
          if (!Array.isArray(data[item[0]])) {
            data[item[0]] = [data[item[0]]];
          }
          data[item[0]].push(decodeURIComponent(item[1]));
        } else {
          data[item[0]] = decodeURIComponent(item[1]);
        }
      }
      return data;
    };
    OAuth.prototype.deParamUrl = function(url) {
      var tmp = url.split("?");
      if (tmp.length === 1)
        return {};
      return this.deParam(tmp[1]);
    };
    OAuth.prototype.percentEncode = function(str) {
      return encodeURIComponent(str).replace(/\!/g, "%21").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
    };
    OAuth.prototype.percentEncodeData = function(data) {
      var result = {};
      for (var key in data) {
        var value = data[key];
        if (value && Array.isArray(value)) {
          var newValue = [];
          value.forEach(function(val) {
            newValue.push(this.percentEncode(val));
          }.bind(this));
          value = newValue;
        } else {
          value = this.percentEncode(value);
        }
        result[this.percentEncode(key)] = value;
      }
      return result;
    };
    OAuth.prototype.toHeader = function(oauth_data) {
      var sorted = this.sortObject(oauth_data);
      var header_value = "OAuth ";
      if (this.realm) {
        header_value += 'realm="' + this.realm + '"' + this.parameter_seperator;
      }
      for (var i = 0; i < sorted.length; i++) {
        if (sorted[i].key.indexOf("oauth_") !== 0)
          continue;
        header_value += this.percentEncode(sorted[i].key) + '="' + this.percentEncode(sorted[i].value) + '"' + this.parameter_seperator;
      }
      return {
        Authorization: header_value.substr(0, header_value.length - this.parameter_seperator.length)
      };
    };
    OAuth.prototype.getNonce = function() {
      var word_characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var result = "";
      for (var i = 0; i < this.nonce_length; i++) {
        result += word_characters[parseInt(Math.random() * word_characters.length, 10)];
      }
      return result;
    };
    OAuth.prototype.getTimeStamp = function() {
      return parseInt(new Date().getTime() / 1e3, 10);
    };
    OAuth.prototype.mergeObject = function(obj1, obj2) {
      obj1 = obj1 || {};
      obj2 = obj2 || {};
      var merged_obj = obj1;
      for (var key in obj2) {
        merged_obj[key] = obj2[key];
      }
      return merged_obj;
    };
    OAuth.prototype.sortObject = function(data) {
      var keys = Object.keys(data);
      var result = [];
      keys.sort();
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        result.push({
          key,
          value: data[key]
        });
      }
      return result;
    };
  }
});

// node_modules/twitter-v2/build/TwitterError.js
var require_TwitterError = __commonJS({
  "node_modules/twitter-v2/build/TwitterError.js"(exports, module2) {
    "use strict";
    module2.exports = class TwitterError extends Error {
      constructor(message, code, details) {
        super(message);
        if (code) {
          Object.defineProperty(this, "code", {
            value: code,
            writable: false,
            enumerable: true
          });
        }
        if (details) {
          Object.defineProperty(this, "details", {
            value: details,
            writable: false,
            enumerable: true
          });
        }
      }
    };
    module2.exports.fromJson = (json) => {
      if (json.status && json.status != 200) {
        return new module2.exports(json.title, json.status, json.detail);
      }
      if (json.type) {
        return new module2.exports(`${json.title}: ${json.detail}`, null, json.type);
      }
      return null;
    };
  }
});

// node_modules/twitter-v2/build/Credentials.js
var require_Credentials = __commonJS({
  "node_modules/twitter-v2/build/Credentials.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var oauth_1_0a_1 = __importDefault(require_oauth_1_0a());
    var crypto_1 = __importDefault(require("crypto"));
    var node_fetch_1 = __importDefault(require_lib());
    var TwitterError_1 = __importDefault(require_TwitterError());
    function removeNullAndUndefined(obj) {
      Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
    }
    function validate(credentials) {
      if ("consumer_key" in credentials && typeof credentials.consumer_key != "string") {
        throw new Error("Invalid value for consumer_key. Expected string but got " + typeof credentials.consumer_key);
      }
      if ("consumer_secret" in credentials && typeof credentials.consumer_secret != "string") {
        throw new Error("Invalid value for consumer_secret. Expected string but got " + typeof credentials.consumer_secret);
      }
      if ("bearer_token" in credentials && typeof credentials.bearer_token != "string") {
        throw new Error("Invalid value for bearer_token. Expected string but got " + typeof credentials.bearer_token);
      }
      if ("access_token_key" in credentials && typeof credentials.access_token_key != "string") {
        throw new Error("Invalid value for access_token_key. Expected string but got " + typeof credentials.access_token_key);
      }
      if ("access_token_secret" in credentials && typeof credentials.access_token_secret != "string") {
        throw new Error("Invalid value for access_token_secret. Expected string but got " + typeof credentials.access_token_secret);
      }
      if (!("access_token_key" in credentials) && !("access_token_secret" in credentials) && !("consumer_key" in credentials) && !("consumer_secret" in credentials) && !("bearer_token" in credentials)) {
        throw new Error("Invalid argument: no credentials defined");
      }
      if ("consumer_key" in credentials && !("consumer_secret" in credentials) || !("consumer_key" in credentials) && "consumer_secret" in credentials) {
        throw new Error("Invalid argument: when using consumer keys, both consumer_key and consumer_secret must be defined");
      }
      if ("access_token_key" in credentials && !("access_token_secret" in credentials) || !("access_token_key" in credentials) && "access_token_secret" in credentials) {
        throw new Error("Invalid argument: access_token_key and access_token_secret must both be defined when using user authorization");
      }
      if (("access_token_key" in credentials || "access_token_secret" in credentials) && (!("consumer_key" in credentials) || !("consumer_secret" in credentials))) {
        throw new Error("Invalid argument: user authentication requires consumer_key and consumer_secret to be defined");
      }
      if (("access_token_key" in credentials || "access_token_secret" in credentials) && "bearer_token" in credentials) {
        throw new Error("Invalid argument: access_token_key and access_token_secret cannot be used with bearer_token");
      }
    }
    async function createBearerToken({ consumer_key, consumer_secret }) {
      const response = await node_fetch_1.default("https://api.twitter.com/oauth2/token", {
        method: "post",
        headers: {
          Authorization: "Basic " + Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: "grant_type=client_credentials"
      });
      const body = await response.json();
      if (body.errors) {
        const error = body.errors[0];
        throw new TwitterError_1.default(`${body.title}: ${error.message}`, body.type, body.detail);
      }
      if (body.token_type != "bearer") {
        throw new TwitterError_1.default("Unexpected reply from Twitter upon obtaining bearer token", void 0, `Expected "bearer" but found ${body.token_type}`);
      }
      return body.access_token;
    }
    var Credentials = class {
      constructor(args) {
        removeNullAndUndefined(args);
        validate(args);
        if ("consumer_key" in args) {
          this._consumer_key = args.consumer_key;
          this._consumer_secret = args.consumer_secret;
        }
        if ("bearer_token" in args) {
          this._bearer_token = args.bearer_token.startsWith("Bearer ") ? args.bearer_token.substr(7) : args.bearer_token;
        }
        if ("access_token_key" in args) {
          this._access_token_key = args.access_token_key;
          this._access_token_secret = args.access_token_secret;
          this._oauth = new oauth_1_0a_1.default({
            consumer: {
              key: args.consumer_key,
              secret: args.consumer_secret
            },
            signature_method: "HMAC-SHA1",
            hash_function(base_string, key) {
              return crypto_1.default.createHmac("sha1", key).update(base_string).digest("base64");
            }
          });
        }
      }
      get consumer_key() {
        return this._consumer_key;
      }
      get consumer_secret() {
        return this._consumer_secret;
      }
      get bearer_token() {
        return this._bearer_token;
      }
      get access_token_key() {
        return this._access_token_key;
      }
      get access_token_secret() {
        return this._access_token_secret;
      }
      appAuth() {
        return !this.access_token_key && !this.access_token_secret;
      }
      userAuth() {
        return !this.appAuth();
      }
      async createBearerToken() {
        if (this.userAuth()) {
          throw new Error("Refusing to create a bearer token when using user authentication");
        }
        if (this.bearer_token) {
          return;
        }
        if (this._bearer_token_promise) {
          return this._bearer_token_promise;
        }
        this._bearer_token_promise = createBearerToken({
          consumer_key: this.consumer_key,
          consumer_secret: this.consumer_secret
        }).then((token) => {
          this._bearer_token = token;
        }).finally(() => {
          this._bearer_token_promise = void 0;
        });
        return this._bearer_token_promise;
      }
      async authorizationHeader(url, request) {
        if (this.appAuth()) {
          await this.createBearerToken();
          return `Bearer ${this.bearer_token}`;
        }
        if (!this._oauth) {
          throw "OAuth should be defined for user authentication";
        } else if (!this.access_token_key || !this.access_token_secret) {
          throw "Access token should be defined for user authentication";
        }
        return this._oauth.toHeader(this._oauth.authorize({
          url: url.toString(),
          method: request.method,
          data: request.body
        }, {
          key: this.access_token_key,
          secret: this.access_token_secret
        })).Authorization;
      }
    };
    exports.default = Credentials;
  }
});

// node_modules/through/index.js
var require_through = __commonJS({
  "node_modules/through/index.js"(exports, module2) {
    var Stream = require("stream");
    exports = module2.exports = through;
    through.through = through;
    function through(write, end, opts) {
      write = write || function(data) {
        this.queue(data);
      };
      end = end || function() {
        this.queue(null);
      };
      var ended = false, destroyed = false, buffer = [], _ended = false;
      var stream = new Stream();
      stream.readable = stream.writable = true;
      stream.paused = false;
      stream.autoDestroy = !(opts && opts.autoDestroy === false);
      stream.write = function(data) {
        write.call(this, data);
        return !stream.paused;
      };
      function drain() {
        while (buffer.length && !stream.paused) {
          var data = buffer.shift();
          if (null === data)
            return stream.emit("end");
          else
            stream.emit("data", data);
        }
      }
      stream.queue = stream.push = function(data) {
        if (_ended)
          return stream;
        if (data === null)
          _ended = true;
        buffer.push(data);
        drain();
        return stream;
      };
      stream.on("end", function() {
        stream.readable = false;
        if (!stream.writable && stream.autoDestroy)
          process.nextTick(function() {
            stream.destroy();
          });
      });
      function _end() {
        stream.writable = false;
        end.call(stream);
        if (!stream.readable && stream.autoDestroy)
          stream.destroy();
      }
      stream.end = function(data) {
        if (ended)
          return;
        ended = true;
        if (arguments.length)
          stream.write(data);
        _end();
        return stream;
      };
      stream.destroy = function() {
        if (destroyed)
          return;
        destroyed = true;
        ended = true;
        buffer.length = 0;
        stream.writable = stream.readable = false;
        stream.emit("close");
        return stream;
      };
      stream.pause = function() {
        if (stream.paused)
          return;
        stream.paused = true;
        return stream;
      };
      stream.resume = function() {
        if (stream.paused) {
          stream.paused = false;
          stream.emit("resume");
        }
        drain();
        if (!stream.paused)
          stream.emit("drain");
        return stream;
      };
      return stream;
    }
  }
});

// node_modules/split/index.js
var require_split = __commonJS({
  "node_modules/split/index.js"(exports, module2) {
    var through = require_through();
    var Decoder = require("string_decoder").StringDecoder;
    module2.exports = split;
    function split(matcher, mapper, options) {
      var decoder = new Decoder();
      var soFar = "";
      var maxLength = options && options.maxLength;
      var trailing = options && options.trailing === false ? false : true;
      if ("function" === typeof matcher)
        mapper = matcher, matcher = null;
      if (!matcher)
        matcher = /\r?\n/;
      function emit(stream, piece) {
        if (mapper) {
          try {
            piece = mapper(piece);
          } catch (err) {
            return stream.emit("error", err);
          }
          if ("undefined" !== typeof piece)
            stream.queue(piece);
        } else
          stream.queue(piece);
      }
      function next(stream, buffer) {
        var pieces = ((soFar != null ? soFar : "") + buffer).split(matcher);
        soFar = pieces.pop();
        if (maxLength && soFar.length > maxLength)
          return stream.emit("error", new Error("maximum buffer reached"));
        for (var i = 0; i < pieces.length; i++) {
          var piece = pieces[i];
          emit(stream, piece);
        }
      }
      return through(
        function(b) {
          next(this, decoder.write(b));
        },
        function() {
          if (decoder.end)
            next(this, decoder.end());
          if (trailing && soFar != null)
            emit(this, soFar);
          this.queue(null);
        }
      );
    }
  }
});

// node_modules/twitter-v2/build/TwitterStream.js
var require_TwitterStream = __commonJS({
  "node_modules/twitter-v2/build/TwitterStream.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var split_1 = __importDefault(require_split());
    var TwitterError_1 = __importDefault(require_TwitterError());
    var State;
    (function(State2) {
      State2[State2["NOT_STARTED"] = 0] = "NOT_STARTED";
      State2[State2["STARTED"] = 1] = "STARTED";
      State2[State2["CLOSED"] = 2] = "CLOSED";
    })(State || (State = {}));
    var DeferredPromise = class {
      constructor() {
        this.resolve = () => {
        };
        this.reject = () => {
        };
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      }
    };
    var TwitterStream = class {
      constructor(connect, close, options) {
        const { timeout = 30 } = options;
        this._connect = connect;
        this._close = close;
        this._state = State.NOT_STARTED;
        this._events = [new DeferredPromise()];
        this._wait = timeout * 1e3;
      }
      _emit(promise) {
        this._events[this._events.length - 1].resolve(promise);
        this._events.push(new DeferredPromise());
      }
      _refreshTimeout() {
        if (this._state !== State.CLOSED) {
          if (this._timeout) {
            clearTimeout(this._timeout);
          }
          this._timeout = setTimeout(() => {
            this._closeWithError(new TwitterError_1.default("Stream unresponsive"));
          }, this._wait);
        }
      }
      _closeWithError(error) {
        if (this._state !== State.CLOSED) {
          this._state = State.CLOSED;
          if (this._timeout) {
            clearTimeout(this._timeout);
          }
          this._emit(Promise.reject(error));
          this._close();
        }
      }
      [Symbol.asyncIterator]() {
        if (this._state == State.CLOSED) {
          throw new Error("Stream has already been closed.");
        }
        return {
          next: async () => {
            if (this._state == State.NOT_STARTED) {
              this._state = State.STARTED;
              const response = await this._connect();
              const stream = response.body.pipe(split_1.default());
              this._refreshTimeout();
              stream.on("data", (line) => {
                this._refreshTimeout();
                if (!line.trim()) {
                  return;
                }
                if (line == "Rate limit exceeded") {
                  this._closeWithError(new TwitterError_1.default("Rate limit exceeded"));
                  return;
                }
                const json = JSON.parse(line);
                const error = TwitterError_1.default.fromJson(json);
                if (error) {
                  this._closeWithError(error);
                  return;
                }
                this._emit(Promise.resolve({ done: false, value: json }));
              });
              stream.on("error", (error) => {
                this._closeWithError(error);
              });
              stream.on("end", (error) => {
                this.close();
              });
            }
            const event = this._events[0];
            return event.promise.finally(() => {
              if (event === this._events[0]) {
                this._events.shift();
              }
            });
          }
        };
      }
      close() {
        if (this._state !== State.CLOSED) {
          this._state = State.CLOSED;
          if (this._timeout) {
            clearTimeout(this._timeout);
          }
          this._emit(Promise.resolve({ done: true }));
          this._close();
        }
      }
    };
    exports.default = TwitterStream;
  }
});

// node_modules/twitter-v2/build/twitter.js
var require_twitter = __commonJS({
  "node_modules/twitter-v2/build/twitter.js"(exports, module2) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var abort_controller_1 = __importDefault(require_abort_controller());
    var node_fetch_1 = __importDefault(require_lib());
    var url_1 = require("url");
    var Credentials_1 = __importDefault(require_Credentials());
    var TwitterError_js_1 = __importDefault(require_TwitterError());
    var TwitterStream_1 = __importDefault(require_TwitterStream());
    function applyParameters(url, parameters, prefix) {
      prefix = prefix || "";
      if (!parameters) {
        return;
      }
      for (const [key, value] of Object.entries(parameters)) {
        if (typeof value == "object" && value instanceof Array) {
          url.searchParams.set(prefix + key, value.join(","));
        } else if (typeof value == "object") {
          applyParameters(url, value, `${prefix}${key}.`);
        } else {
          url.searchParams.set(prefix + key, value);
        }
      }
    }
    var Twitter2 = class {
      constructor(args) {
        this.credentials = new Credentials_1.default(args);
      }
      async get(endpoint, parameters) {
        const url = new url_1.URL(`https://api.twitter.com/2/${endpoint}`);
        applyParameters(url, parameters);
        const json = await node_fetch_1.default(url.toString(), {
          headers: {
            Authorization: await this.credentials.authorizationHeader(url, {
              method: "GET"
            })
          }
        }).then((response) => response.json());
        const error = TwitterError_js_1.default.fromJson(json);
        if (error) {
          throw error;
        }
        return json;
      }
      async post(endpoint, body, parameters) {
        const url = new url_1.URL(`https://api.twitter.com/2/${endpoint}`);
        applyParameters(url, parameters);
        const json = await node_fetch_1.default(url.toString(), {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: await this.credentials.authorizationHeader(url, {
              method: "POST",
              body
            })
          },
          body: JSON.stringify(body || {})
        }).then((response) => response.json());
        const error = TwitterError_js_1.default.fromJson(json);
        if (error) {
          throw error;
        }
        return json;
      }
      async delete(endpoint, parameters) {
        const url = new url_1.URL(`https://api.twitter.com/2/${endpoint}`);
        applyParameters(url, parameters);
        const json = await node_fetch_1.default(url.toString(), {
          method: "delete",
          headers: {
            Authorization: await this.credentials.authorizationHeader(url, {
              method: "DELETE"
            })
          }
        }).then((response) => response.json());
        const error = TwitterError_js_1.default.fromJson(json);
        if (error) {
          throw error;
        }
        return json;
      }
      stream(endpoint, parameters, options) {
        const abortController = new abort_controller_1.default();
        return new TwitterStream_1.default(async () => {
          const url = new url_1.URL(`https://api.twitter.com/2/${endpoint}`);
          applyParameters(url, parameters);
          return node_fetch_1.default(url.toString(), {
            signal: abortController.signal,
            headers: {
              Authorization: await this.credentials.authorizationHeader(url, {
                method: "GET"
              })
            }
          });
        }, () => {
          abortController.abort();
        }, options || {});
      }
    };
    exports.default = Twitter2;
    module2.exports = Twitter2;
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config2(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config: config2,
      parse
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// src/functions/tweet/handler.ts
var handler_exports = {};
__export(handler_exports, {
  addCustomTweet: () => addCustomTweet,
  reorderTweets: () => reorderTweets,
  searchTweets: () => searchTweets
});
module.exports = __toCommonJS(handler_exports);

// src/libs/lambda.ts
var import_core = __toESM(require_core());
var import_http_json_body_parser = __toESM(require_http_json_body_parser());
var middyfy = (handler) => (0, import_core.default)(handler).use((0, import_http_json_body_parser.default)());

// src/functions/tweet/handler.ts
var import_crypto = require("crypto");

// src/functions/resources/APIresponse.ts
var URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://dcfwz5n420bzu.cloudfront.net";
var header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Origin": URL,
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Credentials": true
};
var statusCodes = {
  Successful: 200,
  created: 201,
  accepted: 202,
  no_content: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notfound: 404,
  timeOut: 408,
  gone: 410,
  notAcceptiable: 406,
  internalError: 500,
  notImplemented: 501,
  badGateway: 502
};

// src/functions/resources/twitterV2.client.ts
var import_twitter_v2 = __toESM(require_twitter());
var dotenv = __toESM(require_main());
dotenv.config();
var clientV2 = new import_twitter_v2.default({
  bearer_token: process.env.BEARER_TOKEN
});

// src/model/database.ts
var AWS = __toESM(require("aws-sdk"));
var dynamoDBClient = () => {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: "local",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET_KEY"
    });
  }
  return new AWS.DynamoDB.DocumentClient();
};
var database_default = dynamoDBClient;

// src/services/creator.service.ts
var CreatorService = class {
  constructor(docClient) {
    this.docClient = docClient;
    this.TableName = "CreatorTable";
  }
  async getAllCreators() {
    const creator = await this.docClient.scan({
      TableName: this.TableName
    }).promise();
    return creator.Items;
  }
  async addCreator(creator) {
    if (!creator) {
      throw new Error("no new creator provided");
    }
    await this.docClient.put({
      TableName: this.TableName,
      Item: creator,
      ConditionExpression: "email <> :email",
      ExpressionAttributeValues: {
        ":email": creator.email
      }
    }).promise();
    return creator;
  }
  async getCreator(email) {
    const result = await this.docClient.get({
      TableName: this.TableName,
      Key: {
        email
      }
    }).promise();
    return result.Item;
  }
  async getCreatorByKey(key) {
    const creator = await this.docClient.query({
      TableName: this.TableName,
      IndexName: "gsiIndex",
      KeyConditionExpression: "apiKey = :key",
      ExpressionAttributeValues: {
        ":key": key
      }
    }).promise();
    return creator.Items[0];
  }
  async updateCreator(email, token) {
    return this.docClient.update({
      TableName: this.TableName,
      Key: {
        email
      },
      UpdateExpression: "set #RefreshAccessToken = :RefreshAccessToken",
      ExpressionAttributeNames: {
        "#RefreshAccessToken": "RefreshAccessToken"
      },
      ExpressionAttributeValues: {
        ":RefreshAccessToken": token
      }
    }).promise().then(() => true).catch((err) => err);
  }
  async deleteCreator(email) {
    await this.docClient.delete({
      TableName: this.TableName,
      Key: {
        email
      }
    }).promise();
  }
};

// src/services/report.service.ts
var ReportService = class {
  constructor(docClient) {
    this.docClient = docClient;
    this.TableName = "ReportTable";
  }
  async getReport(id) {
    const result = await this.docClient.get({
      TableName: this.TableName,
      Key: { reportID: id }
    }).promise();
    if (result === void 0)
      throw new Error(`report with id: ${id} does not exist`);
    const item = result.Item;
    const report = [];
    const reportBlocks = await services_default.reportBlockService.getReportBlocks(item.reportID);
    const promises = reportBlocks.map(async (block) => {
      const type = block.blockType;
      const ob = {};
      ob.blockType = type;
      ob.position = block.position;
      ob.reportBlockID = block.reportBlockID;
      if (type === "TWEET") {
        ob.block = {
          tweetID: block.tweetID
        };
      } else if (type === "RICHTEXT") {
        const style = await services_default.textStyleService.getStyle(block.reportBlockID);
        ob.block = {
          text: block.richText,
          position: block.position,
          style
        };
      }
      report.push(ob);
    });
    await Promise.all(promises);
    await services_default.reportBlockService.sortReportBlocks(report);
    const rp = [];
    let bl = false;
    let count = 0;
    let max;
    for (let y2 = 0; y2 < report.length; y2++) {
      max = report[y2].position;
    }
    let y = 0;
    for (let x = 0; x < max + 2; x++) {
      if (report[y] !== void 0) {
        if (report[y].position === x) {
          rp.push(report[y]);
          bl = true;
          count++;
          y++;
        }
      }
      if (!bl) {
        rp.push({ blockType: "RICHTEXT", position: x, block: null });
        count++;
      }
      bl = false;
    }
    item.Report = rp;
    item.numOfBlocks = count;
    return result.Item;
  }
  async getReportHelper(id) {
    const result = await this.docClient.get({
      TableName: this.TableName,
      Key: { reportID: id }
    }).promise();
    return result.Item;
  }
  async getReports(key) {
    const result = await this.docClient.query({
      TableName: this.TableName,
      IndexName: "reportIndex",
      KeyConditionExpression: "apiKey = :apiKey",
      ExpressionAttributeValues: {
        ":apiKey": key
      }
    }).promise();
    if (result === void 0)
      throw new Error(`no reports found`);
    return result.Items;
  }
  async getDraftReports(key) {
    const result = await this.docClient.query({
      TableName: this.TableName,
      IndexName: "reportIndex",
      KeyConditionExpression: "apiKey = :apiKey",
      FilterExpression: "#status = :status",
      ExpressionAttributeValues: {
        ":apiKey": key,
        ":status": "DRAFT"
      },
      ExpressionAttributeNames: {
        "#status": "status"
      }
    }).promise();
    return result.Items;
  }
  async getPublishedReports(key) {
    const result = await this.docClient.query({
      TableName: this.TableName,
      IndexName: "reportIndex",
      KeyConditionExpression: "apiKey = :apiKey",
      FilterExpression: "#status = :status",
      ExpressionAttributeValues: {
        ":apiKey": key,
        ":status": "PUBLISHED"
      },
      ExpressionAttributeNames: {
        "#status": "status"
      }
    }).promise();
    return result.Items;
  }
  async getAllPublishedReports() {
    const result = await this.docClient.query({
      TableName: this.TableName,
      IndexName: "statusIndex",
      KeyConditionExpression: "#status = :status",
      ExpressionAttributeNames: {
        "#status": "status"
      },
      ExpressionAttributeValues: {
        ":status": "PUBLISHED"
      }
    }).promise();
    return result.Items;
  }
  async getSharedReports(key) {
    const permissions = await services_default.permissionService.getPermissions(key);
    const results = [];
    const promises = permissions.map(async (permission) => {
      const id = permission.reportID;
      const report = await this.getReportHelper(id);
      results.push(report);
    });
    await Promise.all(promises);
    return results;
  }
  async addReport(report) {
    await this.docClient.put({
      TableName: this.TableName,
      Item: report
    }).promise();
    return report;
  }
  async updateReportStatus(status, reportID) {
    await this.docClient.update({
      TableName: this.TableName,
      Key: {
        reportID
      },
      UpdateExpression: "SET #status = :status",
      ExpressionAttributeNames: {
        "#status": "status"
      },
      ExpressionAttributeValues: {
        ":status": status
      }
    }).promise();
  }
  async updateReportTitle(title, reportID) {
    await this.docClient.update({
      TableName: this.TableName,
      Key: {
        reportID
      },
      UpdateExpression: "SET #title = :title",
      ExpressionAttributeNames: {
        "#title": "title"
      },
      ExpressionAttributeValues: {
        ":title": title
      }
    }).promise();
  }
  async deleteReport(id) {
    await this.docClient.delete({
      TableName: this.TableName,
      Key: {
        reportID: id
      }
    }).promise();
  }
  async verifyOwner(reportID, apiKey) {
    const per = await this.getReport(reportID);
    return per.apiKey === apiKey;
  }
};

// src/services/reportBlock.service.ts
var ReportBlockService = class {
  constructor(docClient) {
    this.docClient = docClient;
    this.TableName = "ReportBlockTable";
  }
  async getReportBlock(reportBlockID) {
    const result = await this.docClient.get({
      TableName: this.TableName,
      Key: { id: reportBlockID }
    }).promise();
    return result.Item;
  }
  async getReportBlocks(key) {
    const result = await this.docClient.query({
      TableName: this.TableName,
      IndexName: "reportBlockIndex",
      KeyConditionExpression: "reportID = :reportID",
      ExpressionAttributeValues: {
        ":reportID": key
      }
    }).promise();
    if (result === void 0)
      return [];
    const blocks = result.Items;
    this.sortReportBlocks(blocks);
    return blocks;
  }
  async addReportBlock(reportBlock) {
    await this.docClient.put({
      TableName: this.TableName,
      Item: reportBlock
    }).promise();
    return reportBlock;
  }
  async deleteReportBlock(id) {
    await this.docClient.delete({
      TableName: this.TableName,
      Key: { reportBlockID: id }
    }).promise();
  }
  async updatePosition(id, position) {
    await this.docClient.update({
      TableName: this.TableName,
      Key: {
        reportBlockID: id
      },
      UpdateExpression: "SET #position = :position",
      ExpressionAttributeValues: {
        ":position": position
      },
      ExpressionAttributeNames: {
        "#position": "position"
      }
    }).promise();
  }
  async sortReportBlocks(reportBlocks) {
    this;
    reportBlocks.sort((a, b) => {
      if (a.position > b.position)
        return 1;
      if (a.position < b.position)
        return -1;
      return 0;
    });
    return reportBlocks;
  }
};

// src/services/resultSet.service.ts
var ResultSetService = class {
  constructor(docClient) {
    this.docClient = docClient;
    this.TableName = "ResultSetTable";
  }
  async getResultSets(key) {
    const result = await this.docClient.query({
      TableName: this.TableName,
      IndexName: "resultSetIndex",
      KeyConditionExpression: "apiKey = :apiKey",
      ExpressionAttributeValues: {
        ":apiKey": key
      }
    }).promise();
    return result.Items;
  }
  async getResultSet(id, key) {
    const result = await this.docClient.get({
      TableName: this.TableName,
      Key: {
        id,
        apiKey: key
      }
    }).promise();
    if (result === void 0)
      throw new Error(`result set with id: ${id} does not exist.`);
    return result.Item;
  }
  async addResultSet(resultSet) {
    await this.docClient.put({
      TableName: this.TableName,
      Item: resultSet
    }).promise();
    return resultSet;
  }
  async deleteResultSet(id, key) {
    await this.docClient.delete({
      TableName: this.TableName,
      Key: {
        id,
        apiKey: key
      }
    }).promise();
  }
};

// src/services/textStyles.service.ts
var TextStyleService = class {
  constructor(docClient) {
    this.docClient = docClient;
    this.TableName = "TextStylesTable";
  }
  async getStyle(RBID) {
    const result = await this.docClient.query({
      TableName: this.TableName,
      IndexName: "textStylesIndex",
      KeyConditionExpression: "reportBlockID = :reportBlockID",
      ExpressionAttributeValues: {
        ":reportBlockID": RBID
      }
    }).promise();
    return result.Items;
  }
  async addStyle(style) {
    await this.docClient.put({
      TableName: this.TableName,
      Item: style
    }).promise();
    return style;
  }
  async deleteStyle(id) {
    await this.docClient.delete({
      TableName: this.TableName,
      Key: {
        textStylesID: id
      }
    }).promise();
  }
};

// src/services/permission.service.ts
var PermissionService = class {
  constructor(docClient) {
    this.docClient = docClient;
    this.TableName = "PermissionTable";
  }
  async getPermission(id, key) {
    const result = await this.docClient.get({
      TableName: this.TableName,
      Key: { reportID: id, apiKey: key }
    }).promise();
    return result.Item;
  }
  async addPermission(permission) {
    await this.docClient.put({
      TableName: this.TableName,
      Item: permission
    }).promise();
    return permission;
  }
  async verifyReportRetr(status, apiKey, reportID) {
    const per = await this.getPermission(reportID, apiKey);
    if (status !== "PUBLISHED" && per === void 0) {
      return false;
    }
    return true;
  }
  async verifyEditor(reportID, apiKey) {
    const per = await this.getPermission(reportID, apiKey);
    return per !== void 0 && per.type === "EDITOR";
  }
  async getPermissions(key) {
    const result = await this.docClient.query({
      TableName: this.TableName,
      IndexName: "permissionsIndex",
      KeyConditionExpression: "apiKey = :apiKey",
      ExpressionAttributeValues: {
        ":apiKey": key
      }
    }).promise();
    return result.Items;
  }
  async updatePermission(id, key, perm) {
    const result = await this.docClient.update({
      TableName: this.TableName,
      Key: {
        reportID: id,
        apiKey: key
      },
      UpdateExpression: "SET type = :type",
      ExpressionAttributeValues: {
        ":type": perm
      }
    }).promise();
    return result.Attributes;
  }
  async deletePermission(id, key) {
    await this.docClient.delete({
      TableName: this.TableName,
      Key: {
        reportID: id,
        apiKey: key
      }
    }).promise();
  }
};

// src/services/tweet.service.ts
var TweetService = class {
  async addTweets(data, includes, numTweets) {
    this;
    const tweetList = [];
    for (let i = 0; i < numTweets; i++) {
      if (i in includes.users) {
        tweetList.push({
          numComments: data[i].public_metrics.reply_count,
          numLikes: data[i].public_metrics.like_count,
          numRetweets: data[i].public_metrics.retweet_count,
          tweetId: data[i].id
        });
      }
    }
    return tweetList;
  }
  async sortTweets(tweets, sortBy) {
    this;
    if (sortBy === "byLikes") {
      tweets.sort((a, b) => {
        if (a.numLikes < b.numLikes)
          return 1;
        if (a.numLikes > b.numLikes)
          return -1;
        return 0;
      });
    } else if (sortBy === "byComments") {
      tweets.sort((a, b) => {
        if (a.numComments < b.numComments)
          return 1;
        if (a.numComments > b.numComments)
          return -1;
        return 0;
      });
    } else if (sortBy === "byRetweets") {
      tweets.sort((a, b) => {
        if (a.numRetweets < b.numRetweets)
          return 1;
        if (a.numRetweets > b.numRetweets)
          return -1;
        return 0;
      });
    }
    return tweets;
  }
  async createArray(tweets) {
    this;
    const result = [];
    tweets.map(async (tweet) => {
      result.push(tweet.tweetId);
    });
    return result;
  }
};

// src/services/schedule.service.ts
var ScheduleService = class {
  constructor(docCLient) {
    this.docCLient = docCLient;
    this.TableName = "ScheduleTable";
  }
  async getSchedule(id) {
    const result = await this.docCLient.get({
      TableName: this.TableName,
      Key: { id }
    }).promise();
    return result.Item;
  }
  async getShedules(key) {
    const result = await this.docCLient.query({
      TableName: this.TableName,
      IndexName: "scheduleIndex",
      KeyConditionExpression: "apiKey = :apiKey",
      ExpressionAttributeValues: {
        ":apiKey": key
      }
    }).promise();
    return result.Items;
  }
  async addScheduleSetting(scheduleSetting) {
    await this.docCLient.put({
      TableName: this.TableName,
      Item: scheduleSetting
    }).promise();
    return scheduleSetting;
  }
  async updateScheduleSetting(id, date) {
    await this.docCLient.update({
      TableName: this.TableName,
      Key: { id },
      UpdateExpression: "set lastGenerated = :lastGenerated",
      ExpressionAttributeValues: {
        ":lastGenerated": date
      }
    }).promise();
  }
  async deleteScheduleSetting(id) {
    await this.docCLient.delete({
      TableName: this.TableName,
      Key: { id }
    }).promise();
  }
};

// src/services/index.ts
var reportService = new ReportService(database_default());
var creatorService = new CreatorService(database_default());
var resultSetServices = new ResultSetService(database_default());
var reportBlockService = new ReportBlockService(database_default());
var textStyleService = new TextStyleService(database_default());
var tweetService = new TweetService();
var permissionService = new PermissionService(database_default());
var scheduleService = new ScheduleService(database_default());
var services_default = {
  creatorService,
  tweetService,
  resultSetServices,
  reportService,
  reportBlockService,
  textStyleService,
  permissionService,
  scheduleService
};

// src/functions/tweet/handler.ts
var searchTweets = middyfy(
  async (event) => {
    try {
      const params = JSON.parse(event.body);
      let filter;
      if (params.filterBy === "noneReply") {
        filter = " -is:reply";
      } else if (params.filterBy === "verifiedTweets") {
        filter = " is:verified";
      } else {
        filter = "";
      }
      const { meta, data, includes } = await clientV2.get("tweets/search/recent", {
        query: `${params.keyword + filter} -is:retweet lang:en`,
        max_results: "100",
        tweet: {
          fields: ["public_metrics", "author_id", "created_at"]
        },
        expansions: "author_id",
        user: {
          fields: ["id", "username", "name"]
        },
        sort_order: "relevancy"
      });
      const dd = new Date();
      const d = new Date(`${dd.toLocaleString()}-02:00`);
      let id;
      id = "RS-";
      id += (0, import_crypto.randomUUID)();
      const tweetlist = await services_default.tweetService.addTweets(
        data,
        includes,
        meta.result_count
      );
      const sortedList = await services_default.tweetService.sortTweets(
        tweetlist,
        params.sortBy
      );
      const result = sortedList.slice(0, params.numOfTweets);
      const tweetIDs = await services_default.tweetService.createArray(result);
      services_default.resultSetServices.addResultSet({
        id,
        apiKey: params.apiKey,
        dateCreated: d.toString(),
        searchPhrase: params.keyword,
        sortOption: params.sortBy,
        filterOption: params.filterBy,
        tweets: tweetIDs
      });
      return {
        statusCode: statusCodes.Successful,
        headers: header,
        body: JSON.stringify({ resultSetID: id, tweets: result })
      };
    } catch (e) {
      return {
        statusCode: statusCodes.internalError,
        headers: header,
        body: JSON.stringify(e)
      };
    }
  }
);
var addCustomTweet = middyfy(
  async (event) => {
    try {
      const params = JSON.parse(event.body);
      const lastS = params.url.lastIndexOf("/") + 1;
      const id = params.url.substring(lastS);
      const tweets = await services_default.reportService.getReport(params.reportID);
      const position = tweets.numOfBlocks + 1;
      await services_default.reportBlockService.addReportBlock({
        blockType: "TWEET",
        position,
        reportBlockID: `BK-${(0, import_crypto.randomUUID)()}`,
        reportID: params.reportID,
        tweetID: id
      });
      return {
        statusCode: statusCodes.Successful,
        headers: header,
        body: JSON.stringify(id)
      };
    } catch (e) {
      return {
        statusCode: statusCodes.internalError,
        headers: header,
        body: JSON.stringify(e)
      };
    }
  }
);
var reorderTweets = middyfy(
  async (event) => {
    try {
      const params = JSON.parse(event.body);
      if (!await services_default.permissionService.verifyEditor(
        params.reportID,
        params.apiKey
      ) && !await services_default.reportService.verifyOwner(params.reportID, params.apiKey)) {
        return {
          statusCode: statusCodes.unauthorized,
          headers: header,
          body: JSON.stringify("Don't have enough permissions to edit this report.")
        };
      }
      let blocks = await services_default.reportBlockService.getReportBlocks(params.reportID);
      blocks = await services_default.reportBlockService.sortReportBlocks(blocks);
      const tweet1 = blocks.find((tweet) => {
        return tweet.position === params.pos;
      });
      let pos2;
      if (params.newPlace === "UP") {
        pos2 = params.pos - 2;
      } else {
        pos2 = params.pos + 2;
      }
      const tweet2 = blocks.find((tweet) => {
        return tweet.position === pos2;
      });
      await services_default.reportBlockService.updatePosition(
        tweet1.reportBlockID,
        tweet2.position
      );
      await services_default.reportBlockService.updatePosition(
        tweet2.reportBlockID,
        tweet1.position
      );
      return {
        statusCode: statusCodes.Successful,
        headers: header,
        body: JSON.stringify("Operation Successful")
      };
    } catch (e) {
      return {
        statusCode: statusCodes.internalError,
        headers: header,
        body: JSON.stringify(e)
      };
    }
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addCustomTweet,
  reorderTweets,
  searchTweets
});
//# sourceMappingURL=handler.js.map
