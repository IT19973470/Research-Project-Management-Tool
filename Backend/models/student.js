const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'Phone is required']
    }
});
const student = mongoose.model('Student', studentSchema);
module.exports = student;
