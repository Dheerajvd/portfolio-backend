const express = require("express");
const validateToken = require("../middlewares/token-handler");
const keyManager = require("../middlewares/key-handler");
const { handleGetProjects, handleCreateProject, updateProjectDetails, handleGetProjectById } = require("../controllers/projects.controller");
const router = express.Router();

//methods
router.get("/getProjects", keyManager, validateToken, handleGetProjects);
router.get("/getProject/:id", keyManager, validateToken, handleGetProjectById);
router.post("/createProject", keyManager, validateToken, handleCreateProject);
router.put("/updateProject/:id", keyManager, validateToken, updateProjectDetails);

module.exports = router;
