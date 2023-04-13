const Router = require('express').Router()
const productController = require('../../controllers/admin/product.controller')

Router.get('', productController.show)
Router.get('/create', productController.create)
Router.post('/create', productController.store)
Router.get('/edit', productController.edit)
Router.post('/edit', productController.update)
Router.post('/delete', productController.detele)
module.exports = Router
