const Controller = require('../../core/controller')
const ProductModel = require('../../models/product.model')
const ProductCategoryModel = require('../../models/productCategory.model')
const ProductProviderModel = require('../../models/productProvider.model')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'ddl3d69rg',
    api_key: '945817266175385',
    api_secret: 'nO3QKJxR1JOn4ekiAbSS-SctK3k',
    secure: true,
})
class ProductController extends Controller {
    constructor() {
        super()
    }
    show = async (req, res) => {
        const product_category = await ProductCategoryModel.find({ status: 1 })
        const products = await ProductModel.find({ status: { $ne: 0 } })
            .sort({ add_at: -1 })
            .populate({ path: 'provider', model: 'ProductProvider' })
            .populate({ path: 'category', model: 'ProductCategory' })
            .limit(30)

            .exec()

        res.render('admin/product', {
            product_category: product_category,
            products: products,
        })
    }
    create = async (req, res) => {
        const product_category = await ProductCategoryModel.find({ status: 1 })
        const product_provider = await ProductProviderModel.find({ status: 1 })

        res.render('admin/add_product', {
            product_category: product_category,
            product_provider: product_provider,
            ref: req.originalUrl,
        })
    }

    store = async (req, res) => {
        let name = req.body.name
        let status = req.body.status
        let provider = req.body.provider
        let category = req.body.category
        let price = req.body.price
        let description = req.body.description
        let img = []
        console.log(req.body.description)
        try {
            const imageFile = [].concat(req.files.img)
            const paths = imageFile.map((item) => {
                return item.path
            })
            console.log(paths)
            await Promise.all(
                paths.map(async (element) => {
                    await cloudinary.uploader
                        .upload(element)
                        .then(function (image) {
                            console.log(
                                '** file uploaded to Cloudinary service'
                            )
                            img.push(image.url)
                        })
                })
            )

            console.log(img)
            await ProductModel.insertMany({
                name: name,
                status: status,
                provider: provider,
                category: category,
                price: price,
                img: img,
                description: description,
            }).catch((err) => {
                res.json({
                    code: 403,
                    message: 'lưu thất bại vì lỗi: ' + err.message,
                })
            })
            res.redirect('/admin/product')
        } catch (ex) {
            res.json({
                code: 403,
                message: 'lưu thất bại vì lỗi: ' + ex.message,
            })
        }
    }
    edit = async (req, res) => {
        const product_category = await ProductCategoryModel.find({ status: 1 })
        const product_provider = await ProductProviderModel.find({ status: 1 })
        const product_id = req.query.id
        const product = await ProductModel.findById(product_id)
            .populate({ path: 'provider', model: 'ProductProvider' })
            .populate({ path: 'category', model: 'ProductCategory' })
            .exec()
        res.render('admin/editProduct', {
            product_category: product_category,
            product_provider: product_provider,
            ref: req.originalUrl,
            product: product,
        })
    }
    update = async (req, res) => {
        let id = req.query.id
        let name = req.body.name
        let status = req.body.status
        let provider = req.body.provider
        let category = req.body.category
        let price = req.body.price
        let description = req.body.description
        let upanh = req.body.upanh
        let img = []
        console.log(req.body.description)
        try {
            if (upanh) {
                const imageFile = [].concat(req.files.img)
                const paths = imageFile.map((item) => {
                    return item.path
                })
                console.log(paths)
                await Promise.all(
                    paths.map(async (element) => {
                        await cloudinary.uploader
                            .upload(element)
                            .then(function (image) {
                                console.log(
                                    '** file uploaded to Cloudinary service'
                                )
                                img.push(image.url)
                            })
                    })
                )
                await ProductModel.findByIdAndUpdate(id, {
                    $set: {
                        name: name,
                        status: status,
                        provider: provider,
                        category: category,
                        price: price,
                        img: img,
                        description: description,
                    },
                }).catch((err) => {
                    res.json({
                        code: 403,
                        message: 'lưu thất bại vì lỗi: ' + err.message,
                    })
                })
                res.redirect('/admin/product')
            } else {
                await ProductModel.findByIdAndUpdate(id, {
                    $set: {
                        name: name,
                        status: status,
                        provider: provider,
                        category: category,
                        price: price,
                        description: description,
                    },
                }).catch((err) => {
                    res.json({
                        code: 403,
                        message: 'lưu thất bại vì lỗi: ' + err.message,
                    })
                })
                res.redirect('/admin/product')
            }
        } catch (error) {
            res.json({
                code: 403,
                message: 'lưu thất bại vì lỗi: ' + error.message,
            })
        }
    }
    detele = async (req, res) => {
        let id = req.query.id
        await ProductModel.findByIdAndUpdate(id, { $set: { status: 0 } })
        res.json({
            code: 200,
            message: 'Lưu thành công: ',
        })
        try {
        } catch (error) {
            res.json({
                code: 403,
                message: 'lưu thất bại vì lỗi ' + error.message,
            })
        }
    }
}

module.exports = new ProductController()
