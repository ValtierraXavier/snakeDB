import { Router } from 'express'
import * as controller from "../controller/scorecontroller.js"

const router = Router()

router.get('/get', controller.getScores)
router.get('/get/highest', controller.getHighestScore)
router.post('/add',controller.newHighScore)

export default router