const Controller = require('../../core/controller')

const UserModel = require('../../models/user.model')
const BillModel = require('../../models/bill.model')
class AccountController extends Controller {
    constructor() {
        super()
    }

    getIndex = async (req, res) => {
        let user = res.locals.user

        res.render('shop/account', { user: user })
    }
    update = async (req, res) => {
        let name = req.body.name
        let email = req.body.email
        let number = req.body.number
        let address = req.body.address

        await UserModel.findByIdAndUpdate(req.query.id, {
            $set: {
                name: name,
                email: email,
                number: number,
                address: address,
            },
        })
        res.json({
            code: 200,
            message: 'Cập nhật tài khoản thành công !!',
        })
    }
    Order = async (req, res) => {
        let user_id = res.locals.user.info.id
        let bills = await BillModel.find({ user: user_id })
            .populate({
                path: 'products',
                populate: { path: 'product', model: 'Product' },
            })
            .exec()
        let Orders = []

        for (let index = 0; index < bills.length; index++) {
            const element = bills[index]

            for (let i = 0; i < element.products.length; i++) {
                const e = element.products[i]
                Orders.push(e)
            }
        }

        res.render('shop/accountOrder', { bills: bills, Orders: Orders })
    }
}
module.exports = new AccountController()
