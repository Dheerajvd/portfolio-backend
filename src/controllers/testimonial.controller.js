const asyncHandler = require("express-async-handler");
const Testimonial = require("../models/testimonials.model");

// @desc: Get Skills Details
// @endpoint: api/landing/getDetails
// @method: GET
// @access: Private
const handleGetTestimonials = asyncHandler(async (req, res) => {
    const username = req.user.username;
    if (req.accessGranted !== 'read' && req.accessGranted !== 'write') {
        res.status(200).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
        return;
    }
    let testimonialDetails = await Testimonial.find({username}) 
    if (testimonialDetails.length) {        
        res.status(200).json({
            statusCode: 200,
            testimonials: testimonialDetails
        });
        return;
    } else {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Could not find testimonials for you"
        });
        return;
    }
});

// @desc: Create Testimonial
// @endpoint: api/skills/createSkills
// @method: POST
// @access: Private
// @request-body: {title: "skill name", "imagePath"}
const handleCreateTestimonials = asyncHandler(async (req, res) => {
    const { text, author, role } = req.body;
    const username = req.user.username
    if (!text || !author || !role || !username) {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
        return;
    }

    if (req.accessGranted !== 'write') {
        res.status(200).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
        return;
    }

    let isTestimonialExists = await Testimonial.findOne({ text });

    if (isTestimonialExists) {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Testimonial already found",
            data: { _id: isTestimonialExists._id }
        });
        return;
    } else {
        const testimonialData = await Testimonial.create({
            username, text, author, role
        });

        if (testimonialData) {
            const testimonial = {
                text: testimonialData.text,
                author: testimonialData.author,
                role: testimonialData.role,
                id: testimonialData._id
            };

            res.status(200).json({
                statusCode: 200,
                testimonial
            });
            return;
        } else {
            res.status(500).json({
                statusCode: 500,
                statusMessage: "Failed to create landing page details"
            });
            return;
        }
    }
});

// @desc: Get Landing Page Details
// @endpoint: api/landing/updateLanding/"id"
// @method: POST
// @access: Private
// @request-body: {title: "skill name", "imagePath"}
const updateTestimonialDetails = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const { text, author, role } = req.body;
    const username = req.user.username
    if (!text || !author || !role || !username) {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
        return;
    }

    if (req.accessGranted !== 'write') {
        res.status(200).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
        return;
    }

    let isTestimonialExists = await Testimonial.findById({ _id: id });

    if (isTestimonialExists) {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        res.status(200).json({
            statusCode: 200,
            updatedTestimonial,
        });
        return;
    } else {
        res.status(200).json({
            statusCode: 200,
            statusMessage: "No Item Found",
        });
        return;
    }
});

module.exports = {
    handleCreateTestimonials,
    handleGetTestimonials,
    updateTestimonialDetails
};
