const assert = require('assert');
const atmNotAuth = require('./atm-template').ATM;

const atmAdmin = require('./atm-template').ATM;
atmAdmin.auth("0000", "000");

let initialCash = atmNotAuth.cash;
let logsNumber = atmNotAuth.logs.length;

console.log(`cash = ${initialCash}`);

/**************************
 *                        *
 * Unauthorized user test *
 *                        *
 **************************/

describe('Testing the attempt of authorization with wrong user id', function () {

    atmNotAuth.auth("9999", "123"); // It is expected that there is no user with 9999 id
    logsNumber++;

    it('Should return false for isAuth', function () {
        assert.equal(atmNotAuth.isAuth, false);
    });
    it('Should return the correct logs number', function () {
        assert.equal(atmNotAuth.logs.length, logsNumber);
    });
});

describe('Testing an attempt of authorization with wrong pin', function () {

    atmNotAuth.auth("0025", "124");
    logsNumber++;

    it('Should return false for isAuth', function () {
        assert.equal(atmNotAuth.isAuth, false);
    });
    it('Should return the correct logs number', function () {
        assert.equal(atmNotAuth.logs.length, logsNumber);
    });
});

describe('Testing the attempt of balance check by an unauthorized user.', function () {

    atmNotAuth.check();
    logsNumber++;

    it('Should return the correct logs number', function () {
        assert.equal(atmNotAuth.logs.length, logsNumber);
    });
});

describe('Testing the attempt of cache withdrawal by an unauthorized user.', function () {

    atmNotAuth.getCash(1);
    logsNumber++;

    it('Should return amount of cash equal to te initial amount', function () {
        assert.equal(atmNotAuth.cash, initialCash);
    });
    it('Should return correct logs number', function () {
        assert.equal(atmNotAuth.logs.length, logsNumber);
    });
});

describe('Testing the attempt of load cache (on a user balance) by an unauthorized user.', function () {

    atmNotAuth.loadCash(1);
    logsNumber++;

    it('Should return amount of cash equal to te initial amount', function () {
        assert.equal(atmNotAuth.cash, initialCash);
    });
    it('Should return correct logs number', function () {
        assert.equal(atmNotAuth.logs.length, logsNumber);
    });
});

describe('Testing the attempt of load ATM cache by an unauthorized user.', function () {

    atmNotAuth.loadAtmCash(1);
    logsNumber++;

    it('Should return amount of cash equal to te initial amount', function () {
        assert.equal(atmNotAuth.cash, initialCash);
    });
    it('Should return correct logs number', function () {
        assert.equal(atmNotAuth.logs.length, logsNumber);
    });
});

describe('Testing the attempt of getting logs by an unauthorized user.', function () {

    atmNotAuth.getLogs();
    logsNumber++;

    it('Should return correct logs number', function () {
        assert.equal(atmNotAuth.logs.length, logsNumber);
    });
});

describe('Testing the attempt of logging out by an unauthorized user.', function () {

    atmNotAuth.logout();
    logsNumber++;

    it('Should return correct logs number', function () {
        assert.equal(atmNotAuth.logs.length, logsNumber);
    });
});


/******************************************
 *                                        *
 * Authorization and authorized user test *
 *                                        *
 ******************************************/

const atmUser = require('./atm-template').ATM;
atmUser.auth("0025", "123");
console.log('logs number = ' + atmUser.logs.length);

initialCash = atmUser.cash;
logsNumber = atmUser.logs.length;

describe('Testing successful user authentication', function () {

    it('Should return true for isAuth', function () {
        assert.equal(atmUser.isAuth, true);
    });
    it('Should return the correct logs number', function () {
        assert.equal(atmUser.logs.length, logsNumber);
    });
});
