import { RetryOptions } from "./interfaces";
export declare class RetryPromiseNative {
    private retryableCodes;
    private retryableStatusCodes;
    private retryOptions;
    constructor(retryableCodes: string[], retryableStatusCodes: number[], retryOptions: RetryOptions);
    private checkErrType;
    private requestPromiseRetry;
    getClient(): (req: any) => Promise<{}>;
}
