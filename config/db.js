/***  Logic to connect to MongoDB database ***/

// Dependencies to bring
const mongoose = require('mongoose');

// Function to connect to DB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true
        });

        console.log('Connected to MongoDB...' + conn.connection.host);
    } catch (error) {
        console.log('Error while connecting to mongoDB :- ' + error.message);
        process.exit(1);
    }
}

module.exports = connectDB;