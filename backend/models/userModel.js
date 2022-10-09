const mongoose = require('mongoose');
const {v4} = require('uuid');

const userSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     default: v4()
    // },
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        lowercase: true,
        required: true
    },
    userPassword:{
        type: String,
        required: true
    },
    userGender:{
        type: String,
        default: ""
    },
    userImage:{
        type: String,
        default: ""
    },
    lastSketchId: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("User", userSchema);