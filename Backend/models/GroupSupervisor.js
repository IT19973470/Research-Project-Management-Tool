const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSupervisorSchema = new Schema({
    groupId: {
        type: String,
        required: [true, 'ID field is required']
    },
    supervisor: {
        type: String
    },
    coSupervisor: {
        type: String
    }
});

const groupSupervisor = mongoose.model('GroupSupervisor', GroupSupervisorSchema);
module.exports = groupSupervisor;
