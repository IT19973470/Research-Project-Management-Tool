const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarkingSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'ID field is required']
    },
    criteria: {
        type: String,
        required: [true, 'Criteria is required']
    },
    marks: {
        type: String,
        required: [true, 'Mark field is required']
    }
});

const Marking = mongoose.model('Marking', MarkingSchema);
module.exports = Marking;
