const { Selector } = require('testcafe');
const { faker } = require('@faker-js/faker');

const deviceTypeArray = ['WINDOWS_WORKSTATION', 'WINDOWS_SERVER', 'MAC'];

const newDevice = {
    system_name: faker.lorem.word(),
    type: deviceTypeArray[faker.number.int({ min: 0, max: deviceTypeArray.length - 1})],
    hdd_capacity: `${faker.number.int(4096)}`
};

fixture('Functionality: Device Insertion')
    .page('http://localhost:3001');

test('Insert Device', async t => {
    await t
        .click(Selector('.submitButton[href="/devices/add"]'))
        .expect(Selector('.device-form').visible).ok()
        .typeText(Selector('#system_name'), newDevice.system_name)
        .click(Selector('select#type'))
        .click(Selector(`option[value="${newDevice.type}"]`))
        .typeText(Selector('#hdd_capacity'), newDevice.hdd_capacity)
        .click(Selector('.submitButton'))
        .expect(Selector('.device-main-box').exists).ok()
        .expect(Selector('.device-name').withText(newDevice.system_name).visible).ok()
        .expect(Selector('.device-type').withText(newDevice.type === "WINDOWS_WORKSTATION" ? newDevice.type.replace("_", " ") : newDevice.type).visible).ok()
        .expect(Selector('.device-capacity').withText(newDevice.hdd_capacity).visible).ok();
});