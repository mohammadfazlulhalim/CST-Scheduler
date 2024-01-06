const Timeslot = require('../../private/javascript/Timeslot');
const {sequelize} = require('../../dataSource');
const constants = require('../../constants');
describe('starttime', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error creating Timeslot table: ', error);
    }
  });
  beforeEach( async () => {
    // Add in anything needed here
  })
})

describe('endtime', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error creating Timeslot table: ', error);
    }
  });
  beforeEach( async () => {
    // Add in anything needed here
  })
});

describe('day', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error creating Timeslot table: ', error);
    }
  });
  beforeEach( async () => {
    // Add in anything needed here
  })
});

describe('room', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error creating Timeslot table: ', error);
    }
  });
  beforeEach( async () => {
    // Add in anything needed here
  })
});

describe('term', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error creating Timeslot table: ', error);
    }
  });
  beforeEach( async () => {
    // Add in anything needed here
  })
});

describe('group', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error('Error creating Timeslot table: ', error);
    }
  });
  beforeEach( async () => {
    // Add in anything needed here
  })
});
