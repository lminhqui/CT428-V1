const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})
const AccountModel = mongoose.model('Account', Schema, 'accounts')
module.exports = AccountModel
