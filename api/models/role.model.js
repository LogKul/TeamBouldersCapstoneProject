const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
        }
    });

    return Role;
};