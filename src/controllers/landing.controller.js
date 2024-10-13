const asyncHandler = require("express-async-handler");
const Landing = require("../models/landing.model");

// @desc: Get Landing Page Details
// @endpoint: api/landing/getDetails
// @method: GET
// @access: Private
const handleGetLanding = asyncHandler(async (req, res) => {
    const username = req.user.username;
    if (req.accessGranted !== 'read' && req.accessGranted !== 'write') {
        res.status(200).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
    }
    let landingPageDetails = await Landing.findOne({ username });
    if (landingPageDetails) {
        const landingPage = {
            ui: landingPageDetails.ui,
            links: landingPageDetails.links,
            about: landingPageDetails.about
        };
        res.status(200).json({
            statusCode: 200,
            landingPageDetails: landingPage
        });
    } else {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Landing page does not exist"
        });
    }
});

// @desc: Get Landing Page Details
// @endpoint: api/landing/createLanding
// @method: POST
// @access: Private
// @request-body: {username: dalabanjandheeraj ,ui: {title: "This is a title", role: "Role to display"}, {links: {insta: "", linkedin:"", medium: "", whatsapp: ""}}}
const createLandingPageData = asyncHandler(async (req, res) => {
    const { ui, links, about } = req.body;
    const username = req.user.username
    if (!ui || !links || !about ||!username) {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
    }

    if (req.accessGranted !== 'write') {
        res.status(200).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
    }

    let landingPageDetails = await Landing.findOne({ username });

    if (landingPageDetails) {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Landing page details already found",
            data: { _id: landingPageDetails._id }
        });
    } else {
        const landingDetails = await Landing.create({
            username,
            links,
            about,
            ui
        });

        if (landingDetails) {
            const landingData = {
                username: landingDetails.username,
                ui: landingDetails.ui,
                links: landingDetails.links,
                about: landingDetails.about,
                id: landingDetails._id
            };

            res.status(200).json({
                statusCode: 200,
                landingData
            });
        } else {
            res.status(500).json({
                statusCode: 500,
                statusMessage: "Failed to create landing page details"
            });
        }
    }
});

// @desc: Get Landing Page Details
// @endpoint: api/landing/updateLanding/"id"
// @method: POST
// @access: Private
// @request-body: {username: dalabanjandheeraj ,ui: {title: "This is a title", role: "Role to display"}, {links: {insta: "", linkedin:"", medium: "", whatsapp: ""}}}
const updateLandingPageData = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const { ui, links, about } = req.body;
    const username = req.user.username
    if (!ui || !links || !about ||!username, !id) {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
    }

    if (req.accessGranted !== 'write') {
        res.status(200).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
    }

    let landingPageDetails = await Landing.findById({ _id: id });

    if (landingPageDetails) {
        const updatedLandingPage = await Landing.findByIdAndUpdate({_id: id}, req.body, {
            new: true,
        });
        res.status(200).json({
            statusCode: 200,
            updatedLandingPage,
        });
    } else {
        res.status(200).json({
            statusCode: 200,
            statusMessage: "No Item Found",
        });
    }
});

module.exports = {
    handleGetLanding,
    createLandingPageData,
    updateLandingPageData
};
