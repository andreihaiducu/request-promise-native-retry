import request_promise_native from 'request-promise-native';
import promiseRetry from 'promise-retry/index';


import { RetryOptions } from "./interfaces";


export class RetryPromiseNative {

    private retryableCodes: string[] = []
    private retryableStatusCodes: number[] = []
    private retryOptions: RetryOptions

    constructor(retryableCodes: string[], retryableStatusCodes: number[], retryOptions: RetryOptions) {
        this.retryOptions = retryOptions
        this.retryableCodes = retryableCodes
        this.retryableStatusCodes = retryableStatusCodes
    }

    private checkErrType(err: any) {
        let retryable: boolean = false
        if (err.name == 'RequestError') {
            retryable = this.retryableCodes.indexOf(err.cause.code) >= 0;
        }
        if (err.name == 'StatusCodeError') {
            retryable = this.retryableStatusCodes.indexOf(err.statusCode) >= 0;
        }
        return retryable
    }

    private requestPromiseRetry(requestPromise: any) {
       return (req: any) => {
            return promiseRetry((retry: any) => {
                return requestPromise(req).catch((err: any) => {

                    const retryable = this.checkErrType(err)
                    if (!retryable) {
                        throw err;
                    }
                    return retry(err);

                })
            }, this.retryOptions);
        };
    }

    getClient() {
        return this.requestPromiseRetry(request_promise_native)
    }
}


