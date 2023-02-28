const mongoose = require('mongoose')
require('dotenv').config()


exports.connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.URI)
        console.log(`Connected to database: ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}

