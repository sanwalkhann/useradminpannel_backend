// routes/userRoutes.js
const express = require('express');
const { getAllUsers, createUser, updateUser, deleteUser, Login } = require('../Controllers/usersController');
const authMiddleware = require('../Middleware/authMiddlewaer'); 

const router = express.Router();

router.get('/users', authMiddleware, getAllUsers);
router.put('/user/update/:id', authMiddleware, updateUser);
router.delete('/user/delete/:id', authMiddleware, deleteUser);

router.post('/register', createUser);
router.post('/login', Login);

module.exports = router;
