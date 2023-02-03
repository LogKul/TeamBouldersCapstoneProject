const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chats", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        game_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        chat_text: {
            type: Sequelize.STRING,
        },
        time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        player: {
            type: Sequelize.UUID,
        }
    });

    return Chat;
};