const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        wins: {
            type: Sequelize.INTEGER
        },
        losses: {
            type: Sequelize.INTEGER
        },
        mmr: {
            type: Sequelize.INTEGER
        },
        deleted: {
            type: Sequelize.BOOLEAN
        },
        admin: {
            type: Sequelize.BOOLEAN
        }
    });

    return User;
};