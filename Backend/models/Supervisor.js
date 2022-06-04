const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupervisorSchema = new Schema({
    _id:{
        type: String,
        required: [true, 'ID is required']
    },
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    address:{
        type:String,
        required: [true, 'Address is required']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    interests: {
        type: Array
    },
    markedSuper: {
        type: Number
    },
    markedCoSuper: {
        type: Number
    }

});

const supervisor = mongoose.model('Supervisor', SupervisorSchema);
module.exports = supervisor;

