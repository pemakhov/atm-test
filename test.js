const assert = require('assert');
const atm = require('./atm-template').ATM;

let atmNotAuth = {};
let atmUser = {};
let atmAdmin = {};
atmNotAuth = Object.assign(atmNotAuth, atm);
atmUser = Object.assign(atmUser, atm);
atmAdmin = Object.assign(atmAdmin, atm);

atmUser.auth("0025", "123");
atmAdmin.auth("0000", "000");

const INITIAL_CASH = 2000;

function makeSuit(name, tests) {
    describe(name, function () {
        before(function () {
            atmNotAuth.logs = [];
            atmNotAuth.cash = INITIAL_CASH;

            atmUser.logs = [];
            atmUser.cash = INITIAL_CASH;
            atmUser.currentUser.debet = 1000;

            atmAdmin.logs = [];
            atmAdmin.cash = INITIAL_CASH;
        });
        tests();
    })
}


makeSuit('Testing auth()', function () {

    describe('Not authorized user', function () {
        describe('Wrong ID', function () {
            it('Should return false for isAuth', function (done) {
                atmNotAuth.auth("9999", "123"); // It is expected that there is no user with 9999 id
                assert.equal(atmNotAuth.isAuth, false);
                done();
            });
        });
        describe('Wrong password', function () {
            it('Should return false for isAuth', function (done) {
                atmNotAuth.auth("0025", "124"); // It is expected that this id is correct but password is wrong
                assert.equal(atmNotAuth.isAuth, false);
                done();
            });
        });
        it('Should return the correct logs number', function (done) {
            atmNotAuth.auth("9999", "123"); // It is expected that there is no user with 9999 id
            atmNotAuth.auth("0025", "124"); // It is expected that this id is correct but password is wrong
            assert.equal(atmNotAuth.logs.length, 2);
            done();
        });
    });

    describe('User', function () {
        describe('Wrong ID', function () {
            const userId = atmUser.currentUser.id;
            it('Should return true for isAuth', function (done) {
                atmUser.auth("9999", "123"); // It is expected that there is no user with 9999 id
                assert.equal(atmUser.isAuth, true);
                done();
            });
            it('Should return the correct user id', function (done) {
                assert.equal(atmUser.currentUser.id, userId);
                done();
            });
        });
        describe('Wrong password', function () {
            const userId = atmUser.currentUser.id;
            it('Should return the correct user id', function (done) {
                atmUser.users.unshift({id: "1111", pin: "111", debet: 675, type: "user"});
                atmUser.auth("1111", "111");
                assert.equal(atmUser.currentUser.id, userId);
                done();
            });
            it('Should return the correct logs number', function (done) {
                assert.equal(atmUser.logs.length, 2);
                done();
            });
        });
    });

    describe('Admin', function () {
        describe('Wrong ID', function () {
            const adminId = atmAdmin.currentUser.id;
            it('Should return true for isAuth', function (done) {
                atmAdmin.auth("9999", "123"); // It is expected that there is no user with 9999 id
                assert.equal(atmAdmin.isAuth, true);
                done();
            });
            it('Should return the correct user id', function (done) {
                assert.equal(atmAdmin.currentUser.id, adminId);
                done();
            });
        });
        describe('Wrong password', function () {
            const adminId = atmAdmin.currentUser.id;
            it('Should return the correct user id', function (done) {
                atmAdmin.users.unshift({id: "1111", pin: "111", debet: 675, type: "user"});
                atmAdmin.auth("1111", "111");
                assert.equal(atmAdmin.currentUser.id, adminId);
                done();
            });
            it('Should return the correct logs number', function (done) {
                assert.equal(atmAdmin.logs.length, 2);
                done();
            });
        });
    });
});

makeSuit('Testing check()', function () {

    describe('Not authorized user', function () {
        it('Should return the correct logs number', function (done) {
            atmNotAuth.check();
            assert.equal(atmNotAuth.logs.length, 1);
            done();
        });
    });

    describe('User', function () {
        it('Should return the correct logs number', function (done) {
            atmUser.check();
            assert.equal(atmUser.logs.length, 1);
            done();
        });
    });

    describe('Admin', function () {
        it('Should return the correct logs number', function (done) {
            atmAdmin.check();
            assert.equal(atmAdmin.logs.length, 1);
            done();
        });
    });
});

