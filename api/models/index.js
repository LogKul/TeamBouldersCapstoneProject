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
        type: DataTypes.UUID
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
        type: DataTypes.UUID
    }
});

(db.user).hasMany(db.game, { foreignKey: { name: 'player1', type: DataTypes.UUID } });
(db.user).hasMany(db.game, { foreignKey: { name: 'player2', type: DataTypes.UUID } });
(db.game).belongsTo(db.user, { foreignKey: { name: 'id', type: DataTypes.UUID } });

(db.user).hasMany(db.report, { foreignKey: { name: 'reported_user', type: DataTypes.UUID } });
(db.report).belongsTo(db.user, { foreignKey: { name: 'id', type: DataTypes.UUID } });

(db.game).hasOne(db.chat, { foreignKey: { name: 'game_id', type: DataTypes.UUID } });
(db.user).hasMany(db.chat, { foreignKey: { name: 'player', type: DataTypes.UUID } });
(db.chat).belongsTo(db.user, { foreignKey: { name: 'id', type: DataTypes.UUID } });
(db.chat).belongsTo(db.game, { foreignKey: { name: 'id', type: DataTypes.UUID } });

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