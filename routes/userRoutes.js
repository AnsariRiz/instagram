const express = require('express');
const router = express.Router();
const validteToken = require('../middleware/validateTokenHandler');

const { registerUser, loginUser, infoUser } = require('../controllers/authController');

router.post('/register', registerUser)
// router.post('/login', loginUser)
// router.get('/info', validteToken, infoUser)


module.exports = router;