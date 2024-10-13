const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const configurationVariables = require('../config/env.config')

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, configurationVariables.JWT_SECRET_KEY, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    statusCode: 401,
                    statusMessage: "Token entered may have expired"
                });
            }
            req.user = decoded ? decoded.user : {};
            next();
        });
    }

    if (!token) {
        res.status(401).json({
            statusCode: 401,
            statusMessage: "Token is missing"
        });
    }
});

module.exports = validateToken;
