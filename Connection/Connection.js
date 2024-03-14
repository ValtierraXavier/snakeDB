import mongoose from 'mongoose'

const connectConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set('strictQuery', false)

const url =  process.env.MONGO_URL || 'mongodb://localhost:27017/SnakeDB'
// const url ='mongodb://localhost:27017/SnakeDB'

mongoose.connect(url, connectConfig)

mongoose.connection.on('connected', () => {console.log('Mongoose connected')})
mongoose.connection.on('disconnected', () => {console.log('Mongoose disconnected')})
mongoose.connection.on('error', (error) => {console.log('error', error)})

export default mongoose.connection