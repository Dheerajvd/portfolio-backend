const asyncHandler = require("express-async-handler");
const Skill = require("../models/skills.model");
const configurationVariables = require('../config/env.config')

// @desc: Get Skills Details
// @endpoint: api/landing/getDetails
// @method: GET
// @access: Private
const handleGetSkills = asyncHandler(async (req, res) => {
    const username = req.user.username;
    if (req.accessGranted !== 'read' && req.accessGranted !== 'write') {
        res.status(200).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
        return;
    }
    let skillsDetails = await Skill.find({username}) 
    if (skillsDetails.length) {
        let skillsResp = []
        skillsDetails.forEach((indSkill) => {
            const skill = {
                id: indSkill._id,
                title: indSkill.title,
                imagePath: `${configurationVariables.BACKEND_HOST_URL}file/skills/${indSkill.imagePath}`
            };

            skillsResp.push(skill);
        })
        
        res.status(200).json({
            statusCode: 200,
            skills: skillsResp
        });
        return;
    } else {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Could not find skills for you"
        });
        return;
    }
});

// @desc: Create Skill
// @endpoint: api/skills/createSkills
// @method: POST
// @access: Private
// @request-body: {title: "skill name", "imagePath"}
const handleCreateSkills = asyncHandler(async (req, res) => {
    const { title, imagePath } = req.body;
    const username = req.user.username
    if (!title || !imagePath || !username) {
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

    let isSkillExisting = await Skill.findOne({ title });

    if (isSkillExisting) {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Skill already found",
            data: { _id: isSkillExisting._id }
        });
        return;
    } else {
        const skillData = await Skill.create({
            username,
            title,
            imagePath
        });

        if (skillData) {
            const skill = {
                username: skillData.username,
                title: skillData.title,
                imagePath: skillData.imagePath,
                id: skillData._id
            };

            res.status(200).json({
                statusCode: 200,
                skill
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
const updateSkillDetails = asyncHandler(async (req, res) => {
    let id = req.params.id;
    const { title, imagePath } = req.body;
    const username = req.user.username
    if (!title || !imagePath || !username, !id) {
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

    let isSkillExisting = await Skill.findById({ _id: id });

    if (isSkillExisting) {
        const updatedSkill = await Skill.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        res.status(200).json({
            statusCode: 200,
            updatedSkill,
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
    handleGetSkills,
    handleCreateSkills,
    updateSkillDetails
};
