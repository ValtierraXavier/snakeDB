import mongoose from 'mongoose'

const connectConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URL

mongoose.connect(url, connectConfig)

mongoose.connection.on('connected', () => {console.log('Mongoose connected')})
mongoose.connection.on('disconnected', () => {console.log('Mongoose disconnected')})
mongoose.connection.on('error', (error) => {console.log('error', error)})

export default mongoose.connection