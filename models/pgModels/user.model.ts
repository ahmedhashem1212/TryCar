import { Model,DataTypes} from 'sequelize';
const { sequelize } = require('../../config/DBConfig');
import Invoice from '../../models/pgModels/invoice.model';

class User extends Model {

}
User.init(
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  }
);

User.hasOne(Invoice,{foreignKey:'user_id'});
Invoice.belongsTo(User,{foreignKey:'user_id'})
module.exports = User;
