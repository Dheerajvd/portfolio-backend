const mongoose = require("mongoose");

const testimonialSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"]
        },
        text: {
            type: String,
            required: [true, "Please enter text"]
        },
        author: {
            type: String,
            required: [true, "Please enter author"]
        },
        role: {
            type: String,
            required: [true, "Please enter role"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Testimonials", testimonialSchema);