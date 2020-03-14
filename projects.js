const mongoose = require('mongoose')
const validator = require('validator')


var DataSchema = new mongoose.Schema({
    id: {
        type:String
    },
    project_id: {
        type: String
    },
    title: {
        type: String
        require: true
    },
    abstract : {
        type: String
        require: true
    }
})

var Data = mongoose.model('Data',DataSchema)
module.exports = {Data}