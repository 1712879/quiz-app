require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URL =
     process.env.MONGODB_URL ||
     "mongodb://localhost:27017/wpr-quiz";
module.exports = {
     PORT,
     MONGODB_URL
};
