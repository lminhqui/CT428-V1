const AccountModel = require('../models/account.model')
const UserModel = require('../models/user.model')
module.exports.requireadmin = async (req, res, next) => {
    try {
        user = {
            account: await AccountModel.findById(req.signedCookies._id),
            info: await UserModel.findOne({
                account: req.signedCookies._id,
            }),
        }
        let id= req.signedCookies._id
        console.log(id)
        if (user.info.role != 1) {
            res.json({
                code: 403,
                message: 'phải là admin để thực hiện chức năng này',
            })
            return
        }
        res.locals.user = user
        user.info
    } catch {
        res.json({ code: 403, message: 'Lỗi lấy dữ liệu' })
        return
    }
    next()
}
module.exports.auth = async (req, res, next) => {
    // kiểm tra có signed Cookies hay không

    let user
    if (req.signedCookies._id) {
        try {
            user = {
                account: await AccountModel.findById(req.signedCookies._id),
                info: await UserModel.findOne({
                    account: req.signedCookies._id,
                }),
            }
            res.locals.user = user
        } catch {
            res.json({ code: 403, message: 'Lỗi lấy dữ liệu' })
            return
        }
        next()
        return
    }
    next()
    return
}
module.exports.redirectWhenAuth = async (req, res, next) => {
    if (req.signedCookies._id) res.redirect('/')
    next()
}
module.exports.requireAuth = async (req, res, next) => {
    // kiểm tra có signed Cookies hay không
    //nếu không có signed Cookies thì trả về thông báo đăng nhập và code
    if (!req.signedCookies._id) {
        res.json({ code: 403, message: 'vui lòng đăng nhập' })
        return
    }
    // nếu có signed Cookies thì tìm thông tin người dùng và trả về dữ liệu thông tin người dùng
    else {
        try {
            user = {
                account: await AccountModel.findById(req.signedCookies._id),
                info: await UserModel.findOne({
                    account: req.signedCookies._id,
                }),
            }
            res.locals.user = user
        } catch {
            res.json({ code: 403, message: 'Lỗi lấy dữ liệu' })
            return
        }
        next()
        return
    }
}
module.exports.requireAuthredirect = async (req, res, next) => {
    // kiểm tra có signed Cookies hay không
    //nếu không có signed Cookies thì trả về thông báo đăng nhập và code
    if (!req.signedCookies._id) {
        res.redirect('/')
        return
    }
    // nếu có signed Cookies thì tìm thông tin người dùng và trả về dữ liệu thông tin người dùng
    else {
        try {
            user = {
                account: await AccountModel.findById(req.signedCookies._id),
                info: await UserModel.findOne({
                    account: req.signedCookies._id,
                }),
            }
            res.locals.user = user
        } catch {
            res.redirect('/')
            return
        }
        next()
        return
    }
}
