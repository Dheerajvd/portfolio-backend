const asyncHandler = require("express-async-handler");
const configurationVariables = require('../config/env.config')

const keyManager = asyncHandler(async (req, res, next) => {
    let api_key = req.headers.api_key;
    let api_password = req.headers.api_password;
    if (api_key && api_password) {
        if (api_key !== configurationVariables.API_KEY) {
            return res.status(401).json({
                statusCode: 401,
                statusMessage: "Api key is invalid"
            });
        } else if (api_password === configurationVariables.API_PASSWORD_READ) {
            req.accessGranted = 'read';
            next()
        } else if (api_password === configurationVariables.API_PASSWORD_WRITE) {
            req.accessGranted = 'write';
            next()
        } else {
            return res.status(500).json({
                statusCode: 500,
                statusMessage: "Internal server error"
            });
        }
    }

    if (!api_key || !api_password) {
        return res.status(401).json({
            statusCode: 401,
            statusMessage: "Api key or password is missing"
        });
    }
});

module.exports = keyManager;
