const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Number, required: true },
})
const ProductProviderModel = mongoose.model(
    'ProductProvider',
    Schema,
    'productproviders'
)
module.exports = ProductProviderModel
