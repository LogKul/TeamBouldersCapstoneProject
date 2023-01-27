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
(db.user).hasMany(db.game, { foreignKey: "player1" });
(db.user).hasMany(db.game, { foreignKey: "player2" });
//(db.users).hasMany(db.game, { as: "player1", foreignKey: "player1" });
//(db.users).hasMany(db.game, { as: "player2", foreignKey: "player2" });
(db.game).belongsTo(db.user);

(db.user).hasMany(db.report, { foreignKey: "reported_user" });
(db.report).belongsTo(db.user);

(db.game).hasOne(db.chat, { foreignKey: "game_id" });
(db.user).hasMany(db.chat, { foreignKey: "player" });
(db.chat).belongsTo(db.user);
(db.chat).belongsTo(db.game);

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