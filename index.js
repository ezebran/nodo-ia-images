const path = require("path");
const express = require("express");
const donEnv = require("dotenv").config();
const port = process.env.PORT || 8000;

const app = express();

// Body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openaiRoutes"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
