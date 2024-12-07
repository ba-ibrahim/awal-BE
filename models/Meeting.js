

const mongoose = require('mongoose');


const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    zoomId: {
        type: String,
        required: true
    },
    zoomAssisstantId: {
        type: String,
        required: true
    },
    joinUrl: {
        type: String,
        required: true
    },
    meetingTime: {
        type: Date,
        required: true
    },
}, { timestamps: true })


const Meeting = mongoose.model("Meeting", meetingSchema);



module.exports = Meeting;