import { Model,DataTypes} from 'sequelize';
const { sequelize } = require('../../config/DBConfig');

class Item extends Model {

}
Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    describtion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalUnitPrice: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // invoice_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: 'Item',
    tableName: 'item',
  }
);

module.exports = Item;
export default Item; 

