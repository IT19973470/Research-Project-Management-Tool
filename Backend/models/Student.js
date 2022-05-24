const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'ID field is required']
    },
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    address: {
        type: String,
        unique: true,
        required: [true, 'Address is required']
    }
});

const student = mongoose.model('Student', StudentSchema);
module.exports = student;
