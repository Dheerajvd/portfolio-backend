const mongoose = require("mongoose");
const configurationVariables = require("./env.config");

const connectDb = async () => {
  try {
    let connectionString = configurationVariables.DB_CONNECTION_STRING;
    const connect = await mongoose.connect(connectionString);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const checkConnection = () => {
  const isConnected = mongoose.connection.readyState === 1;
  return isConnected;
};

const closeConnection = async () => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    if(isConnected) await mongoose.connection.close();
  } catch (error) {
    console.error('Error closing connection:', error.message);
  }
};

module.exports = { connectDb, checkConnection, closeConnection };
