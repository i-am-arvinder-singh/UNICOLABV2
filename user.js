const mongoose = require('mongoose')
const validator = require('validator')


const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email'
        }

    },
    password: {
        type: String,
        require: true,
        minlength: 5
    },
    phonenumber: {
        type: String,
        default: ""
    },
    organisation: {
        type : String,
        default: ""
    },
    research_exp: {
        type: String,
        default: ""
    },
    publications:{
        type:String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    url:{
        type:String,
        default: ""
    },
    id: {
        type: String,
        default: ""
    },
    designation: {
        type: String
    },
    interest: {
        type: String
    }
})

var User = mongoose.model('User',UserSchema)
module.exports = {User}