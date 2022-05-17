const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentGroupSchema = new Schema({
    groupId: {
        type: String
    },
    students: {
        type: Array
    }
});

const studentGroup = mongoose.model('StudentGroup', StudentGroupSchema);
module.exports = studentGroup;
