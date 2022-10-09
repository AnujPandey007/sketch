const mongoose = require('mongoose');
const userSchema = require('./userModel')

const collaboratorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    color: {
        type: String,
        enum : ['red', 'green', 'blue', 'black', 'yellow'],
        default: 'red',
        required: true
    },
})

const sketchSchema = new mongoose.Schema({
    collaborator: [collaboratorSchema],
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