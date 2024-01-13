import mongoose from 'mongoose'

let scoreSchema = new mongoose.Schema(
    {
        highScores: Array
    }
)

let ScoreModel = mongoose.model('HiScores', scoreSchema)

export default ScoreModel