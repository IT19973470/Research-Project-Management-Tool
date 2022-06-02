const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoSupervisorTopic = new Schema({
    _id: {
        type: String,
        required: [true, 'ID field is required']
    },
    name: {
        type: String
    },
    interests: {
        type: Array
    }
});

const cosupervisorTopic = mongoose.model('CoSupervisorTopic', CoSupervisorTopic);
module.exports = cosupervisorTopic;
