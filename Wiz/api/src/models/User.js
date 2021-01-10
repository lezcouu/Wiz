const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    
    const User = sequelize.define('user', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allownull: false,
            defaultValue: DataTypes.NOW
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    });
};