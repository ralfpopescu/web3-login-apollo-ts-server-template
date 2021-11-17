"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var defaultTags = {
    request: 'Request:',
    variables: 'Variables:',
    response: 'Response:',
    error: 'Error!',
    responseError: 'Response - Error encountered - no data',
};
var QueryLogger = /** @class */ (function () {
    function QueryLogger(logger, userTags) {
        if (userTags === void 0) { userTags = {}; }
        this.requestId = (0, uuid_1.v4)();
        this.logger = logger;
        this.tags = __assign(__assign({}, defaultTags), userTags);
    }
    QueryLogger.prototype.requestDidStart = function (requestContext) {
        var queryString = requestContext.queryString, variables = requestContext.variables, request = requestContext.request;
        if (!queryString.includes('query IntrospectionQuery')) {
            var requestId = request.headers.get('request-id') || "gen" + (0, uuid_1.v4)();
            this.logger.debug(this.tags.request + " " + queryString, { requestId: requestId });
            if (variables && Object.keys(variables).length > 0) {
                this.logger.debug(this.tags.variables + " " + JSON.stringify(variables), { requestId: this.requestId });
            }
        }
        else {
            this.requestId = 'introspection';
        }
    };
    QueryLogger.prototype.didEncounterErrors = function (errors) {
        var _this = this;
        errors.forEach(function (error) {
            _this.logger.error(_this.tags.error, { requestId: _this.requestId }, error);
        });
    };
    QueryLogger.prototype.willSendResponse = function (_a) {
        var graphqlResponse = _a.graphqlResponse;
        if (!graphqlResponse || !graphqlResponse.data) {
            this.logger.error(this.tags.responseError, { requestId: this.requestId });
        }
        else if (this.requestId !== 'introspection') {
            var _b = graphqlResponse.data, __schema = _b.__schema, loggingPayload = __rest(_b, ["__schema"]);
            this.logger.debug(this.tags.response + " " + JSON.stringify(loggingPayload), { requestId: this.requestId });
        }
    };
    return QueryLogger;
}());
module.exports = { QueryLogger: QueryLogger };
