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
    // topics: {
    //     topic: {
    //         type: String
    //     },
    //     topicInterests: {
    //         type: Array
    //     },
    //     topicDescription: {
    //         type: String
    //     },
    //     topicAccepted: {
    //         type: Boolean
    //     },
    //     topicRegistered: {
    //         type: Boolean
    //     }
    // },
    supervisor: {
        type: String
    },
    coSupervisor: {
        type: String
    }
});

const studentGroup = mongoose.model('StudentGroup', StudentGroupSchema);
module.exports = studentGroup;
