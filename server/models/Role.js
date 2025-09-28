// const {Schema, model} = require('mongoose');
import {model, Schema} from "mongoose";

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rank: {
    type: Number,
    required: true,
  }
});

const Role = model('Role', roleSchema);

// module.exports = Role;
export default Role;