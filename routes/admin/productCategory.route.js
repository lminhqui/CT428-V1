const Router = require('express').Router()
const productCategoryController = require('../../controllers/admin/productCategory.controller')

Router.post('/delete/:id', productCategoryController.delete)

Router.post('/create', productCategoryController.store)
Router.post('/:id', productCategoryController.edit)
module.exports = Router
