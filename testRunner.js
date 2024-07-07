const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const createTestCafe = require('testcafe');

const argv = yargs(hideBin(process.argv)).argv;

(async () => {
    process.env.testEnv = process.env.testEnv ? process.env.testEnv : argv.testEnv ? argv.testEnv : 'dev';

    const testCafeOptions = {
        hostname: 'localhost',
        port1: 1337,
        port2: 1338,
        configFile: `configs/${process.env.testEnv}.testcaferc.js`
    };

    const testcafe = await createTestCafe(testCafeOptions);

    const runner = testcafe.createRunner();

    if (argv.startCommand) {
        await runner.startApp(argv.startCommand);
    }

    await runner.run();
    await testcafe.close();
})();