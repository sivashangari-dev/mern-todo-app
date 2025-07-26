const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const todo = mongoose.model("todo", todoSchema);

module.exports = todo;

//define schema of the todo document
//setup validations and defaults
//exports the mongoose model to be used in the app

// This model acts as the interface to interact with the collection (create, read, update, delete).