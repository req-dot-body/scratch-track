module.exports = {
  requireAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ error:'You must be signed in to view this resource' });
    }
  }
};
