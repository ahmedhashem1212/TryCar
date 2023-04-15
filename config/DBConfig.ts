const Sequelize = require('sequelize');


// Connecting to remote postgres
const sequelize = new Sequelize('test',
'root',
'root123',
 {
   host: 'localhost',
   dialect: 'mysql'
 });

module.exports = {sequelize};
