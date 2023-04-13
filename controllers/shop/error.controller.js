const Controller = require('../../core/controller')
class ErrorController extends Controller {
    constructor() {
        super()
    }
    getError = async (req, res) => {
        res.render('shop/error', {})
    }
}
module.exports = new ErrorController()
