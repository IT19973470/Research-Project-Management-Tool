const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentEvaluationSchema = new Schema({
    _evaluationId:{
        type: String
    },
    groupId: {
        type: String
    },
    documentMark:{
        type: Number
    },
    documentFeedback: {
        type: String
    }


});

const documentationMark = mongoose.model('DocumentEvaluationSchema', DocumentEvaluationSchema);
module.exports = documentationMark;
