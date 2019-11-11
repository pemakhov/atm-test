const assert = require('assert');
const atm = require('./atm-template').ATM;

let initialCash = atm.cash;
let logsNumber = atm.logs.length;

console.log(`cash = ${initialCash}`);

describe('Testing unauthorized access', function () {

    it('Should return amount of cash equal to the initial amount', function () {
        assert.equal(atm.cash, initialCash);
    });
    it('Should return initial logs number', function () {
        assert.equal(atm.logs.length, logsNumber);
    });

    atm.getCash(1);

    it('Should return amount of cash equal to the initial amount', function () {
        assert.equal(atm.cash, initialCash);
    });
    it('Should return correct logs number', function () {
        assert.equal(atm.logs.length, logsNumber + 1);
    });
});

