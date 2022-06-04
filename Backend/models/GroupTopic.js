const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupTopicSchema = new Schema({
    groupId: {
        type: String
    },
    topic: {
        type: String
    },
    topicAccepted: {
        type: Number
    },
    topicRegistered: {
        type: Boolean
    },
    topicDescription: {
        type: String
    },
    topicAdded: {
        type: String
    }
});

const groupTopic = mongoose.model('GroupTopic', GroupTopicSchema);
module.exports = groupTopic;
