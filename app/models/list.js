const { Model, DataTypes } = require('sequelize');
const sequelizeInstance = require('../database');

class List extends Model {};

List.init({
    title: DataTypes.TEXT,
    position: DataTypes.SMALLINT,
}, {
    sequelize: sequelizeInstance,
    tableName: 'list',
});

module.exports = List;