const mongoose = require("mongoose");
require("dotenv").config();

console.log("MongoDB URL from env:", process.env.MONGODB_URL); // Debugging line

exports.connect = () => {
    if (!process.env.MONGODB_URL) {
        console.error("Error: MONGODB_URL is undefined. Check your .env file.");
        process.exit(1);
    }

    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.error("DB connection issue:", err);
        process.exit(1);
    });
};
