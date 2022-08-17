'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      displayName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};