const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupersSchema = new Schema({
    name: {
        type: String
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

const chatGroup = mongoose.model('Supers', SupersSchema);
module.exports = chatGroup;
