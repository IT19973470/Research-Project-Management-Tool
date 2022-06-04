const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PanelMemberSchema = new Schema({
    _id:{
        type: String,
        required: [true, 'ID is required']
    },
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    designation:{
        type:String,
        required: [true, 'Designation is required']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    }

});

const panelMember = mongoose.model('PanelMember', PanelMemberSchema);
module.exports = panelMember;

