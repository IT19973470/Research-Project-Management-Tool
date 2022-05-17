const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResearchTopicSchema = new Schema({
    groupId: {
        type: String,
        required: [true, 'ID field is required']
    },
    topic: {
        type: String,
        required: [true, 'Topic is required']
    }
});

const researchTopic = mongoose.model('ResearchTopic', ResearchTopicSchema);
module.exports = researchTopic;
