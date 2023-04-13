const Controller = require('../../core/controller')
const UserModel = require('../../models/user.model')
const BillModel = require('../../models/bill.model')

class UserControllder extends Controller {
    constructor() {
        super()
    }

    getIndex = async (req, res) => {
        let users = await UserModel.find({})
        res.render('admin/user', { users: users })
    }
}
module.exports = new UserControllder()
