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
(db.game).hasOne(db.user, { foreignKey: "player1" });
(db.game).hasOne(db.user, { foreignKey: "player2" });
//(db.users).hasMany(db.game, { as: "player1", foreignKey: "player1" });
//(db.users).hasMany(db.game, { as: "player2", foreignKey: "player2" });
(db.user).belongsTo(db.game);

(db.report).hasOne(db.user, { foreignKey: "reported_user" });
(db.user).belongsTo(db.report);

(db.chat).hasOne(db.game, { foreignKey: "game_id" });
(db.chat).hasOne(db.user, { foreignKey: "player" });
(db.user).belongsTo(db.chat);
(db.game).belongsTo(db.chat);

// as: "player1",
// as: "player2",

// as: "reported_user",

// as: "game_id",
// as: "player", 


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