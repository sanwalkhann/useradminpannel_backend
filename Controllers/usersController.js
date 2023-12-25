const passport = require('passport');
const UserModel = require('../Model/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




 const getAllUsers = async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const createUser = async (req, res) => {
    const { username, password, fullName, email, phoneNumber , userType } = req.body;
  
    if(userType === "Admin"){
      return res.status(400).json({ message: 'Admin already registered' });
      
    }

    try {
      const existingUser = await UserModel.findOne({ username });
  
      

      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 11);
  
      const newUser = new UserModel({
        username,
        password: hashedPassword,
        fullName,
        email,
        phoneNumber,
        userType
      });
  
      await newUser.save();
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const Login = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      
      return res.status(200).json({ message: 'Login successful', user, token });
    })(req, res, next);
  };

 const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, fullName, email, phoneNumber } = req.body;


  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username;
    user.fullName = fullName;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    return res.json({ message: 'User updated successfully', user });
    
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

 const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  Login
};