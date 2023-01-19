require('dotenv').config();

/**
 * Connect to PostgreSQL Database
 */

module.exports = {
    USER: process.env.PG_USER,
    HOST: process.env.PG_HOST,
    DB: process.env.PG_DB,
    PASSWORD: process.env.PG_PASSWORD,
    PORT: process.env.PG_PORT,
    SSL: {
        rejectUnauthorized: false,
    },
    dialect: "postgres"
};