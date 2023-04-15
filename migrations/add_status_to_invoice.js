'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('invoice', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Placed',
      validate: {
        isIn: [['Placed', 'Delivered', 'Cancelled']],
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Invoice', 'status');
  }
};
