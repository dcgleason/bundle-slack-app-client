
const mongoose = require('mongoose')
const Schema = mongoose.Schema
/**
 * each user can initiate a Letter <-- user can be placed inside of the gift schema
 */
const userSchema = new Schema({
    name: String,
    letterID: [String],
  },
  { timestamps: true }
  );

const User = mongoose.model('Users', userSchema);

module.exports = User