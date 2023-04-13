const mongoose = require('mongoose')
mongoose.connect(
    'mongodb+srv://root:root@qui.ibnzold.mongodb.net/CT428?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    (err) => {
        if (err) {
            console.log(`không thể kết nối Mongodb, lỗi:${err}`)
        } else {
            console.log('kết nối Mongodb thành công')
        }
    }
)
module.exports = mongoose
