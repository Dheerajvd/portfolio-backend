const express = require("express");
const validateToken = require("../middlewares/token-handler");
const keyManager = require("../middlewares/key-handler");
const { handleGetLanding, createLandingPageData, updateLandingPageData } = require("../controllers/landing.controller");
const router = express.Router();

//methods
router.get("/getDetails", keyManager, validateToken, handleGetLanding);
router.post("/createLanding", keyManager, validateToken, createLandingPageData);
router.put("/updateLanding/:id", keyManager, validateToken, updateLandingPageData);

module.exports = router;
