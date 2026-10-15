const express = require('express');
const { signUp,login,updateUser, deleteUser, getUser  } = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login',login);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);

module.exports = router;