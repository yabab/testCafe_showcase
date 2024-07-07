const { makeRequest } = require('../code/request.js');
const backendApiHosts = require('../data/backendHosts.js');

module.exports = {
    getDevices: async function(testEnv) {
        const response = await makeRequest('GET', `${backendApiHosts[testEnv].host}:${backendApiHosts[testEnv].port}/devices`);

        const devices = JSON.parse(response);
        
        if (!Array.isArray(devices)) {
            throw new Error('The response from /devices does not match the expected format.');
        } else if (devices.length === 0) {
            throw new Error('No devices were found.');
        }

        return devices;
    },
    updateDevice: async function(testEnv, deviceId, deviceData) {
        return await makeRequest('PUT', `${backendApiHosts[testEnv].host}:${backendApiHosts[testEnv].port}/devices/${deviceId}`, {"Content-Type": "application/json"}, deviceData);
    }
}