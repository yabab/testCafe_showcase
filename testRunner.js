const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const createTestCafe = require('testcafe');

const argv = yargs(hideBin(process.argv)).argv;

(async () => {
    const testCafeOptions = {
        hostname: 'localhost',
        port1: 1337,
        port2: 1338,
        configFile: argv.configFile? argv.configFile : 'configs/.testcaferc.js',
    };

    const testcafe = await createTestCafe(testCafeOptions);

    const runner = testcafe.createRunner();

    if (argv.startCommand) {
        await runner.startApp(argv.startCommand);
    }

    await runner.run();
    await testcafe.close();
})();