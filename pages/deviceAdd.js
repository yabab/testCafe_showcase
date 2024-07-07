const { Selector } = require('testcafe');

module.exports = {
    addDeviceForm: '.device-form',
    systemNameField: '#system_name',
    systemTypeSelector: 'select#type',
    systemTypeSelectorOption: function(type) { return `option[value="${type}"]` },
    systemHddCapacityField: '#hdd_capacity',
    deviceSubmissionButton: '.submitButton',
    check: async function(t) {
        return await t
            .expect(Selector(this.addDeviceForm).visible).ok();
    },
    addDevice: async function(t, device) {
        return await t
            .typeText(Selector(this.systemNameField), device.system_name)
            .click(Selector(this.systemTypeSelector))
            .click(Selector(this.systemTypeSelectorOption(device.type)))
            .typeText(Selector(this.systemHddCapacityField), device.hdd_capacity)
            .click(Selector(this.deviceSubmissionButton));
    }
}