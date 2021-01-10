const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    const Sess = sequelize.define('sess', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allownull: false,
            defaultValue: DataTypes.NOW
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        session: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        }
    });
};