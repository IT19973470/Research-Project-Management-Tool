const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentGroup = require('../models/StudentGroup');

const PresentationEvaluationSchema = new Schema({
    _evaluationId:{
        type: String
    },
    groupId: {
        type: String
    },
    presentationMark:{
        type: Number
    },
    presentationFeedback: {
        type: String
    }


});

const presentationEvaluationSchema = mongoose.model('PresentationEvaluationSchema', PresentationEvaluationSchema);
module.exports = presentationEvaluationSchema;
