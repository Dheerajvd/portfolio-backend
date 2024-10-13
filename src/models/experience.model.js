const mongoose = require("mongoose");

const jobDescriptionSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    }
});

const jobSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    startYear: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobCompany: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    jobDescription: {
        type: [jobDescriptionSchema],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
