

let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        sparse:true
    },
    firstName: {
        type: String,
        default: '',
        sparse:true,
    },
    lastName:  {type:String,sparse:true},
    password: {
        type: String,
        required: true
    }

});
let userModel = new mongoose.model('User', schema);
module.exports = userModel;