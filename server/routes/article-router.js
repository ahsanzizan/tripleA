const express = require('express')
const Article = require('../models/Article')
const router = express.Router()

// save and redirect
function saveAndRedirect(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      article.tags = req.body.tags.split(' ')

      try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
      } catch (e) {
        res.render(`${path}`, { article: article })
        console.log(e)
      }
    }
  }

router.get('/new', (req, res) => {
    if (!req.session.logged) return
    res.render('new', { article: new Article()})
})

router.get('/edit/:id', async (req, res) => {
    if (!req.session.logged) res.redirect('/')
    const article = await Article.findById(req.params.id)
    res.render('edit', { article: article})
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) {
        res.redirect('/')
        return
    }
    res.render('article', {article: article})
})

router.post('/', 
async (req, res, next) => {
    req.article = new Article()
    next()
},
saveAndRedirect('new'))

router.put('/:id',
async (req, res, next) => {
    if (!req.session.logged) res.redirect('/')
    req.article = await Article.findById(req.params.id)
    next()
},
saveAndRedirect('edit'))

router.delete('/:id', 
async (req, res) => {
    if (!req.session.logged) res.redirect('/')
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/admin')
})

module.exports = router