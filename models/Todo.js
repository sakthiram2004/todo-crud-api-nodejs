const { pool } = require('../config/db');

class Todo {
  static async create(title, description) {
    const query = `
      INSERT INTO todos (title, description)
      VALUES (?, ?)
    `;
    const [result] = await pool.execute(query, [title, description || null]);
    const [rows] = await pool.execute('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    return rows[0];
  }

  static async findAll() {
    const query = `SELECT * FROM todos ORDER BY created_at DESC;`;
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async findById(id) {
    const query = `SELECT * FROM todos WHERE id = ?;`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  }

  static async findByTitle(title) {
    const query = `SELECT * FROM todos WHERE title = ?;`;
    const [rows] = await pool.execute(query, [title]);
    return rows[0];
  }

  static async update(id, title, description, completed) {
    const query = `
      UPDATE todos 
      SET 
        title = ?, 
        description = ?, 
        completed = ?
      WHERE id = ?
    `;
    await pool.execute(query, [title, description, completed, id]);
    const [rows] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateCompletedStatus(id, completed) {
    const query = `
      UPDATE todos 
      SET completed = ?
      WHERE id = ?
    `;
    await pool.execute(query, [completed, id]);
    const [rows] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    return rows[0];
  }

  static async delete(id) {
    const [rows] = await pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
    const todo = rows[0];

    if (todo) {
      const query = `DELETE FROM todos WHERE id = ?;`;
      await pool.execute(query, [id]);
    }

    return todo;
  }
}

module.exports = Todo;
