const { Selector } = require('testcafe');
const { makeRequest } = require('../code/request.js');

fixture('Feature: Device Removal')
    .page('./');

test('Remove Device', async t => {
    const deviceEntries = Selector('.device-main-box');

    await t
        .click(Selector('select#device_type'))
        .click(Selector('option[value="ALL"]'))
        .expect(deviceEntries.exists).ok();

    const lastDevice = Selector('.device-main-box').nth(await deviceEntries.count - 1);
    const extractedLastEditHref = await lastDevice.find('.device-edit').getAttribute('href');
    const extractedLastDeviceName = await lastDevice.find('.device-name').innerText;

    await t
        .expect(Selector('.device-name').withText(extractedLastDeviceName).exists).ok();

    await makeRequest('DELETE', `http://localhost:3000/devices/${extractedLastEditHref.split('/').pop()}`);

    await t
        .eval(() => location.reload());

    await t
        .expect(Selector('.device-name').withText(extractedLastDeviceName).exists).notOk();
});