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

// src/functions/resultSet/handler.ts
var handler_exports = {};
__export(handler_exports, {
  deleteResultSet: () => deleteResultSet,
  getAllResultSet: () => getAllResultSet,
  getResultSet: () => getResultSet
});
module.exports = __toCommonJS(handler_exports);

// src/libs/lambda.ts
var import_core = __toESM(require_core());
var import_http_json_body_parser = __toESM(require_http_json_body_parser());
var middyfy = (handler) => (0, import_core.default)(handler).use((0, import_http_json_body_parser.default)());

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

// src/functions/resultSet/handler.ts
var getAllResultSet = middyfy(
  async (event) => {
    try {
      const params = JSON.parse(event.body);
      const resultSet = await services_default.resultSetServices.getResultSets(params.apiKey);
      return {
        statusCode: statusCodes.Successful,
        headers: header,
        body: JSON.stringify(resultSet)
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
var getResultSet = middyfy(
  async (event) => {
    try {
      const params = JSON.parse(event.body);
      const resultSet = await services_default.resultSetServices.getResultSet(
        params.resultSetID,
        params.apiKey
      );
      return {
        statusCode: statusCodes.Successful,
        headers: header,
        body: JSON.stringify(resultSet)
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
var deleteResultSet = middyfy(
  async (event) => {
    try {
      const params = JSON.parse(event.body);
      const result = await services_default.resultSetServices.deleteResultSet(
        params.resultSetID,
        params.apiKey
      );
      return {
        statusCode: statusCodes.Successful,
        headers: header,
        body: JSON.stringify(result)
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
  deleteResultSet,
  getAllResultSet,
  getResultSet
});
//# sourceMappingURL=handler.js.map
