const Controller = require('../../core/controller')
const ProductCategoryModel = require('../../models/productCategory.model')
class ProductCategoryController extends Controller {
    constructor() {
        super()
    }

    store = async (req, res) => {
        try {
            const categoryname = req.body.categoryname
            await ProductCategoryModel.insertMany({
                name: categoryname,
                status: 1,
            })
            res.send({ code: 200, message: 'lưu thành công' })
        } catch (error) {
            res.send({
                code: 502,
                message: 'lưu thất bại vì lỗi: ' + error.message,
            })
        }
    }

    edit = async (req, res) => {
        try {
            console.log(req.params.id + req.body.categoryname)
            const categoryname = req.body.categoryname
            await ProductCategoryModel.findByIdAndUpdate(req.params.id, {
                $set: { name: categoryname },
            })

            res.send({ code: 200, message: 'lưu thành công' })
        } catch (error) {
            res.send({
                code: 502,
                message: 'lưu thất bại vì lỗi: ' + error.message,
            })
        }
    }
    delete = async (req, res) => {
        try {
            await ProductCategoryModel.findByIdAndUpdate(req.params.id, {
                $set: { status: 0 },
            })
            res.send({ code: 200, message: 'lưu thành công' })
        } catch (error) {
            res.send({
                code: 502,
                message: 'lưu thất bại vì lỗi: ' + error.message,
            })
        }
    }
}
module.exports = new ProductCategoryController()
