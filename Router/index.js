import { Router } from 'express'
import hiScoreRoutes from './hiScoreRoutes.js'

const router = Router()

router.get('/',(req,res)=>{
    res.send('API Root')
})

router.use('/score', hiScoreRoutes)

export default router;