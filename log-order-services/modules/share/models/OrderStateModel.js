const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../databases/Database');

const OrderStateModel = db.define(
    'orderstate',
    {    
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
        },
        remark: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = OrderStateModel;
