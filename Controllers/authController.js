// controllers/authController.js
const passport = require('passport');
const UserModel = require('../models/User');

exports.login = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.register = async (req, res) => {
  const { username, password, fullName, email, phoneNumber } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password, fullName, email, phoneNumber });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
