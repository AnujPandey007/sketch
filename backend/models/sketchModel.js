const mongoose = require('mongoose');

const sketchSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    sketchData: {
        type: String,
        required: true
    },
    answerId: {
        type: String,
        default: 0
    },
    isDone:{
        type: Boolean,
        default: false
    },
    sketchTime : { 
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Sketch", sketchSchema);