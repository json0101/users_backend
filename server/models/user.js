const Sequelize = require('sequelize');
const sequelize = require('../sequelize/sequelize');

const Model = Sequelize.Model;

class Usuario extends Model {}
Usuario.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.TEXT
}, { sequelize, modelName: 'users', timestamps: false });

module.exports = Usuario;