/* 
 * Entry Point to back-end (index.js)
 */

// Bring in the dependencies and other required files
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

//Import routes
const listRoutes = require('./routes/list_routes');
const authRoutes = require('./routes/auth');
const mailRoutes = require('./routes/mail_routes');
const verifyRoutes = require('./routes/verify_routes');

//Init express
const app = express();

// Connect to MongoDB
connectDB();

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/* Routes Settings */

// GET POST PATCH DELETE /lists
app.use('/lists', listRoutes);

// POST /users
app.use('/users', authRoutes);

// POST /mail
app.use('/mail', mailRoutes);

// POST /verify
app.use('/verify', verifyRoutes);



// Define port numbers
const PORT = process.env.PORT || 3000;

// Listen to the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})