const mongoose = require("mongoose");

const skillsSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"]
        },
        title: {
            type: String,
            required: [true, "Please enter title"]
        },
        imagePath: {
            type: String,
            required: [true, "Please enter imagePath"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Skills", skillsSchema);
