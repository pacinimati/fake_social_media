exports.login = (req, res) => {
  res.json({ message: 'Login exitoso', user: req.user });
};

exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ message: 'Sesión cerrada' });
  });
};

exports.getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'No autenticado' });
  }
};
