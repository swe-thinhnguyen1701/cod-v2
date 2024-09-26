const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/call-of-dragons");

module.exports = mongoose.connection;