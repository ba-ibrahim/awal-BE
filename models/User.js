const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        ]
    },
    password: {
        type: String,
        required: true
    },
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field'
    },
    year: {
        type: Number,
        required: true
    },
    bookmarks: [{
        item_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        item_type: {
            type: String,
            required: true,
            enum: ['Post', 'Lesson'] // Ensures valid references
        }
    }],
    meetings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meeting'
    }],
    likes: [{
        item_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        item_type: {
            type: String,
            required: true,
            enum: ['Post', 'Lesson'] // Ensures valid references
        }
    }],
    is_admin: {
        type: Boolean,
        default: false
    },
    is_super_student: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
