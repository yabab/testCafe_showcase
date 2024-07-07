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
        const deviceEntryWithName = Selector(this.deviceEntryName).withText(device.system_name);
        const deviceEntryMainBox = deviceEntryWithName.parent('.device-main-box');
        
        await t
            .expect(deviceEntryWithName.visible).ok()
            .expect(deviceEntryMainBox.find(this.deviceEntryType).withText(device.type).visible).ok()
            .expect(deviceEntryMainBox.find(this.deviceEntryHddCapacity).withText(device.hdd_capacity).visible).ok();

        return deviceEntryMainBox;
    },
    verifyDeviceListingComplete: async function(t, device) {
        const deviceEntry = await this.verifyDeviceListingShort(t, device);
        await t
            .expect(deviceEntry.find(this.deviceEntryEditButton(device.id)).visible).ok()
            .expect(deviceEntry.find(this.deviceEntryRemoveButton(device.id)).visible).ok();

        return deviceEntry;
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