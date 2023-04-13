const Router = require('express').Router()
const loginController = require('../../controllers/shop/login.controller')

Router.get('', loginController.getLogin)
Router.post('', loginController.Login)
Router.get('/register', loginController.getRegister)
Router.post('/register', loginController.register)

module.exports = Router
