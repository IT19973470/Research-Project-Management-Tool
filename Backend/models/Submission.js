const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'ID field is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    details: {
        type: String,
        required: [true, 'Details field is required']
    },
    deadline: {
        type: String,
        required: [true, 'Deadline field is required']
    },
    type: {
        type: String,
        required: [true, 'Type field is required']
    },
    fileName: {
        type: String
    },
    fileNameTemp: {
        type: String
    },
    markedUpload: {
        type: Boolean
    }

});

const Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission;
