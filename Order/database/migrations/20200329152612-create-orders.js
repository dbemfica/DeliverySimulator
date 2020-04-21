'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      id_driver: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'drivers', key: 'id' }
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("orders");
  }
};
