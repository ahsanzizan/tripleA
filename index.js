const express = require('express')
const session = require('express-session')
const router = require('./server/routes/router')
const path = require('path')
const methodOverride = require('method-override')
require('dotenv').config()

const Article = require('./server/models/Article')
const Admin = require('./server/models/Admin')
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
app.use('/articles', router)

// Main routes
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('index', { articles: articles})
})

// Admin and home routings
app.get('/admin', async (req, res) => {
    if (req.session.logged) {
        const articles = await Article.find().sort({ createdAt: 'desc' })
        res.render('admin', { articles: articles })
    } else {
        res.redirect('/admin/login')
    }
})

app.get('/admin/login', (req, res) => {
    res.render('login')
})

app.post('/auth', (req, res) => {
    const name = req.body.name
    const password = req.body.password

    if (name && password) {
        Admin.findOne({
            name: name,
            password: password
        }).then(msg => {
            if (msg) {
                req.session.logged = true
                req.session.name = name
                res.redirect('/admin')
            } else {
                res.redirect('/')
            }
        }).catch(error => res.status(500).send({msg: "error ocurred when finding admin"}))
    }
})


app.listen(process.env.PORT || 3000, () => {
    if (process.env.PORT){
        console.log(`Server is running on port ${process.env.PORT}`)
    } else {
        console.log('Server is running on port 3000')
    }
})