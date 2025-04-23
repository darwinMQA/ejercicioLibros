const express = require('express');
const cors = require('cors');
const app = express();
const booksRoutes = require('./routes/bookRoutes');
const authorsRoutes = require('./routes/authorRoutes');
const genreRoutes = require('./routes/genreRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta base
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/genre', genreRoutes);
app.use('/publisher', publisherRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
