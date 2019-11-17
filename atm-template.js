const ATM = {
    isAuth: false,
    currentUser: {},
    // all cash available in ATM
    cash: 2000,
    // all available users
    users: [
        { id: "0000", pin: "000", debet: 0, type: "admin" }, // EXTENDED
        { id: "0025", pin: "123", debet: 675, type: "user" }
    ],
    // authorization
    auth(id, pin) {

    },
    // check current debet
    check() {

    },
    // get cash - available for user only
    getCash(amount) {

    },
    // load cash - available for user only
    loadCash(amount) {

    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {

    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {

    },
    // log out
    logout() {

    }
};

module.exports = {
    ATM,
};
