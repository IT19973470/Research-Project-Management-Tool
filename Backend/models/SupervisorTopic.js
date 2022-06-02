const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupervisorTopic = new Schema({
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

const supervisorTopic = mongoose.model('SupervisorTopic', SupervisorTopic);
module.exports = supervisorTopic;
