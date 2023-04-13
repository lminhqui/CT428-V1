const Router = require('express').Router()
const cartControllser = require('../../controllers/shop/cart.controller')
const Auth = require('../../middlewares/auth.middleware')
Router.get('', cartControllser.getIndex)
Router.get('/1', (req, res) => {
    res.send('sdfsd')
})

Router.post('/checkout', Auth.requireAuth, cartControllser.checkout)
Router.get('/success', cartControllser.success)
Router.get('/cancel', cartControllser.cancel)
module.exports = Router
