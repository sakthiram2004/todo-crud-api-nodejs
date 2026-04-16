const Todo = require('../models/Todo');

const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;


    const existingTodo = await Todo.findByTitle(title);
    if (existingTodo) {
      return res.status(409).json({ error: 'A Todo with this title already exists.' });
    }

    const newTodo = await Todo.create(title, description);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { title, description, completed } = req.body;


    const existingTodo = await Todo.findById(id);
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }


    if (title && title !== existingTodo.title) {
      const titleConflict = await Todo.findByTitle(title);
      if (titleConflict && titleConflict.id !== Number(id)) {
        return res.status(409).json({ error: 'A Todo with this title already exists.' });
      }
    }

    title = title || existingTodo.title;
    description = description !== undefined ? description : existingTodo.description;
    completed = completed !== undefined ? completed : existingTodo.completed;

    const updatedTodo = await Todo.update(id, title, description, completed);
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

const updateCompletedStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'The "completed" field must be a boolean (true/false).' });
    }

    const existingTodo = await Todo.findById(id);
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedTodo = await Todo.updateCompletedStatus(id, completed);
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.delete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully', todo: deletedTodo });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  updateCompletedStatus,
  deleteTodo
};
