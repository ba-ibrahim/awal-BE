const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    field_name: {
        type: String,
        required: true
    },
    sub_field_name: {
        type: String,
        required: true
    },
    years: {
        type: [Number],
        required: true
    }
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
