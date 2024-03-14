import connection from './Connection.js'
import express from 'express'
import cors from 'cors'
import Routes from '../Router/index.js'

const app = express()
const port = process.env.PORT || 3020
app.use(express.json())
app.use(cors())
app.use('/', Routes)

connection.on('connected', () => {
    console.clear()
    console.log(('Server Active'))
    app.listen(port, () => console.log(`Listening on Port: ${port}`))
})
