export interface RetryOptions {
    retries: number;
    minTimeout: number;
    maxTimeout: number;
    randomize: boolean;
}
