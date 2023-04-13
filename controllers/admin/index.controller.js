const Controller = require('../../core/controller')
const ProductCategoryModel = require('../../models/productCategory.model')
const BillModel = require('../../models/bill.model')

class IndexControllder extends Controller {
    constructor() {
        super()
    }

    getIndex = async (req, res) => {
        let year = new Date(Date.now()).getFullYear()

        let chart_value_input = []
        for (let index = 0; index < 12; index++) {
            chart_value_input[index] = await BillModel.find({
                date: {
                    $gte: new Date(year, index, 1),
                    $lt: new Date(year, index + 1, 1),
                },
            })
        }
        chart_value_input = chart_value_input.map((item) => {
            let sumvalue = 0
            item.forEach((value) => {
                sumvalue += parseInt(value.value)
            })
            return sumvalue
        })

        let chart_count_input = []
        for (let index = 0; index < 12; index++) {
            chart_count_input[index] = await BillModel.find({
                date: {
                    $gte: new Date(year, index, 1),
                    $lt: new Date(year, index + 1, 1),
                },
            })
                .count()
                .exec()
        }
        res.render('admin/index', {
            chart_count_input: JSON.stringify(chart_count_input),
            chart_value_input: JSON.stringify(chart_value_input),
        })
    }
}
module.exports = new IndexControllder()
