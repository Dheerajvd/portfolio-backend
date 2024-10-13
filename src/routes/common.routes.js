const express = require("express");
const keyManager = require("../middlewares/key-handler");
const { handleGetKeys } = require("../controllers/common.controller");
const router = express.Router();

//methods
router.post("/getKeys", keyManager, handleGetKeys);

module.exports = router;
