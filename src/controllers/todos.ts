import { RequestHandler } from "express";
import { Todo } from "../models/todo.model";

const TODOS: Todo[] = [];

// Post Todos
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;

  const newTodo = { id: Math.random().toString(), text };
  TODOS.push(newTodo);

  res.status(201).json({ message: "Created to do!", createTodo: newTodo });
};

// Get Todos

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

// Update Todo
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updateText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    res.status(404).json({ message: "Todo not found" });
  }

  TODOS[todoIndex] = { id: TODOS[todoIndex].id, text: updateText };
  res
    .status(200)
    .json({ message: "Todo updated!", updateTodo: TODOS[todoIndex] });
};

// Delete Todo

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    res.status(404).json({ message: "Todo not found" });
  }

  TODOS.splice(todoIndex, 1);
  res.status(200).json({ message: "Todo deleted successfully!" });
};
