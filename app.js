const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // So index.html works

// POST route: /submit
app.post("/submit", async (req, res) => {
  const userId = req.body.userId;

  try {
    // Replace this URL with your real API
    const response = await axios.get(`https://external.api.com/user?id=${userId}`);

    const userData = response.data;
    console.log("Received user data:", userData);

    res.json({
      message: "Data received successfully.",
      data: userData
    });

  } catch (error) {
    console.error("API error:", error.message);
    res.status(500).json({ error: "Failed to retrieve user data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

