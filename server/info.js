const Mongoose = require('mongoose')
const db = require('./db')
let infoSchema = new Mongoose.Schema({
    title: {
        type: String
    },
    date:{
        type: String
    }
});
let infoModel = db.model('info', infoSchema)
let infos = {
    saveInfo: obj => {
        let infoItem = new infoModel(obj)
        infoItem.save()
    }
}
module.exports = infos;