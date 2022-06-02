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
    phone: String,

});
let userModel = new mongoose.model('Admin', schema);
module.exports = userModel;