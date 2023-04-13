const Router = require('express').Router()
const billController = require('../../controllers/admin/bill.controller')

Router.get('', billController.getIndex)

Router.get('/show', billController.show)
Router.post('/xuly', billController.handle)

module.exports = Router
