'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`INSERT INTO constant(label, value) VALUE ('is_detect_moving', false)`);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  }
};
