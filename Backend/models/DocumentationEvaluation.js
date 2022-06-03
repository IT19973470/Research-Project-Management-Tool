const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const StudentGroup = require('../models/StudentGroup');

const DocumentEvaluationSchema = new Schema({
    _evaluationId:{
        type: String
    },
    // studentGroup: {
    //     type: StudentGroup.schema
    // },
    documentationMark:{
        type: Number
    },
    presentationFeedback: {
        type: String
    }


});

const documentationMark = mongoose.model('DocumentEvaluationSchema', DocumentEvaluationSchema);
module.exports = documentationMark;
