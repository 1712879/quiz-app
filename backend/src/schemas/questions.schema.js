const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema(
    {
        text: String,
        answers: [String],
        answersCorrectIndex: Number,

    },
    { collection: "questions" }
);

module.exports = mongoose.model("questions", questionsSchema);
