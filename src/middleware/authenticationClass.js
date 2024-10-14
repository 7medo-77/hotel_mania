const jwt = require('jsonwebtoken');
const Joi = require('joi');
const validatorClass = require('./validatorClass');

class AuthenticateClass {
  static async getAuthToken(req, res) {
    const tokenNotParsed = req.headers.authorization.split(' ');
    const authorizationToken = tokenNotParsed[1];
    return authorizationToken;
  }

  static async requiresAuthentication(req, res, next) {
    const requireAuthList = [
      '/user/profile',
    ];

    if (requireAuthList.includes(req.path)) {
      res.sendStatus(403);
    } else {
      next();
    }
  }

  static async userSignUp(req, res, next) {
  }
}

module.exports = AuthenticateClass;
