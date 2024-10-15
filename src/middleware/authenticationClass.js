require('dotenv').config();
const jwt = require('jsonwebtoken');
const { generateToken, decodeTokenToUserCredentials } = require('../utils/jwtHelpers');

class AuthenticationClass {
  static async requiresAuthentication(req, res, next) {
    const requireAuthList = [
      '/user/profile',
    ];
    if (requireAuthList.includes(req.path)) {
      j;
    } else {
      next();
    }
  }

  static async setAuthTokenCookie(req, res, next) {
    const authToken = await generateToken({ data: res.userCredentials }, process.env.SECRET_KEY, { expiresIn: '1h' });

    if (!authToken) {
      res.status(500).send('Error setting up token');
    } else {
      res.cookie(jwt, authToken);
      next();
    }
  }
}

module.exports = AuthenticationClass;
