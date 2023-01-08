const express = require('express')
const session = require('express-session')

const article_router = require('./server/routes/article-router')
const router = require('./server/routes/router')

const path = require('path')
const methodOverride = require('method-override')
require('dotenv').config()

const connectDB = require('./server/database/connect-db')

const app = express()
connectDB.connectDB()

app.set('view engine', 'ejs')
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.use('/articles', article_router)
app.use('/', router)


app.listen(process.env.PORT || 3000, () => {
    if (process.env.PORT){
        console.log(`Server is running on port ${process.env.PORT}`)
    } else {
        console.log('Server is running on port 3000')
    }
})