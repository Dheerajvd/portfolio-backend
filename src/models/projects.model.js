const mongoose = require("mongoose");

const projectDescriptionSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    }
});

const projectSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    relatedTo: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    techStack: {
        type: [String],
        required: true
    },
    descriptions: {
        type: [projectDescriptionSchema],
        required: true
    },
    projLink: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Projects", projectSchema);
