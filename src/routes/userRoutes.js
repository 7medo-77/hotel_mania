const { Router } = require('express');
const validateClass = require('../middleware/validatorClass');
const userController = require('../controllers/userController');

const router = Router();

router.post('/signup', validateClass.validateUser(req, res), (req, res) => {
  userController.addCurrentValidatedUser(req, res);
});

router.post('/login', (req, res) => {
});

router.get('/:userID/profile', (req, res) => {
  // get all the user details relating to that user
});
