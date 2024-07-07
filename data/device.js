const { faker } = require('@faker-js/faker');
const deviceTypeArray = ['WINDOWS_WORKSTATION', 'WINDOWS_SERVER', 'MAC'];

module.exports = {
    newDevice: function() {
        return {
            system_name: faker.lorem.word(),
            type: deviceTypeArray[faker.number.int({ min: 0, max: deviceTypeArray.length - 1})],
            hdd_capacity: `${faker.number.int(4096)}`
        };
    }
}