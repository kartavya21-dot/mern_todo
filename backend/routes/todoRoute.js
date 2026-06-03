import express from "express";
import { createTodo, deleteTodo, getAllTodo, getSingleTodo, updateTodo } from "../controllers/todolist.js";

const router = express.Router();

router.post("/add_todo", createTodo);
router.get("/get_all", getAllTodo);
router.get("/get_single/:id", getSingleTodo);
router.put("/update_todo/:id", updateTodo);
router.delete("/delete_todo/:id", deleteTodo);

export default router;
