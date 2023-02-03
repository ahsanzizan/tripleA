const Admin = require('../models/Admin')
const Article = require('../models/Article')

const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('index', { articles: articles })
})

router.get('/admin', async (req, res) => {
  if (req.session.logged) {
      const articles = await Article.find().sort({ createdAt: 'desc' })
      res.render('admin', { articles: articles })
  } else {
      res.redirect('/admin/login')
  }
})

router.get('/admin/login', (req, res) => {
  res.render('login')
})

router.post('/auth', (req, res) => {
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

module.exports = router