const Router = require('express').Router()
const indexControllder = require('../../controllers/admin/index.controller')

Router.get('', indexControllder.getIndex)

module.exports = Router
