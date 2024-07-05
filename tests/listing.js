const { Selector } = require('testcafe');
const { makeRequest } = require('../code/request.js');

fixture('Functionality: Device Listing')
    .page('http://localhost:3001/');

test('Verify Device Listings', async t => {
    const response = await makeRequest('GET', 'http://localhost:3000/devices');

    const devices = JSON.parse(response);

    if (!Array.isArray(devices)) {
        throw new Error('The response from /devices does not match the expected format.');
    } else if (devices.length === 0) {
        throw new Error('No devices were found.');
    }

    await t
        .click(Selector('select#device_type'))
        .click(Selector('option[value="ALL"]'))
        .expect(Selector('.list-devices .device-main-box').count).eql(devices.length);

    for (const device of devices) {
        await t
            .expect(Selector('.device-name').withText(device.system_name).visible).ok()
            .expect(Selector('.device-type').withText(device.type).visible).ok()
            .expect(Selector('.device-capacity').withText(device.hdd_capacity).visible).ok()
            .expect(Selector(`.device-edit[href="/devices/edit/${device.id}"]`).visible).ok()
            .expect(Selector(`.device-edit[href="/devices/edit/${device.id}"] + .device-remove`).visible).ok();
    }
});