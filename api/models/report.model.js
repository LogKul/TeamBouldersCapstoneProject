const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define("reports", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        reported_user: {
            type: Sequelize.UUID,
            allowNull: false
        },
        report_notes: {
            type: Sequelize.STRING,
        },
        report_reason: {
            type: DataTypes.ENUM('Hateful Speech', 'Cheating', 'Bad Behavior')
        }
    });

    return Report;
};