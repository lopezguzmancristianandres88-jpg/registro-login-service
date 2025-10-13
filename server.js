// Se importa  express para crear el servidor
const express = require('express');
const app = express();

// Middleware para que se puedan procesar datos en formato JSON
app.use(express.json());

// Aqui se simula una base de datos de usuarios en memoria
const usuarios = [
  { username: 'admin', password: '1234' },
  { username: 'usuario', password: 'abcd' }
];

// Esta es la Ruta de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido al servicio web de registro e inicio de sesión');
});

// Esta es la ruta para registro de nuevos usuarios
app.post('/registro', (req, res) => {
  const { username, password } = req.body;

  // Para Verificar que no exista el usuario
  const existe = usuarios.find(u => u.username === username);
  if (existe) {
    return res.status(400).json({ mensaje: 'El usuario ya existe' });
  }

  // Para Registrar nuevo usuario
  usuarios.push({ username, password });
  res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
});

// Ruta para inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const usuario = usuarios.find(u => u.username === username && u.password === password);

  if (usuario) {
    res.json({ mensaje: 'Autenticación satisfactoria ✅' });
  } else {
    res.status(401).json({ error: 'Error en la autenticación ❌' });
  }
});

// Configurar el puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