makeSuit('Testing getCash()', function () {

    describe('Not authorized user', function () {
        it('Should return the initial amount of cash', function (done) {
            atmNotAuth.getCash(1);
            assert.equal(atmNotAuth.cash, INITIAL_CASH);
            done();
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmNotAuth.logs.length, 1);
            done();
        });
    });

    describe('User', function () {
        describe('Withdraw correct amount of money', function () {
            it('Should return new amount of money', function (done) {
                const initialDebet = atmUser.currentUser.debet;
                atmUser.getCash(1);
                assert.equal(atmUser.currentUser.debet, initialDebet - 1);
                done();
            });
            it('Should return new amount of cash in ATM', function (done) {
                assert.equal(atmUser.cash, INITIAL_CASH - 1);
                done();
            });
            it('Should return correct logs number', function (done) {
                assert.equal(atmUser.logs.length, 1);
                done();
            });
        });
        describe('Withdraw more money than on the debet', function () {
            it('Should return the initial amount of money', function (done) {
                const initialDebet = atmUser.currentUser.debet;
                atmUser.getCash(initialDebet + 1);
                assert.equal(atmUser.currentUser.debet, initialDebet);
                assert.equal(atmUser.cash, INITIAL_CASH - 1);
                done();
            });
        });
    });

    describe('Admin', function () {
        it('Should return the initial amount of cash in ATM', function (done) {
            atmAdmin.getCash(1);
            assert.equal(atmAdmin.cash, INITIAL_CASH);
            done();
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmAdmin.logs.length, 1);
            done();
        });
    });
});

makeSuit('Testing loadCash()', function () {

    describe('Not authorized user', function () {
        it('Should return the initial amount of cash', function (done) {
            atmNotAuth.loadCash(1);
            assert.equal(atmNotAuth.cash, INITIAL_CASH);
            done();
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmNotAuth.logs.length, 1);
            done();
        });
    });

    describe('User', function () {
        it('Should return new amount of money on user balance', function (done) {
            const initialDebet = atmUser.currentUser.debet;
            atmUser.loadCash(1);
            assert.equal(atmUser.currentUser.debet, initialDebet + 1);
            done();
        });
        it('Should return new amount of cash in ATM', function (done) {
            assert.equal(atmUser.cash, INITIAL_CASH + 1);
            done();
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmUser.logs.length, 1);
            done();
        });
    });

    describe('Admin', function () {
        it('Should return the initial amount of cash in ATM', function (done) {
            atmAdmin.loadCash(1);
            assert.equal(atmAdmin.cash, INITIAL_CASH);
            done();
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmAdmin.logs.length, 1);
            done();
        });
    });
});

makeSuit('Testing loadAtmCash()', function () {

    describe('Not authorized user', function () {
        it('Should return amount of cash equal to te initial amount', function (done) {
            atmNotAuth.loadAtmCash(1);
            assert.equal(atmNotAuth.cash, INITIAL_CASH);
            done();
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmNotAuth.logs.length, 1);
            done();
        });
    });

    describe('User', function () {
        it('Should return the initial amount of cash', function (done) {
            atmUser.loadAtmCash(1);
            assert.equal(atmUser.cash, INITIAL_CASH);
            done();
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmUser.logs.length, 1);
            done();
        });
    });

    describe('Admin', function () {
        it('Should return new amount of cash', function (done) {
            atmAdmin.loadAtmCash(1);
            assert.equal(atmAdmin.cash, INITIAL_CASH + 1);
            done();
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmAdmin.logs.length, 1);
            done();
        });
    });
});

makeSuit('Testing getLogs()', function () {

    describe('Not authorized user', function () {
        it('Should return correct logs number', function (done) {
            atmNotAuth.getLogs();
            assert.equal(atmNotAuth.logs.length, 1);
            done();
        });
    });

    describe('User', function () {
        it('Should return correct logs number', function (done) {
            atmUser.logout();
            assert.equal(atmUser.logs.length, 1);
            done();
        });
    });

    describe('Admin', function () {
        it('Should return correct logs number', function (done) {
            atmAdmin.logout();
            assert.equal(atmAdmin.logs.length, 1);
            done();
        });
    });
});

makeSuit('Testing logout()', function () {

    describe('Not authorized user', function () {
        it('Should return correct logs number', function (done) {
            atmNotAuth.logout();
            assert.equal(atmNotAuth.logs.length, 1);
            done();
        });
    });

    describe('User', function () {
        it('Should return false for isAuth', function () {
            atmUser.logout();
            assert.equal(atmUser.isAuth, false);
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmUser.logs.length, 1);
            done();
        });
    });

    describe('Admin', function () {
        it('Should return false for isAuth', function () {
            atmAdmin.logout();
            assert.equal(atmAdmin.isAuth, false);
        });
        it('Should return correct logs number', function (done) {
            assert.equal(atmAdmin.logs.length, 1);
            done();
        });
    });
});
