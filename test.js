const assert = require('assert');
const atm = require('./atm-template').ATM;

let initialCash = atm.cash;
let logsNumber = atm.logs.length;

console.log(`cash = ${initialCash}`);

/**************************
 *                        *
 * Unauthorized user test *
 *                        *
 **************************/

describe('Testing the attempt of authorization with wrong user id', function () {

    atm.auth("9999", "123"); // It is expected that there is no user with 9999 id
    logsNumber++;

    it('Should return false for isAuth', function () {
        assert.equal(atm.isAuth, false);
    });
    it('Should return the correct logs number', function () {
        assert.equal(atm.logs.length, logsNumber);
    });
});

describe('Testing an attempt of authorization with wrong pin', function () {

    atm.auth("0025", "124");
    logsNumber++;

    it('Should return false for isAuth', function () {
        assert.equal(atm.isAuth, false);
    });
    it('Should return the correct logs number', function () {
        assert.equal(atm.logs.length, logsNumber);
    });
});

describe('Testing the attempt of balance check by an unauthorized user.', function () {

    atm.check();
    logsNumber++;

    it('Should return the correct logs number', function () {
        assert.equal(atm.logs.length, logsNumber);
    });
});

describe('Testing the attempt of cache withdrawal by an unauthorized user.', function () {

    atm.getCash(1);
    logsNumber++;

    it('Should return amount of cash equal to te initial amount', function () {
        assert.equal(atm.cash, initialCash);
    });
    it('Should return correct logs number', function () {
        assert.equal(atm.logs.length, logsNumber);
    });
});

describe('Testing the attempt of load cache (on a user balance) by an unauthorized user.', function () {

    atm.loadCash(1);
    logsNumber++;

    it('Should return amount of cash equal to te initial amount', function () {
        assert.equal(atm.cash, initialCash);
    });
    it('Should return correct logs number', function () {
        assert.equal(atm.logs.length, logsNumber);
    });
});

describe('Testing the attempt of load ATM cache by an unauthorized user.', function () {

    atm.loadAtmCash(1);
    logsNumber++;

    it('Should return amount of cash equal to te initial amount', function () {
        assert.equal(atm.cash, initialCash);
    });
    it('Should return correct logs number', function () {
        assert.equal(atm.logs.length, logsNumber);
    });
});

describe('Testing the attempt of getting logs by an unauthorized user.', function () {

    atm.getLogs();
    logsNumber++;

    it('Should return correct logs number', function () {
        assert.equal(atm.logs.length, logsNumber);
    });
});

describe('Testing the attempt of logging out by an unauthorized user.', function () {

    atm.logout();
    logsNumber++;

    it('Should return correct logs number', function () {
        assert.equal(atm.logs.length, logsNumber);
    });
});


/******************************************
 *                                        *
 * Authorization and authorized user test *
 *                                        *
 ******************************************/


// describe('Testing successful user authentication', function () {
//
//     // atm.auth("0025", "123");
//     logsNumber++;
//
//     it('Should return true for isAuth', function () {
//         assert.equal(atm.isAuth, true);
//     });
//     it('Should return the correct logs number', function () {
//         assert.equal(atm.logs.length, logsNumber);
//     });
// });
