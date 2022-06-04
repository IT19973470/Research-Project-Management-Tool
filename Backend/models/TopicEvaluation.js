const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicEvaluationSchema = new Schema({
    _evaluationId:{
        type: String
    },
    groupId: {
        type: String
    },
    suggestions:{
        type: String
    },
    topicFeedback: {
        type: String
    }


});

const topicEvaluationSchema = mongoose.model('TopicEvaluation', TopicEvaluationSchema);
module.exports = topicEvaluationSchema;
