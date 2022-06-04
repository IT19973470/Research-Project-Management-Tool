const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'ID field is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    userType: {
        type: String
    }
});

const user = mongoose.model('User', UserSchema);
module.exports = user;
