const { Selector } = require('testcafe');
const { makeRequest } = require('../code/request.js');

fixture('Feature: Device Update')
    .page('http://localhost:3001/');

test('Refresh Device Data', async t => {
    await t
        .click(Selector('select#device_type'))
        .click(Selector('option[value="ALL"]'))
        .expect(Selector('.device-main-box').exists).ok()

    const firstDevice = Selector('.device-main-box').nth(0);

    const extractedFirstEditHref = await firstDevice.find('.device-edit').getAttribute('href');
    const extractedFirstDeviceType = await firstDevice.find('.device-type').innerText;
    const extractedFirstDeviceHddCapacity = await firstDevice.find('.device-capacity').innerText;

    await makeRequest('PUT', `http://localhost:3000/devices/${extractedFirstEditHref.split('/').pop()}`, {"Content-Type": "application/json"}, { system_name: 'Renamed Device', type: extractedFirstDeviceType, hdd_capacity: extractedFirstDeviceHddCapacity.replace(/\D/g,"") });

    await t
        .eval(() => location.reload());
    
    await t
        .expect(firstDevice.find('.device-name').withText('Renamed Device').visible).ok();
});