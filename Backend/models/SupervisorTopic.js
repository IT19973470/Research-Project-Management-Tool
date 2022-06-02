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
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    interests: {
        type: Array
    },
    address:{
        type:String
    }
});

const supervisorTopic = mongoose.model('SupervisorTopic', SupervisorTopic);
module.exports = supervisorTopic;
