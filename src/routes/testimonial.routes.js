const express = require("express");
const validateToken = require("../middlewares/token-handler");
const keyManager = require("../middlewares/key-handler");
const { handleGetTestimonials, handleCreateTestimonials, updateTestimonialDetails } = require("../controllers/testimonial.controller");
const router = express.Router();

//methods
router.get("/getTestimonials", keyManager, validateToken, handleGetTestimonials);
router.post("/createTestimonial", keyManager, validateToken, handleCreateTestimonials);
router.put("/updateTestimonial/:id", keyManager, validateToken, updateTestimonialDetails);

module.exports = router;
