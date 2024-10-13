const asyncHandler = require("express-async-handler");
const Project = require("../models/projects.model");
const configurationVariables = require("../config/env.config")

// @desc: Get Project Details
// @endpoint: api/projects/getDetails
// @method: GET
// @access: Private
const handleGetProjects = asyncHandler(async (req, res) => {
    const username = req.user.username;
    if (req.accessGranted !== 'read' && req.accessGranted !== 'write') {
        return res.status(401).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
    }
    
    const projectDetails = await Project.find({ username });
    if (projectDetails.length) {
        let projectsResp = []
        projectDetails.forEach((proj) => {
            console.log("🚀 ~ projectDetails.forEach ~ proj:", proj)
            const project = {
                id: proj._id,
                title: proj.title,
                description: proj.description,
                category: proj.category,
                descriptions: proj.descriptions,
                techStack: proj.techStack,
                relatedTo: proj.relatedTo,
                projLink: proj.projLink,
                imagePath: `${configurationVariables.BACKEND_HOST_URL}file/${proj.imagePath}`
            };

            projectsResp.push(project);
        })
        
        res.status(200).json({
            statusCode: 200,
            projects: projectsResp
        });
    } else {
        return res.status(404).json({
            statusCode: 404,
            statusMessage: "No projects found for this user"
        });
    }
});

// @desc: Create Project
// @endpoint: api/projects/create
// @method: POST
// @access: Private
const handleCreateProject = asyncHandler(async (req, res) => {
    const { title, description, imgSrc, category, descriptions, techStack, relatedTo ,projLink } = req.body;
    const username = req.user.username;
    if (!title || !description || !imgSrc || !category || !descriptions || !techStack || !relatedTo ||!projLink || !username) {
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

    const projectDescriptionObjects = descriptions.map(desc => ({ desc }));

    const projectData = await Project.create({
        username,
        title,
        description,
        imagePath: imgSrc,
        category,
        descriptions: projectDescriptionObjects,
        techStack,
        relatedTo,
        projLink
    });

    if (projectData) {
        const project = {
            username: projectData.username,
            title: projectData.title,
            description: projectData.description,
            imagePath: projectData.imagePath,
            category: projectData.category,
            descriptions: projectData.descriptions,
            techStack: projectData.techStack,
            relatedTo: projectData.relatedTo,
            projLink: projectData.projLink,
            id: projectData._id
        };

        return res.status(200).json({
            statusCode: 200,
            project
        });
    } else {
        return res.status(500).json({
            statusCode: 500,
            statusMessage: "Failed to create project"
        });
    }
});

// @desc: Update Project Details
// @endpoint: api/projects/update/:id
// @method: POST
// @access: Private
const updateProjectDetails = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { title, description, imgSrc, category, descriptions, techStack, projLink, relatedTo } = req.body;
    const username = req.user.username;

    if (!title || !description || !imgSrc || !category || !descriptions || !techStack || !relatedTo || !projLink || !username || !id) {
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

    let isProjectExisting = await Project.findById(id);

    if (isProjectExisting) {
        const projectDescriptionObjects = descriptions.map(desc => ({ desc }));

        const updatedData = {
            title,
            description,
            imagePath: imgSrc,
            category,
            descriptions: projectDescriptionObjects,
            techStack,
            relatedTo,
            projLink
        };

        // Update the project document
        const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json({
            statusCode: 200,
            updatedProject
        });
    } else {
        return res.status(404).json({
            statusCode: 404,
            statusMessage: "No project found with the given ID"
        });
    }
});

module.exports = {
    handleGetProjects,
    handleCreateProject,
    updateProjectDetails
};
