const db = require('../config/db');

// Obtener editoriales
exports.getPublisher = (req, res) => {
  const query = 'SELECT * FROM PUBLISHER';
  db.exec(query, (err, result) => {
    if (err) return res.status(500).send(err.toString());
    res.json(result);
  });
};

// Agregar editorial
exports.addPublisher = (req, res) => {
  const {
    name,
    booksid
  } = req.body;

  const query = `
    INSERT INTO PUBLISHER 
    (name, booksid)
    VALUES (?, ?)`;

  const stmt = db.prepare(query);

  stmt.exec([name, booksid], (err) => {
    if (err) {
      console.error('Error al agregar editorial:', err);
      return res.status(500).send(err.toString());
    }
    res.status(201).send('Editorial agregada correctamente');
    stmt.drop();
  });
};


// Eliminar editorial
exports.deletePublisher = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM PUBLISHER WHERE ID = ?';
  const stmt = db.prepare(query);

  stmt.exec([id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.status(204).end();
    stmt.drop();
  });
};


// Actualizar libro
exports.updatePublisher = (req, res) => {
  const id = req.params.id;
  const {
    name,
    booksid
  } = req.body;

  const query = `
    UPDATE PUBLISHER
    SET name = ?, booksid = ?
    WHERE id = ?`;

  const stmt = db.prepare(query);

  stmt.exec([name, booksid, id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.send('Editorial actualizada');
    stmt.drop();
  });
};

