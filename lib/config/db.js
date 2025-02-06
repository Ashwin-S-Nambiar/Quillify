const mongoose = require('mongoose');

const databaseUrl = process.env.DATABASE_URL;

// Database connection function for MongoDB
const ConnectDB = async () => {
    await mongoose.connect(databaseUrl);
    console.log("DB Connected");
};

module.exports = { ConnectDB };