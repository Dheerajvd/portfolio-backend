const mongoose = require("mongoose");

const landingSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"]
        },
        ui: {
            title: {
                type: String,
                required: [true, "Please enter a title"]
            },
            role: {
                type: String,
                required: [true, "Please enter a role"]
            }
        },
        links: {
            insta: {
                type: String,
                required: [true, "Please enter Instagram link"]
            },
            medium: {
                type: String,
                required: [true, "Please enter Medium link"]
            },
            linkedin: {
                type: String,
                required: [true, "Please enter LinkedIn link"]
            },
            whatsapp: {
                type: String,
                required: [true, "Please enter WhatsApp link"]
            }
        },
        about: {
            type: String,
            required: [true, "Please enter about"]
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Landing", landingSchema);
