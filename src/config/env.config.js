require("dotenv").config();

const configurationVariables = {
    PORT: process.env.PORT,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    API_KEY: process.env.API_KEY,
    API_PASSWORD_READ: process.env.API_PASSWORD_READ,
    API_PASSWORD_WRITE: process.env.API_PASSWORD_WRITE
}

module.exports = configurationVariables;