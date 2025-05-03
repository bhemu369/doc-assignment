const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true
    },
    qualifications: {
        type: [String],
        required: true
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    clinic: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    patientCount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    cashback: {
        type: Number,
        default: 0
    },
    availableTime: {
        type: String
    },
    isOnline: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', DoctorSchema); 