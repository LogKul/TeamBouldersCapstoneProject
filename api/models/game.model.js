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
            allowNull: true
        },
        player2: {
            type: Sequelize.UUID,
            allowNull: true
        },
        gamestate: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        recording: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get: function () {
                return this.getDataValue('time')
                    .toLocaleString('en-US', { timeZone: 'UTC' });
            }
        },
        winner: {
            type: Sequelize.UUID,
        }
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: 'finishedTime'
    });

    return Game;
};