const express = require("express");
const validateToken = require("../middlewares/token-handler");
const keyManager = require("../middlewares/key-handler");
const { handleGetExperiencess, handleCreateExperience, updateExperienceDetails } = require("../controllers/experience.controller");
const router = express.Router();

//methods
router.get("/getExperiences", keyManager, validateToken, handleGetExperiencess);
router.post("/createExperience", keyManager, validateToken, handleCreateExperience);
router.put("/updateExperience/:id", keyManager, validateToken, updateExperienceDetails);

module.exports = router;
