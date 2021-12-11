const express = require("express");
const router = express.Router();
const schemas = require('./schemas/index')
const databaseService = require("./database/Mongodb");
/**
 * Endpoint start a new attempt
 */
router.post("/attempts", async (req, res) => {
    try {
        await databaseService.open();
        let questions = await schemas.questionsSchema.aggregate([
            {$sample: {size: 10}}
        ])
        
        let attemptModel = new schemas.attemptsSchema({
            questions: questions.map(e => e._id)
        });
        let attemptSaved = await attemptModel.save();
        let attempt = await schemas.attemptsSchema.findById(attemptSaved._id).populate({
            path: "questions",
            select: "-answersCorrectIndex"
        }).lean();
        return res.status(201).json(attempt)
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
})

router.post("/attempts/:id/submit", async (req, res) => {
    try {
        await databaseService.open();
        let body = req.body;
        if (!body) {
            return res.status(400).json({
                message: "Body data empty"
            })
        }
        let attempt = await schemas.attemptsSchema.findById(req.params.id).populate({
            path: "questions"
        }).lean();
        let attemptAsJson = JSON.parse(JSON.stringify(attempt))
        if(!attempt){
            return res.status(404).json({
                message: "attempt not found."
            })
        }
        if (attempt.completed){
            return res.status(200).json({
                message: "attempt was completed"
            })
        }
        let answer = body;
        let correctAnswers = attempt.questions.reduce((total, cur) => {
            return {
                ...total,
                [cur._id]: cur.answersCorrectIndex
            }
        }, {})
        let score = 0;
        let questionKey = Object.keys(correctAnswers)
        for (const [key, value] of Object.entries(answer)) {
            console.log(`${key}: ${value}`);
            if (questionKey.includes(key) && correctAnswers[key] == value){
                score = score + 1;
            }
        }
        let scoreText = calculateScoreText(score);
        let updateValue = {
            ...attemptAsJson,
            questions: questionKey,
            completed: true,
            score,
            scoreText,
            userAnswer: answer
        }
        await schemas.attemptsSchema.findByIdAndUpdate(req.params.id, updateValue);
        return res.status(200).json({
            ...attemptAsJson,
            questions: attempt.questions.map(e => { delete e.answersCorrectIndex; return e}),
            completed: true,
            score,
            scoreText,
            answer,
            correctAnswers
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
})

function calculateScoreText(score){
    if(score < 5){
        return "Practice more to improve it :D"
    }
    else if(score >= 5 && score < 7){
        return "Good, keep up!"
    }
    else if (score >= 7 && score < 9){
        return "Well done!"
    }else{
        return "Perfect!!"
    }
}

router.get('/questions', async (req, res) => {
    try {
        await databaseService.open();
        let questions = await schemas.questionsSchema.find({}).lean();
        
        return res.status(200).json({
            status: 200,
            data: questions
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
})

router.get('/questions/:id', async (req, res) => {
    try {
        await databaseService.open();
        let id = req.params.id;
        if(!id){
            return res.status(404).json({
                status: 404,
                message: 'Question not found.'
            })
        }
        let question = await schemas.questionsSchema.findById(id).lean();

        return res.status(200).json({
            status: 200,
            data: question
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
})

router.post('/questions', async (req, res) => {
    try {
        await databaseService.open();
        let body = req.body;
        if (!body || !body.text || !body.answers.length){
            return res.status(400).json({
                status: 400,
                message: 'Payload invalid'
            })
        }
        let questionModel = new schemas.questionsSchema({
            ...body
        });
        let questionSaved = await questionModel.save();
        return res.status(200).json({
            status: 200,
            data: questionSaved
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
})

router.put('/questions/:id', async (req, res) => {
    try {
        await databaseService.open();
        let id = req.params.id;
        if (!id) {
            return res.status(404).json({
                status: 404,
                message: 'Question not found.'
            })
        }
        let body = req.body;
        if (!body || !body.text || !body.answers.length) {
            return res.status(400).json({
                status: 400,
                message: 'Payload invalid'
            })
        }
        let {_id, ...payload} = body;
        let questionSaved = await schemas.questionsSchema.findByIdAndUpdate(id, payload, { new: true })
        return res.status(200).json({
            status: 200,
            data: questionSaved
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
})

router.delete('/questions/:id', async (req, res, next) => {
    try {
        await databaseService.open();
        let id = req.params.id;
        if (!id) {
            return res.status(404).json({
                status: 404,
                message: 'Question not found.'
            })
        }
        let question = await schemas.questionsSchema.findById(id);
        if (!question) {
            return res.status(404).json({
                status: 404,
                message: 'Question not found.'
            })
        }
        await question.remove();
        return res.status(200).json({
            status: 200,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
})


module.exports = router;