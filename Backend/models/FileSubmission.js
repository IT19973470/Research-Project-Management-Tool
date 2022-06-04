const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSubmissionSchema = new Schema({
    groupId: {
        type: String,
        required: [true, 'ID field is required']
    },
    submissionId: {
        type: String
    },
    fileName: {
        type: String
    }
});

const fileSubmission = mongoose.model('FileSubmission', FileSubmissionSchema);
module.exports = fileSubmission;
