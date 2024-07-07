const { Selector } = require('testcafe');

module.exports = {
    deviceFilterBySystem: 'select#device_type',
    deviceFilterBySystemOption: function(os) { return `option[value="${os}"]` },
    deviceEntry: '.list-devices .device-main-box',
    deviceEntryName: '.device-name',
    deviceEntryType: '.device-type',
    deviceEntryHddCapacity: '.device-capacity',
    deviceEntryEditButton: function(id) { return `.device-edit[href="/devices/edit/${id}"]` },
    deviceEntryRemoveButton: function(id) { return `${this.deviceEntryEditButton(id)} + .device-remove` },
    addDeviceButton: '.submitButton[href="/devices/add"]',
    check: async function(t) {
        return await t
            .expect(Selector(this.deviceFilterBySystem).visible).ok();
    },
    devicesPresent: async function(t) {
        return await t
            .expect(Selector(this.deviceEntry).count).gt(0);
    },
    countDevices: async function(t, deviceCount) {
        return await t
            .expect(Selector(this.deviceEntry).count).eql(deviceCount);
    },
    getDeviceInfo: async function(t, device) {
        const deviceEditHref = await device.find('.device-edit').getAttribute('href');
        const deviceName = await device.find('.device-name').innerText;
        const deviceType = await device.find('.device-type').innerText;
        const deviceHddCapacity = await device.find('.device-capacity').innerText;

        return {
            id: deviceEditHref.split('/').pop(),
            system_name: deviceName,
            type: deviceType,
            hdd_capacity: deviceHddCapacity
        }
    },
    verifyDeviceListingShort: async function(t, device) {
        return await t
            .expect(Selector(this.deviceEntryName).withText(device.system_name).visible).ok()
            .expect(Selector(this.deviceEntryType).withText(device.type).visible).ok()
            .expect(Selector(this.deviceEntryHddCapacity).withText(device.hdd_capacity).visible).ok();
    },
    verifyDeviceListingComplete: async function(t, device) {
        await this.verifyDeviceListingShort(t, device);
        return await t
            .expect(Selector(this.deviceEntryEditButton(device.id)).visible).ok()
            .expect(Selector(this.deviceEntryRemoveButton(device.id)).visible).ok();
    },
    filterDeviceByOS: async function(t, os) {
        return await t
            .click(Selector(this.deviceFilterBySystem))
            .click(Selector(this.deviceFilterBySystemOption(os)));
    },
    accessAddDeviceScreen: async function(t) {
        return await t.click(Selector(this.addDeviceButton));
    }
}