import todolistModel from "../models/todolistModel.js";

export const createTodo = async (req, res) => {
  try {
    const { todo_image, todo_name, todo_desc, todo_status } = req.body;

    if (!todo_image || !todo_name || !todo_desc || !todo_status) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    const newTodo = await todolistModel.create({
      todo_image,
      todo_name,
      todo_desc,
      todo_status,
    });

    res.status(200).json({ message: "Create a todo list", newTodo });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const allTodo = await todolistModel.find();
    res.status(200).json(allTodo);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getSingleTodo = async (req, res) => {
  try {
    const todo = await todolistModel.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { todo_image, todo_name, todo_desc, todo_status } = req.body;

    const updatedData = {
      todo_image,
      todo_name,
      todo_desc,
      todo_status,
    };

    const updatedTodo = await todolistModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = res.params;
    const deletedTodo = await todolistModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
