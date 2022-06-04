const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    _id:{
        type: String,
        required: [true, 'ID is required']
    },
    type:{
       type: String,
       required: [true, "Type is required"]
    },
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    designation:{
        type:String,
        required: [true, 'Designation is required']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    }

});

const staff = mongoose.model('Staff', StaffSchema);
module.exports = staff;

