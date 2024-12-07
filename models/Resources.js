


const mongoose = require('mongoose')


const mongoose = require('mongoose');

const resourcesSchema = new mongoose.Schema({
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
        required: true
    },
    lecture: {
        type: String,
        required: true
    },
    videoResources: [
        {
            title: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
                    },
                    message: props => `${props.value} is not a valid URL`
                }
            }
        }
    ],
    audioResources: [
        {
            title: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
                    },
                    message: props => `${props.value} is not a valid URL`
                }
            }
        }
    ],
    OfficialResources: [
        {
            title: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
                    },
                    message: props => `${props.value} is not a valid URL`
                }
            }
        }
    ],
    documentResources: [
        {
            title: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
                    },
                    message: props => `${props.value} is not a valid URL`
                }
            }
        }
    ]
}, { timestamps: true });

resourcesSchema.index({ field: 1 });

module.exports = mongoose.model('Resource', resourcesSchema);
