# atm-test

This test was created for testing atm objects from ST1, introduction to full stack.

The name of the object, all properties and methods should be as they were in the task, without any changes.

Also ATM object should contain user and admin objects, given in the task. It may contain other user objects.

There should be logs array containing logs:

logs: []


Do the following actions to run the tests.

1 Replace atm-template.js file with your own.

2. Insert following code in the end of your atm-template.js:

module.exports = {
    ATM,
};

3. Install needed js scripts (mocha, etc.) with the command:

npm install

4. Run the tests with the command:

npm test test.js


