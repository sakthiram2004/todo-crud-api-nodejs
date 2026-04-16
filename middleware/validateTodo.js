const validateTodoBody = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
  }
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Description is required and must be a non-empty string.' });
  }

  next();
};

const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format. ID must be an integer.' });
  }

  next();
};

module.exports = {
  validateTodoBody,
  validateIdParam
};
