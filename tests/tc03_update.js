const { Selector } = require('testcafe');
const homePage = require('../pages/home.js');
const backendApi = require('../services/backend.js');

fixture('Feature: Device Update')
    .page('./');

test('Refresh Device Data', async t => {
    await homePage.filterDeviceByOS(t, 'ALL');
    await homePage.devicesPresent(t);

    const firstDevice = Selector(homePage.deviceEntry).nth(0);
    const firstDeviceInfo = await homePage.getDeviceInfo(t,firstDevice);
    await backendApi.updateDevice(process.env.testEnv, firstDeviceInfo.id, { system_name: 'Renamed Device', type: firstDeviceInfo.type, hdd_capacity: firstDeviceInfo.hdd_capacity.replace(/\D/g,"") });

    await t.eval(() => location.reload());
    
    await homePage.verifyDeviceListingShort(t, { system_name: 'Renamed Device', type: firstDeviceInfo.type, hdd_capacity: firstDeviceInfo.hdd_capacity });
});