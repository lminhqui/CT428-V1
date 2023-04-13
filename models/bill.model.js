const mongoose = require('../core/model.js')
const Schema = new mongoose.Schema({
    date: { type: Date, default: Date.now() },
    value: { type: mongoose.SchemaTypes.Decimal128, required: true },
    status: { type: Number, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    products: [
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
            },
        },
    ],
})
const BillModel = mongoose.model('Bill', Schema, 'bills')
module.exports = BillModel
