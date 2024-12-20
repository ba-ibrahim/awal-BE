

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
    meetTime: {
        type: String,
        required: true
    },
    meetDate: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Meeting = mongoose.model("Meeting", meetingSchema);



module.exports = Meeting;