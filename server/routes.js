const express = require("express");

const router = express.Router();

const Todo = require("./models/todo");

//GET /todos
router.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.status(200).json(todos);
});

//POST /todos
router.post("/todos", async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return res.status(400).json({ msg: "Todo is required" });
  }

  const newTodo = new Todo({ todo });
  await newTodo.save();

  res.status(201).json(newTodo);
});

//PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ msg: "Todo not found" });
  }

  const { status } = req.body;

  if (typeof status !== "boolean") {
    return res.status(400).json({ msg: "invalid status" });
  }

  if (todo.status !== status) {
    todo.status = status;
  }
  await todo.save();

  res.status(200).json(todo);
});

//DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(200).json({ msg: "Todo deleted successfully" });
});

module.exports = router;
