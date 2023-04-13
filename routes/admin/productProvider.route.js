const Router = require('express').Router()
const productProviderController = require('../../controllers/admin/productProvider.controller')

Router.post('/delete/:id', productProviderController.delete)

Router.post('/create', productProviderController.store)
Router.post('/:id', productProviderController.edit)
module.exports = Router
