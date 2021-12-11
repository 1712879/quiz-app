const schemas = require('./schemas/index')
const databaseService = require("./database/Mongodb");
const questionsFileJson = require('./questions.json');

async function insertSamplesQuestion(samples){
    try {
        await databaseService.open();
        let sampleValues = samples.map(sample => {
            return {
                answers: sample.answers,
                text: sample.text,
                answersCorrectIndex: sample.correctAnswer['$numberInt']
            }
        })
        let results = await schemas.questionsSchema.insertMany(sampleValues, {lean: true});
        console.log("Success")
    } catch (error) {
        console.log("error >>> ", error)
    }
}

insertSamplesQuestion(questionsFileJson).then(result => console.log("success")).catch(err => console.log(err))