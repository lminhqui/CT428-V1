const Router = require('express').Router()
const AccountControllser = require('../../controllers/shop/account.controller')

Router.get('', AccountControllser.getIndex)
Router.post('/update', AccountControllser.update)
Router.get('/Order', AccountControllser.Order)
module.exports = Router
