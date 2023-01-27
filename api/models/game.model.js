const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("games", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        player1: {
            type: Sequelize.UUID,
            allowNull: false
        },
        player2: {
            type: Sequelize.UUID,
            allowNull: false
        },
        gamestate: {
            type: Sequelize.STRING,
        },
        recording: {
            type: Sequelize.STRING,
        },
        time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        winner: {
            type: Sequelize.UUID,
        }
    });

    return Game;
};