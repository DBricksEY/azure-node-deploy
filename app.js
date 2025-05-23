const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post("/submit", (req, res) => {
    const userId = req.body.userId;
    res.send(`<h2>Thanks! ID ${userId} received.</h2>`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
