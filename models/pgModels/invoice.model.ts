import { Model,DataTypes} from 'sequelize';
const { sequelize } = require('../../config/DBConfig');
import Item from '../../models/pgModels/item.model';


class Invoice extends Model {

}
Invoice.init(
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Placed',
      validate: {
        isIn: [['Placed', 'Delivered', 'Cancelled']],
      },
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull:false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },

  },
  {
    sequelize,
    modelName: 'Invoice',
    tableName: 'invoice',
  }
);
Invoice.hasMany(Item,{foreignKey:'invoice_id'});
Item.belongsTo(Invoice,{foreignKey:'invoice_id'})
module.exports = Invoice;
export default Invoice; 
