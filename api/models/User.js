const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({}, { timestamps: true, strict: false });

module.exports = mongoose.model("User", userSchema);
