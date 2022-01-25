const Sequelize = require("sequelize");
const sequelizeConnection = require("../sequelize");

class Label extends Sequelize.Model {}

Label.init(
    {
        title: Sequelize.STRING,
        color: Sequelize.STRING,
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'label',
    }
);

module.exports = Label; 