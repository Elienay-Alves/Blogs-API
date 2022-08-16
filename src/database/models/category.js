const { DataTypes } = require('sequelize');
const atributtes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
};

module.exports = (sequelize) => {

  const model = sequelize.define('Category', atributtes, {
    tableName: 'Categories',
    timestamps: false
  });
  return model;
};