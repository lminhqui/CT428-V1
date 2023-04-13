const Controller = require('../../core/controller')
const ProductModel = require('../../models/product.model')
const ProductCategoryModel = require('../../models/productCategory.model')
const ProductProvierderModel = require('../../models/productProvider.model')
class productController extends Controller {
    constructor() {
        super()
    }
    index = async (req, res) => {
        const productProvider = await ProductProvierderModel.find({
            status: 1,
        })
        let page = 0
        if (req.query.page) page = parseInt(req.query.page)
        let name = req.query.name
        let searchqueryfinal = {
            name: new RegExp(name),

            status: { $ne: 0 },
        }
        let searchquery = { name: name }

        if (req.query.category) {
            searchqueryfinal.category = req.query.category
            searchquery.category = req.query.category
        }
        if (req.query.provider) {
            searchqueryfinal.provider = req.query.provider
            searchquery.provider = req.query.provider
        }
        if (req.query.price) {
            searchquery.price = parseInt(req.query.price)
        }
        let queryString = ''
        for (let i in searchquery) {
            const element = searchquery[i]
            if (i) queryString += '&' + i + '=' + element
        }
        let product
        let productCategory = await ProductCategoryModel.find({ status: 1 })
        if (req.query.price)
            product = await ProductModel.find(searchqueryfinal).sort({
                price: searchquery.price,
            })
        else product = await ProductModel.find(searchqueryfinal)
        // product = product.filter((value, index, arr) => {
        //     return (value.price >= price[0]) & (value.price <= price[1])
        // })
        product = product.filter((value, index, arr) => {
            return (index >= page * 12) & (index < (page + 1) * 12)
        })
        console.log(productCategory)
        res.render('shop/product', {
            user: res.locals.user,
            productProvider: productProvider,
            productCategory: productCategory,
            page: page,
            queryString: queryString,
            product: product,
        })
    }
    show = async (req, res) => {
        let product = await ProductModel.findById(req.query.id)
            .populate('category')
            .populate('provider')
        res.render('shop/productdetail', { product: product })
    }
    findOne = async (req, res) => {
        let id = req.query.id
        let product = await ProductModel.findById(id)
        res.send(product)
    }
}
module.exports = new productController()
