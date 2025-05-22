
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Inicia sesion para realizar esta accion' });
}

module.exports = {
  isAuthenticated
};