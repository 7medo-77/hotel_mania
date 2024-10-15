const { Router } = require('express');
const validateClass = require('../middleware/validatorClass');
const userController = require('../controllers/userController');
const AuthenticationClass = require('../middleware/authenticationClass');

const router = Router();

router.post('/signup',
  validateClass.validateUserSignUp,
  userController.addCurrentValidatedUser,
  AuthenticationClass.setAuthTokenCookie,
  (req, res) => {
    res.redirect('/');
  });

router.post('/login',
  validateClass.validateUserLogin,
  userController.getCurrentUser,
  AuthenticationClass.setAuthTokenCookie,
  (req, res) => {
    res.redirect('/');
  // userController.getCurrentUser(req, res);
  });

router.get('/:userID/profile', (req, res) => {
  // get all the user details relating to that user
});

module.exports = router;
