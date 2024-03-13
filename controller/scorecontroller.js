import Scores from '../Model/scoreModel.js'

let scoresArr = []
//sets the scoresArr to whats currently stored in the Database. for persistency.
const init = async () => {    
    try{
        const data = await Scores.find({})
        // const update = data[0]?.highScores  
        const update = !data[0]? [{name:'PlaceHolder', score: 0}] : data[0].highScores  
        scoresArr = [...update] 
    }catch(error){console.log(error.message)}
}
init()
//function to sort the scoresArr for saving
const sortArr = (arr) => {
    let copyArr = [...arr]
    let highest
    let highestIndex
    let sortedArr = []
    for(let i = 0; i < arr.length; i++){
        highest = copyArr[0]
        highestIndex = 0
        for(let j = 0; j < copyArr.length; j++){
            if(highest.score < copyArr[j].score){
                highest = copyArr[j]
                highestIndex = j
            }
        }
        sortedArr.push(highest)
        copyArr.splice(highestIndex, 1)
    }
    scoresArr = [...sortedArr]
    return(sortedArr)
}

//gets all 5 current highscores
export const getScores = async (req, res) => {
    try{
        let scores = await Scores.find({})
        res.send(scores)
    }catch(error){error.message}
}

//gets the current highest score returns an array of scores if multiple of the high score exists
export const getHighestScore = async (req, res) => {
    let arrCopy = [...scoresArr]
    let scores = await Scores.find({})
    let highScoreArr = []
    if(scores?.length == 0){
       res.send([
        {name: 'PlaceHolder', score: 0}
    ])
    }else{
        let currentHighscore = arrCopy[0]
        for(let i = 0; i < arrCopy.length; i++){
            if(currentHighscore.score == arrCopy[i].score){
                highScoreArr.push(arrCopy[i])
            }
        }
    }
    try{
      await res.send(highScoreArr) 
    }catch(error){error.message}
}
export const newHighScore = async (req, res) => {
    const body = req.body
    if(scoresArr.length == 1 && scoresArr[0].name == "PlaceHolder"){
        scoresArr.pop()
    }else{
        try{
            scoresArr.unshift(body)
            if(scoresArr.length > 5){
                scoresArr.pop()
            }
            await Scores.deleteMany({})
            const sorted = sortArr(scoresArr)
            scoresArr = [...sorted]
            await new Scores({highScores: [...scoresArr]}).save()
            const currentScores = await Scores.find({})
            await res.send(currentScores)
        }catch(error){error.message}
    }
}

//next step finish title screen
//add view for mobile sized screens. Highscore sits at the top and drops down with a click/touch.