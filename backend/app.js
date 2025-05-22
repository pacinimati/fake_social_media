const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql2/promise');
const path = require('path');
const cors = require('cors'); // Añadir esta línea

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const isAuthenticated = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Habilitar CORS para permitir peticiones del frontend
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto por la URL de tu frontend React
  credentials: true // Para permitir cookies con peticiones CORS
}));

// Importar el pool de conexión desde config.js en lugar de crear uno nuevo
const pool = require('./db/config');

// Sesión y Passport
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const bcrypt = require('bcryptjs'); // Asegúrate de añadir esta importación

// Estrategia Local
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (!user) return done(null, false, { message: 'Usuario incorrecto' });
    
    // Usar bcrypt para comparar contraseñas
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Contraseña incorrecta' });
    
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serialización
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware para compartir pool
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Rutas
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api', authRoutes); // Login, logout, me

app.listen(3000, () => console.log('Servidor en puerto 3000'));
