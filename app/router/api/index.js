const express = require('express');
const authController = require('../../controllers/api/authController');
const userController = require('../../controllers/api/userController');
const gameController = require('../../controllers/api/gameController');
const auth = require('../../middlewares/auth');


const router = express.Router();

router.get('/users', userController.getAll);

// user routes
router
   .route('/users/:id')
   .get(userController.getOne)
   .delete(userController.delete)
   .patch(userController.update);

// Register
router.post('/register', userController.create);

// Login
router.post("/login", authController.login);

// Profile
router.get('/profile/:id', auth, userController.getOne);

// Game creation routes
router.post('/lobby', gameController.createGame);

module.exports = router;