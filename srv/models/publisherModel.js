const db = require('../config/db');

const Publisher = {
  getAll: (callback) => {
    const query = `
      SELECT 
          p.id AS publisher_id,
          p.name AS publisher_name,
          b.title AS book_title
      FROM publisher p
      JOIN books b ON p.booksid = b.id;

    `;
    db.exec(query, (err, result) => callback(err, result));
  },

  create: (data, callback) => {
    const query = `
      INSERT INTO publisher (id, name, booksid)
      VALUES (?, ?, ?)
    `;
    const values = [data.id, data.name, data.booksid];
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec(values, (err2, result) => callback(err2, result));
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM publisher WHERE id = ?`;
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec([id], (err2, result) => callback(err2, result));
    });
  }
};

module.exports = Publisher;
