const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentGroupSchema = new Schema({
    groupId: {
        type: String
    },
    students: {
        type: Array
    },
    topics: {
        type: Array
    },
    leader: {
        type: String
    },
    supervisor: {
        _id: String,
        accepted: Boolean
    },
    coSupervisor: {
        _id: String,
        accepted: Boolean
    }
});

const studentGroup = mongoose.model('StudentGroup', StudentGroupSchema);
module.exports = studentGroup;
