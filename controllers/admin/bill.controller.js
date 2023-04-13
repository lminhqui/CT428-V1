const Controller = require('../../core/controller')

const BillModel = require('../../models/bill.model')

class IndexControllder extends Controller {
    constructor() {
        super()
    }

    getIndex = async (req, res) => {
        let bills = await BillModel.find({})
        console.log(bills)
        res.render('admin/bill', { bills: bills })
    }
    show = async (req, res) => {
        let id = req.query.id
        let bill = await BillModel.findById(id)
            .populate({
                path: 'products',
                populate: { path: 'product', model: 'Product' },
            })
            .exec()

        res.render('admin/billdetail', {
            bill: bill,
        })
    }
    handle = async (req, res) => {
        let id = req.query.id
        let bill = await BillModel.findById(id)
        console.log(bill)
        if (bill.status == 0) {
            await BillModel.findByIdAndUpdate(id, { $set: { status: 1 } })
            res.send({
                code: 200,
                message: 'Trạng thái của đơn hàng đã đổi thành đang giao',
            })
        }
        if (bill.status == 1) {
            await BillModel.findByIdAndUpdate(id, { $set: { status: 2 } })
            res.send({
                code: 200,
                message: 'Trạng thái của đơn hàng đã đổi thành đã giao',
            })
        }
    }
}
module.exports = new IndexControllder()
