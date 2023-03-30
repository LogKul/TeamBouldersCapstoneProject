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
            type: Sequelize.INTEGER,
            defaultValue: 1000
        },
        deleted: {
            type: Sequelize.BOOLEAN
        },
        lightswitch: {
            type: Sequelize.BOOLEAN
        },
        theme: {
            type: Sequelize.INTEGER
        },
        banned: {
            type: Sequelize.BOOLEAN
        },
        hideschat: {
            type: Sequelize.BOOLEAN
        },
        priority: {
            type: Sequelize.BOOLEAN
        }
    });

    return User;
};