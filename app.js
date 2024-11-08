// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Función para obtener todos los usuarios
function getUsers(req, res) {
    db.query('SELECT * FROM usuario', (err, results) => {
        if (err) {
            console.error("Error al obtener usuarios:", err);
            return res.status(500).send('Error al cargar los usuarios.');
        }
        res.render('index', { users: results });
    });
}

// Función para agregar un usuario
function addUser(req, res) {
    const { Cedula, Nombres, Apellidos, FechaDeNacimiento, Correo, Contraseña } = req.body;

    // Validación de campos requeridos
    if (!Cedula || !Nombres || !Apellidos || !FechaDeNacimiento || !Correo || !Contraseña) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    const query = `INSERT INTO usuario (Cedula, Nombres, Apellidos, FechaDeNacimiento, Correo, Contraseña) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [Cedula, Nombres, Apellidos, FechaDeNacimiento, Correo, Contraseña], (err) => {
        if (err) {
            console.error("Error al agregar usuario:", err);
            return res.status(500).send('Error al agregar usuario.');
        }
        res.redirect('/');
    });
}

// Función para actualizar un usuario
function updateUser(req, res) {
    const { Cedula, Nombres, Apellidos, FechaDeNacimiento, Correo, Contraseña } = req.body;

    if (!Cedula) {
        return res.status(400).send('La Cédula es obligatoria para actualizar el usuario.');
    }

    const query = `UPDATE usuario SET Nombres = ?, Apellidos = ?, FechaDeNacimiento = ?, Correo = ?, Contraseña = ? WHERE Cedula = ?`;
    db.query(query, [Nombres, Apellidos, FechaDeNacimiento, Correo, Contraseña, Cedula], (err) => {
        if (err) {
            console.error("Error al actualizar usuario:", err);
            return res.status(500).send('Error al actualizar usuario.');
        }
        res.redirect('/');
    });
}

// Función para eliminar un usuario
function deleteUser(req, res) {
    const { cedula } = req.params;

    if (!cedula) {
        return res.status(400).send('La Cédula es obligatoria para eliminar el usuario.');
    }

    db.query('DELETE FROM usuario WHERE Cedula = ?', [cedula], (err) => {
        if (err) {
            console.error("Error al eliminar usuario:", err);
            return res.status(500).send('Error al eliminar usuario.');
        }
        res.redirect('/');
    });
}

// Rutas
app.get('/', getUsers);
app.post('/add-user', addUser);
app.post('/update-user', updateUser);
app.get('/delete-user/:cedula', deleteUser);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
d
