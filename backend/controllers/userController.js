const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const SECRET = 'claveSecreta123'; // ⚠️ Usá una variable de entorno real

async function register(req, res) {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const id = await userModel.createUser({ username, email, password: hashed });
  res.status(201).json({ message: 'Usuario registrado', id });
}

module.exports = {
  register
};
