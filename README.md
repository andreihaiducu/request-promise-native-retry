# request-promise-native-retry
Typescript retry module for request-promise-native

npm i request-promise-native-retry

yarn add request-promise-native-retry

Typescript module wrapper for retring request-promise-native promises.

Usage: 

        import { RetryPromiseNative } from 'request-promise-native-retry'

        const retryableStatusCodes = [
            404,
            500,
            400
        ]
        const retryableCodes = [
            'ECONNRESET',
            'ETIMEDOUT',
            'ENOTFOUND'
        ];
        const retryOptions: RetryOptions = {
            retries: 4,
            minTimeout: 10,
            maxTimeout: 1000,
            randomize: false
        }

        const retryPromiseNative = new RetryPromiseNative(retryableCodes, retryableStatusCodes, retryOptions)

        const retryRequestClient = retryPromiseNative.getClient()

        retryRequestClient({
            method: 'GET',
            url:  'Your url'
        }).then(res => console.log(res)).catch(err => console.log(err))

Feel free to add any status code that you want to retry on, also any error code.


`retryRequestClient` accepts all options from *[request-promise-native](https://github.com/request/request-promise-native)*. npm package

