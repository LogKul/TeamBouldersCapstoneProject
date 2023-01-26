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
        }

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
db.game = require("../models/game.model.js")(sequelize, Sequelize);
db.chat = require("../models/chat.model.js")(sequelize, Sequelize);
db.report = require("../models/report.model.js")(sequelize, Sequelize);

/* Associations */
(db.game).hasOne(db.user, { as: "player1", foreignKey: "player1" });
(db.game).hasOne(db.user, { as: "player2", foreignKey: "player2" });
//(db.users).hasMany(db.game, { as: "player1", foreignKey: "player1" });
//(db.users).hasMany(db.game, { as: "player2", foreignKey: "player2" });
(db.users).belongsTo(db.game);

(db.report).hasOne(db.user, { as: "reported_user", foreignKey: "reported_user" });
(db.user).belongsTo(db.report);

(db.chat).hasOne(db.game, { as: "game_id", foreignKey: "game_id" });
(db.chat).hasOne(db.user, { as: "player", foreignKey: "player" });
(db.user).belongsTo(db.chat);
(db.game).belongsTo(db.chat);



/*
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});*/

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;