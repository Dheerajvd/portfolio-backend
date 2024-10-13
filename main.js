const express = require("express");
const path = require("path");
const app = express();
const errorHandler = require("./src/middlewares/error-handler");
const { connectDb } = require("./src/config/db.config");
const cors = require("cors");
const configurationVariables = require('./src/config/env.config');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'api_key', 'api_password']
}));

// db connection
connectDb();

// data parser
app.use(express.json());

// handlers
app.use(errorHandler);

// Routes
app.use("/api/landing", require("./src/routes/landing.routes"));
app.use("/api/skills", require("./src/routes/skills.routes"));
app.use("/api/common", require("./src/routes/common.routes"));

const PORT = configurationVariables.PORT || 3000;
app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
});
