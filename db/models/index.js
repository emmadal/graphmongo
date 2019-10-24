import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = Schema({
  name: String,
  country: String,
  age: Number
});

export const Users = mongoose.model('Users', userSchema)


