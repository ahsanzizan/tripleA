const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI)
        console.log(`Connected to database: ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}

