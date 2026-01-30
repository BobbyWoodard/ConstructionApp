import mongoose from "mongoose";
import User from "../models/Users.js";

// Basic functions for user services
function getUserByUsername(username) {
  return User.findOne({ username: username });
}

function getUserByEmail(email) {
  return User.findOne({ email: email });
}

function createUser(userData) {
  const newUser = new User(userData);
  return newUser.save();
}

function updateUser(userId, updateData) {
  return User.findByIdAndUpdate(userId, updateData, { new: true });
}

// Specific functions for api routes

// Register a new user with only username, email, and password
export async function registerUser(username, email, password) {
  const userData = { username, email, password };
  const existingUser = await getUserByUsername(userData.username);
  if (existingUser) {
    throw new Error("Username already exists");
  }
  else {
    return createUser(userData);
  }
}


/*

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUserById
};

*/