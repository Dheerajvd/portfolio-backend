const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const configurationVariables = require('../config/env.config')

// @desc: Get Landing Page Details
// @endpoint: api/common/getKeys
// @method: GET
// @access: Private
const handleGetKeys = asyncHandler(async (req, res) => {
    const { username } = req.body;
    if (req.accessGranted !== 'read' && req.accessGranted !== 'write') {
        res.status(200).json({
            statusCode: 401,
            statusMessage: "You do not have enough permissions"
        });
    }

    const user = {
        username
    }
    let auth_token = jwt.sign(
        { user: user },
        configurationVariables.JWT_SECRET_KEY,
        { expiresIn: '30m' }
    );
    if (auth_token) {
        res.status(200).json({
            statusCode: 200,
            authToken: auth_token
        });
    } else {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Failed to create token"
        });
    }
});

module.exports = {
    handleGetKeys
}