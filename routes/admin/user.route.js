const Router = require('express').Router()
const userControllder = require('../../controllers/admin/user.controller')

Router.get('', userControllder.getIndex)

module.exports = Router
