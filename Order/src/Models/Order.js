const Sequelize = require('sequelize');
const config = require('../../database/config');
const sequelize = new Sequelize(config);
const Model = Sequelize.Model;
const Driver = require('./Driver');

class Order extends Model {}
Order.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  id_driver: Sequelize.UUIDV4,
  destination: Sequelize.STRING,
  status: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'orders'
});

Order.hasOne(Driver, { as: "driver", foreignKey: 'id', sourceKey: 'id_driver' });

module.exports = Order;
