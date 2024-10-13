const express = require("express");
const validateToken = require("../middlewares/token-handler");
const keyManager = require("../middlewares/key-handler");
const { handleGetSkills, handleCreateSkills, updateSkillDetails } = require("../controllers/skills.controller");
const router = express.Router();

//methods
router.get("/getSkills", keyManager, validateToken, handleGetSkills);
router.post("/createSkill", keyManager, validateToken, handleCreateSkills);
router.put("/updateSkill/:id", keyManager, validateToken, updateSkillDetails);

module.exports = router;
