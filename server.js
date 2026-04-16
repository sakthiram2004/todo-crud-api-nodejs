
const express = require('express');
require('dotenv').config();

const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/todos', todoRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
