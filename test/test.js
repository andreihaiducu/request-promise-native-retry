'use strict'
var expect = require('chai').expect;
var index = require('../dist/index.js');


describe('Retry request', () => {
    it('should create class', () => {
        var result = new index.default(['ECONNREFUSED', 'ECONNRESET',
            'ETIMEDOUT',
            'ENOTFOUND'], [
                404,
                500,
                400
            ], {
                retries: 3,
                minTimeout: 10,
                maxTimeout: 1000,
                randomize: true
            })
        var client = result.getClient()
        client({
            method: 'GET',
            url: 'http://localhost:8080'
        }).then(res => console.log(res)).catch(err => console.log(err))
    })
})