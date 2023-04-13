const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    name: { type: String },
    role: { type: Number, require: true },
    create_at: { type: Date, default: Date.now() },
    modify_at: { type: Date, required: true },
    email: { type: String },
    number: { type: Number },
    address: { type: String },
    male: { type: Number },
    account: { type: mongoose.SchemaTypes.ObjectId, ref: 'Account' },
})
const UserModel = mongoose.model('User', Schema, 'users')
module.exports = UserModel
