/***  Logic to connect to MongoDB database ***/

// Dependencies to bring
const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');

// Function to connect to DB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('Connected to MongoDB...');
    } catch (error) {
        console.log('Error while connecting to mongoDB :-' + error);
    }
}

module.exports = connectDB;