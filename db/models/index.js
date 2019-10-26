import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  country: String,
  age: Number
});

export const usersModel = mongoose.model('Users', userSchema)