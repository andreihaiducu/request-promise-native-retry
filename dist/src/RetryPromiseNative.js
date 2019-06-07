"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var index_1 = __importDefault(require("promise-retry/index"));
var RetryPromiseNative = /** @class */ (function () {
    function RetryPromiseNative(retryableCodes, retryableStatusCodes, retryOptions) {
        this.retryableCodes = [];
        this.retryableStatusCodes = [];
        this.retryOptions = retryOptions;
        this.retryableCodes = retryableCodes;
        this.retryableStatusCodes = retryableStatusCodes;
    }
    RetryPromiseNative.prototype.checkErrType = function (err) {
        var retryable = false;
        if (err.name == 'RequestError') {
            retryable = this.retryableCodes.indexOf(err.cause.code) >= 0;
        }
        if (err.name == 'StatusCodeError') {
            retryable = this.retryableStatusCodes.indexOf(err.statusCode) >= 0;
        }
        return retryable;
    };
    RetryPromiseNative.prototype.requestPromiseRetry = function (requestPromise) {
        var _this = this;
        return function (req) {
            return index_1.default(function (retry) {
                return requestPromise(req).catch(function (err) {
                    var retryable = _this.checkErrType(err);
                    if (!retryable) {
                        throw err;
                    }
                    return retry(err);
                });
            }, _this.retryOptions);
        };
    };
    RetryPromiseNative.prototype.getClient = function () {
        return this.requestPromiseRetry(request_promise_native_1.default);
    };
    return RetryPromiseNative;
}());
exports.RetryPromiseNative = RetryPromiseNative;
