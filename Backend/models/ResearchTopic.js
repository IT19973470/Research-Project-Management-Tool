const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResearchTopicSchema = new Schema({
    groupId: {
        type: String
    },
    topic: {
        type: String
    },
    accepted: {
        type: Boolean
    },
    registered: {
        type: Boolean
    }
});

const researchTopic = mongoose.model('ResearchTopic', ResearchTopicSchema);
module.exports = researchTopic;
