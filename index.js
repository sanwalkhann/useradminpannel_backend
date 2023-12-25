// index.js
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./Config/passport');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const bcrypt = require('bcrypt');
const session = require('express-session');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'sanwal123321',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Routes
const userRoutes = require('./Routes/userRoutes');
app.use('/api', userRoutes);


// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
