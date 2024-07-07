const homePage = require('../pages/home.js');
const deviceAddPage = require('../pages/deviceAdd.js');

const { newDevice } = require('../data/device.js');

fixture('Feature: Device Insertion')
    .page('./');

test('Insert Device', async t => {
    const testDevice = newDevice();

    await homePage.accessAddDeviceScreen(t);
    await deviceAddPage.check(t);
    await deviceAddPage.addDevice(t, testDevice);
    await homePage.check(t);
    await homePage.verifyDeviceListingShort(t, 
        { 
            system_name: testDevice.system_name, 
            type: testDevice.type === "WINDOWS_WORKSTATION" ? testDevice.type.replace("_", " ") : testDevice.type, 
            hdd_capacity: testDevice.hdd_capacity 
        }
    )
});