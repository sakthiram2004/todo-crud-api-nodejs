const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateTodoBody, validateIdParam } = require('../middleware/validateTodo');

router.post('/', validateTodoBody, todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', validateIdParam, todoController.getTodoById);
router.put('/:id', [validateIdParam], todoController.updateTodo);
router.patch('/:id/status', validateIdParam, todoController.updateCompletedStatus);
router.delete('/:id', validateIdParam, todoController.deleteTodo);

module.exports = router;
