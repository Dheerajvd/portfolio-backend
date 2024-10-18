const asyncHandler = require("express-async-handler");
const Experience = require("../models/experience.model");

// @desc: Get Skills Details
// @endpoint: api/landing/getDetails
// @method: GET
// @access: Private
const handleGetExperiencess = asyncHandler(async (req, res) => {
    const username = req.user.username;
    if (req.accessGranted !== 'read' && req.accessGranted !== 'write') {
        res.status(200).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
        return;
    }
    let expDetails = await Experience.find({ username }).sort({ createdAt: -1 });
    if (expDetails.length) {
        res.status(200).json({
            statusCode: 200,
            experiences: expDetails
        });
        return;
    } else {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Could not find experiences for you"
        });
        return;
    }
});

// @desc: Create Skill
// @endpoint: api/skills/createSkills
// @method: POST
// @access: Private
// @request-body: {title: "skill name", "imagePath"}
const handleCreateExperience = asyncHandler(async (req, res) => {
    const { startYear, jobTitle, jobLocation, jobCompany, jobDescription } = req.body;
    const username = req.user.username;

    if (!startYear || !jobTitle || !jobLocation || !jobDescription || !jobCompany || !username) {
        return res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request: Missing required fields"
        });
    }

    if (req.accessGranted !== 'write') {
        return res.status(401).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
    }

    let isExpExisting = await Experience.findOne({ jobCompany, jobTitle });
    if (isExpExisting) {
        return res.status(200).json({
            statusCode: 100,
            statusMessage: "Experience already exists",
            data: { id: isExpExisting._id }
        });
    }

    const jobDescriptionObjects = jobDescription.map((desc) => ({
        desc,
    }));

    const expData = await Experience.create({
        username,
        startYear,
        jobTitle,
        jobLocation,
        jobCompany,
        jobDescription: jobDescriptionObjects
    });

    if (expData) {
        const exp = {
            username: expData.username,
            startYear: expData.startYear,
            jobTitle: expData.jobTitle,
            jobLocation: expData.jobLocation,
            jobCompany: expData.jobCompany,
            jobDescription: expData.jobDescription,
            id: expData._id
        };

        return res.status(200).json({
            statusCode: 200,
            experience: exp
        });
    } else {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: "Failed to create experience"
        });
    }
});

// @desc: Get Landing Page Details
// @endpoint: api/landing/updateLanding/"id"
// @method: POST
// @access: Private
// @request-body: {title: "skill name", "imagePath"}
const updateExperienceDetails = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const { startYear, jobTitle, jobLocation, jobCompany, jobDescription } = req.body;
    const username = req.user.username;

    if (!startYear || !jobTitle || !jobLocation || !jobDescription || !jobCompany || !username || !id) {
        return res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request: Missing required fields"
        });
    }

    if (req.accessGranted !== 'write') {
        return res.status(401).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
    }

    let isExpExisting = await Experience.findById(id);

    if (isExpExisting) {
        const jobDescriptionObjects = jobDescription.map((desc) => ({
            desc,
        }));

        const updatedData = {
            startYear,
            jobTitle,
            jobLocation,
            jobCompany,
            jobDescription: jobDescriptionObjects
        };

        // Update the experience document
        const updatedExperience = await Experience.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        return res.status(200).json({
            statusCode: 200,
            updatedExperience
        });
    } else {
        return res.status(404).json({
            statusCode: 404,
            statusMessage: "No experience found with the given id"
        });
    }
});

module.exports = {
    handleGetExperiencess,
    handleCreateExperience,
    updateExperienceDetails
};
