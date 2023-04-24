const config = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        port: config.PORT,
        dialect: config.dialect,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        },
        define: {
            timestamps: false
        },
        logging: false,
        timezone: 'America/Denver'

        /*pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }*/
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.game = require("../models/game.model.js")(sequelize, Sequelize);
db.chat = require("../models/chat.model.js")(sequelize, Sequelize);
db.report = require("../models/report.model.js")(sequelize, Sequelize);
db.ROLES = ["user", "moderator", "admin"];

/* Associations */
(db.role).belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: {
        name: "role_id",
        type: DataTypes.INTEGER
    },
    otherKey: {
        name: "user_id",
        type: DataTypes.UUID
    }
});
(db.user).belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: {
        name: "user_id",
        type: DataTypes.UUID
    },
    otherKey: {
        name: "role_id",
        type: DataTypes.INTEGER
    }
});


(db.game).belongsTo(db.user, { foreignKey: { name: 'player1', type: DataTypes.UUID }, as: 'player_1' });
(db.game).belongsTo(db.user, { foreignKey: { name: 'player2', type: DataTypes.UUID }, as: 'player_2' });
(db.user).hasMany(db.game, { foreignKey: { name: 'id', type: DataTypes.UUID } });


module.exports = db;