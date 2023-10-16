const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({success:false, message: 'Token not provided' });
    }
  
    jwt.verify(token, 'yourSecretKey', (err, user) => {
      if (err) {
        return res.status(401).json({success:false, message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  }

  module.exports = verifyToken;