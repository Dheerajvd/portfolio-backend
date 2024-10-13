const express = require("express");
const keyManager = require("../middlewares/key-handler");
const { handleGetKeys, handleImageUpload, upload, handleServeFile } = require("../controllers/common.controller");
const validateToken = require("../middlewares/token-handler");
const router = express.Router();

//methods
router.post("/getKeys", keyManager, handleGetKeys);
router.post("/uploadImage", keyManager, validateToken, handleImageUpload)
router.get("/file/:fileName", handleServeFile)

module.exports = router;
