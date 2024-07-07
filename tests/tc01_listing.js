const homePage = require('../pages/home.js');
const backendApi = require('../services/backend.js');

fixture('Feature: Device Listing')
    .page('./');

test('Verify Device Listings', async t => {
    const devices = await backendApi.getDevices(process.env.testEnv);
    
    await homePage.filterDeviceByOS(t, 'ALL');
    await homePage.countDevices(t, devices.length);

    for (const device of devices) {
        await homePage.verifyDeviceListingComplete(t, device);
    }
});