const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Panel = new Schema({
    _id: {
        type: String,
        required: [true, 'ID field is required']
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    grouplist: {
        type: Array
    },
    stafflist:{
        type: Array
    }

});

const panel = mongoose.model('Panel', Panel);
module.exports = panel;
