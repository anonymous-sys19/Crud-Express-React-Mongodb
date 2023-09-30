const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://anonimo:cyber@anonimo.d9yhmae.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error al conectar a la base de datos:', err);
});

db.once('open', () => {
  console.log('Conexión a la base de datos de MongoDB establecida.');
});

// Definir un esquema para tu colección de usuarios (models/user.js)
const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Rutas CRUD
// Leer todos los elementos
app.get('/api', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error al consultar elementos:', err);
    res.status(500).json({ error: 'Error al consultar elementos.' });
  }
});

// Crear un nuevo elemento
app.post('/api/create', async (req, res) => {
  const { username, name, password } = req.body;
  try {
    const newUser = new User({ username, name, password });
    await newUser.save();
    res.status(201).json({ message: 'Elemento creado con éxito.' });
  } catch (err) {
    console.error('Error al crear el elemento:', err);
    res.status(500).json({ error: 'Error al crear el elemento.' });
  }
});

// Actualizar un elemento existente
app.put('/api/update/:id', async (req, res) => {
  const { username, name, password } = req.body;
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { username, name, password });
    res.json({ message: 'Elemento actualizado con éxito.' });
  } catch (err) {
    console.error('Error al actualizar el elemento:', err);
    res.status(500).json({ error: 'Error al actualizar el elemento.' });
  }
});

// Eliminar un elemento
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndRemove(id);
    res.json({ message: 'Elemento eliminado con éxito.' });
  } catch (err) {
    console.error('Error al eliminar el elemento:', err);
    res.status(500).json({ error: 'Error al eliminar el elemento.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
