const { Selector } = require('testcafe');
const homePage = require('../pages/home.js');
const backendApi = require('../services/backend.js');

fixture('Feature: Device Removal')
    .page('./');

test('Remove Device', async t => {
    await homePage.filterDeviceByOS(t, 'ALL');
    await homePage.devicesPresent(t);

    const deviceEntries = Selector(homePage.deviceEntry);
    const lastDevice = deviceEntries.nth(await deviceEntries.count - 1);
    const lastDeviceInfo = await homePage.getDeviceInfo(t, lastDevice);
    await homePage.verifyDeviceListingComplete(t, lastDeviceInfo);

    await backendApi.removeDevice(process.env.testEnv, lastDeviceInfo.id);
    await t.eval(() => location.reload());
    await t.expect(Selector(homePage.deviceEntryEditButton(lastDeviceInfo.id)).exists).notOk();
});