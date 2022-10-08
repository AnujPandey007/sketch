const mongoose = require('mongoose');
const userSchema = require('./userModel')

const sketchSchema = new mongoose.Schema({
    collaborator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model("Sketch", sketchSchema);