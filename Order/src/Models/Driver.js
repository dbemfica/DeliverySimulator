const Sequelize = require('sequelize');
const config = require('../../database/config');
const sequelize = new Sequelize(config);
const Model = Sequelize.Model;

class Driver extends Model {}
Driver.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'drivers'
});

module.exports = Driver;
