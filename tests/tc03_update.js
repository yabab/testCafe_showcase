const { Selector } = require('testcafe');
const backendApi = require('../services/backend.js');

fixture('Feature: Device Update')
    .page('./');

test('Refresh Device Data', async t => {
    await t
        .click(Selector('select#device_type'))
        .click(Selector('option[value="ALL"]'))
        .expect(Selector('.device-main-box').exists).ok()

    const firstDevice = Selector('.device-main-box').nth(0);

    const extractedFirstEditHref = await firstDevice.find('.device-edit').getAttribute('href');
    const extractedFirstDeviceType = await firstDevice.find('.device-type').innerText;
    const extractedFirstDeviceHddCapacity = await firstDevice.find('.device-capacity').innerText;

    await backendApi.updateDevice(process.env.testEnv, extractedFirstEditHref.split('/').pop(), { system_name: 'Renamed Device', type: extractedFirstDeviceType, hdd_capacity: extractedFirstDeviceHddCapacity.replace(/\D/g,"") });
    
    await t.eval(() => location.reload());
    
    await t
        .expect(firstDevice.find('.device-name').withText('Renamed Device').visible).ok();
});