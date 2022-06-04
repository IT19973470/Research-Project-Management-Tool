const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatGroupSchema = new Schema({
    groupId: {
        type: String
    },
    supervisorId: {
        type: String
    },
    message: {
        type: String
    },
    messagedBy: {
        type: String
    },
    messageSent: {
        type: String
    }
});

const chatGroup = mongoose.model('ChatGroup', ChatGroupSchema);
module.exports = chatGroup;
