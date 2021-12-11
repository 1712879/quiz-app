const mongoose = require("mongoose");

const attemptsSchema = new mongoose.Schema(
    {
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions"}],
        startedAt: {type: Date, default: Date.now},
        completed: {type: Boolean, default: false},
        userAnswer: Object,
        score: Number,
        scoreText: String
    },
    { collection: "attempts" }
);

module.exports = mongoose.model("attempts", attemptsSchema);
