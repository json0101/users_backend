const Sequelize = require('sequelize');

const sequelize = new Sequelize('users', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    timezone: '-06:00'
  });
  
  module.exports = sequelize;