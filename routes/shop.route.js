const Router = require('express').Router()
const Auth = require('../middlewares/auth.middleware')
const ErrorController = require('../controllers/shop/error.controller')
const indexRouter = require('./shop/index.route')
const cartRouter = require('./shop/cart.route')
const accountRouter = require('./shop/account.route')
const loginRouter = require('./shop/login.route')
const productRouter = require('./shop/product.route')
Router.use(Auth.auth)

Router.use('/cart', cartRouter)
Router.use('/', indexRouter)

Router.use('/login', Auth.redirectWhenAuth, loginRouter)
Router.use('/account', Auth.requireAuthredirect, accountRouter)
Router.use('/product', productRouter)
Router.get('/logout', async (req, res) => {
    console.log(res.clearCookie('_id'))
    console.log(res.clearCookie('_id'))
    res.redirect('/')
})
module.exports = Router
