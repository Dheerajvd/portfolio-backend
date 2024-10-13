const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const configurationVariables = require('../config/env.config');
const multer = require("multer");
const path = require("path");
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/public');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|svg/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // Limit file size to 2MB
});

// @desc: Upload Image
// @endpoint: api/common/uploadImage
// @method: POST
// @access: Private
const handleImageUpload = asyncHandler(async (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Multer error handling (e.g., file too large)
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "File too large or Multer error occurred",
                error: err.message
            });
        } else if (err) {
            // Any other error (e.g., invalid file type)
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "An error occurred while uploading the file",
                error: err.message
            });
        }

        // Check if no file is provided or invalid file type
        if (!req.file) {
            return res.status(400).json({
                statusCode: 400,
                statusMessage: "Invalid file type or no file uploaded. Only .jpeg, .jpg, .png, and .svg files are allowed."
            });
        }

        // File uploaded successfully
        return res.status(200).json({
            statusCode: 200,
            statusMessage: "Image uploaded successfully",
            filePath: req.file.path
        });
    });
});

// @desc: Get Landing Page Details
// @endpoint: api/common/getKeys
// @method: GET
// @access: Private
const handleGetKeys = asyncHandler(async (req, res) => {
    const { username } = req.body;
    if (req.accessGranted !== 'read' && req.accessGranted !== 'write') {
        return res.status(200).json({
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
        return res.status(200).json({
            statusCode: 200,
            authToken: auth_token
        });
    } else {
        return res.status(200).json({
            statusCode: 100,
            statusMessage: "Failed to create token"
        });
    }
});

// @desc: Serve File
// @endpoint: api/common/file/:fileName
// @method: GET
// @access: Public
const handleServeFile = asyncHandler(async (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../../uploads/public', fileName);

    fs.stat(filePath, (err, stat) => {
        if (err || !stat.isFile()) {
            return res.status(404).json({
                statusCode: 404,
                statusMessage: "File not found"
            });
        }

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(err.status).end();
                
            }
        });
    });
});

module.exports = {
    handleGetKeys,
    handleImageUpload,
    handleServeFile
}