const Controller = require('../../core/controller')
const BillModel = require('../../models/bill.model')

const paypalSDK = require('@paypal/checkout-server-sdk')

const ProductModel = require('../../models/product.model')

class CardController extends Controller {
    constructor() {
        super()
        const clientId =
            'ASrRqf_Fhck2YsA2zuSmrAV4neGcDg5KhCKFcQCV8MGG7ge1RHPBqEbBuH9TOAyPbPrfIDdnMDEj8vXm'
        const clientSecret =
            'ELbrDb279YIYtyH8Hkm6lfkTcehvhwcLuway22IpeKgPPc1g1WGCUkj4EU9cwFroct7c6Qq-0jPCuUM4'
        // Tạo env và paypalclient
        this.environment = new paypalSDK.core.SandboxEnvironment(
            clientId,
            clientSecret
        )
        this.paypalclient = new paypalSDK.core.PayPalHttpClient(
            this.environment
        )
    }
    getIndex = async (req, res) => {
        res.render('shop/cart', { user: res.locals.user })
    }
    checkout = async (req, res) => {
        console.log(req.body)
        let value = 0
        let user = res.locals.user
        let items = req.body.items
        let products = []
        for (let index = 0; index < items.length; index++) {
            const element = items[index]
            let product = await ProductModel.findById(element.id)
            value += parseInt(product.price) * parseInt(element.quantity)
            products.push({
                product: product.id,
                quantity: parseInt(element.quantity),
            })
        }

        const bill = (
            await BillModel.insertMany({
                value: value,
                status: 0,
                user: user.info.id,
                products: products,
            })
        )[0]
        console.log(res.locals)
        const successUrl =
            (req.headers['x-forwarded-proto']
                ? req.headers['x-forwarded-proto'] + '://'
                : 'http://') +
            req.headers.host +
            '/cart/success?' +
            bill.id
        const cancleUrl =
            (req.headers['x-forwarded-proto']
                ? req.headers['x-forwarded-proto'] + '://'
                : 'http://') +
            req.headers.host +
            '/cart/cancel?id=' +
            bill.id
        //   tạo request đến paypal
        let request = new paypalSDK.orders.OrdersCreateRequest()
        request.requestBody({
            application_context: {
                return_url: successUrl,
                cancel_url: cancleUrl,
                brand_name: 'KTQ SHOP',
                landing_page: 'BILLING',
                user_action: 'CONTINUE',
            },
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value:
                            '' + Math.round((bill.value / 22700) * 100) / 100,
                    },
                },
            ],
        })

        // thực hiện request và lưu vào biến response
        let response = await this.paypalclient.execute(request).catch((ex) => {
            console.log(ex)
            res.send('xảy ra lỗi')
        })

        console.log(response.result.links)
        // redirect người dùng đến trang thanh toán của paypal
        response.result.links.forEach((item, index) => {
            if (item.rel == 'approve') {
                console.log(item.href)
                res.send({ code: 200, link: item.href })
                return
            }
        })
    }
    success = async (req, res) => {
        const request = new paypalSDK.orders.OrdersCaptureRequest(
            req.query.token
        )
        let bill
        const response = await this.paypalclient
            .execute(request)
            .catch((ex) => {
                res.send('lỗi rồi đại vương ơi')
            })
        if (response.result.status == 'COMPLETED')
            bill = await BillModel.findByIdAndUpdate(req.params.billid, {
                set: { status: 1 },
            })

        res.render('shop/success', {})
    }
    cancel = async (req, res) => {
        let billId = req.query.id
        let bill = await BillModel.findByIdAndDelete(billId)
        res.redirect('/cart')
    }
}
module.exports = new CardController()
