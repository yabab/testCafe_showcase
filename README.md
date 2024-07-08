# Set up

Make sure you have both Node.JS and NPM installed, then install the project's dependencies:

```
npm install
```

# Running the tests

You can run the tests using the npm script 'test' or running testRunner.js with the node binary directly:

```
npm run test
node testRunner.js 
```

The tests won't work unless the server and the front-end are running, of course; if you have started the services by yourself or added the 'appCommand' key in the configuration file with the appropriate command, then the commands above should work fine.

```
...
"concurrency": 2,
"src": ["tests/**/*"],
"appCommand": "npm --prefix ../devicesTask_serverApp run start | npm --prefix ../devices-clientapp run start"
"baseUrl": "http://localhost:3001",
...
```

Otherwise, you can use the --startCommand CLI argument to spin up the services.

```
npm run test -- --startCommand "npm --prefix ../devicesTask_serverApp run start | npm --prefix ../devices-clientapp run start"
node testRunner.js --startCommand "npm --prefix ../devicesTask_serverApp run start | npm --prefix ../devices-clientapp run start"
```

When running the tests, you also need to feed the execution with the environment string you wish the tests to run on. By default, that value is 'dev' and it's used to load the 'configs/dev.testcaferc.js' configuration file. Additional configuration files also need to be placed in the 'configs/' folder and named in the same pattern: '(env).testcaferc.js'. To feed that particular configuration file to the execution, use the --testEnv CLI argument to change the environment string.

```
npm run test -- --testEnv dev
node testRunner.js --testEnv qa
```

IMPORTANT: for convenience, the environment string is also used to load some test data. In this example, the API's host and port. If you decide to change the values, make sure to update the test data file 'data/backendHosts.js'.

# Project Structure

At the project's root level, we have the main 'testRunner.js' file, the NPM package files and '.gitignore'. The test cases themselves are located under 'tests/'. Configuration files, as aforementioned, are stored under 'configs/'. 'code/' is used as an umbrella for ad-hoc utility code. The folder 'data/' is where test data is kept. 'pages/' and 'services/' are folders used to hold object representations of both web pages the code tests and services it consumes.

The tests will output to the stdout and a JSON report will be created in the 'reports/' folder. In case an error is detected, a screenshot and a video will also be recorded and stored in 'reports/screenshots/' and 'reports/videos/'.