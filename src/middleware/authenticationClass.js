require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { generateToken, decodeTokenToUserCredentials } = require('../utils/jwtHelpers');

const prisma = new PrismaClient();

class AuthenticationClass {
  static async requiresAuthentication(req, res, next) {
    const requireAuthList = [
      '/user/profile',
      '/reservations',
    ];
    if (requireAuthList.includes(req.path)) {
      if (!req.cookies) {
        req.status(401).json({ Error: 'Forbidden' });
      }
      const authenticationToken = req.cookies.authToken;

      try {
        const authorizedUserID = await decodeTokenToUserCredentials(authenticationToken, process.env.SECRET_KEY);
        const authenticateUser = await prisma.user.findUnique({
          where: {
            id: authorizedUserID,
          },
        });

        if (!authenticateUser) throw new Error('Forbidden');
        req.userID = authorizedUserID;
        next();
      } catch (error) {
        req.status(401).json({ Error: 'Forbidden' });
      }
      // j;
    } else {
      next();
    }
  }

  static async setAuthTokenCookie(req, res, next) {
    const authToken = await generateToken({ data: res.userCredentials }, process.env.SECRET_KEY, { expiresIn: '1h' });

    if (!authToken) {
      res.status(500).send('Error setting up token');
    } else {
      res.cookie('authToken', authToken);
      next();
    }
  }
}

module.exports = AuthenticationClass;
