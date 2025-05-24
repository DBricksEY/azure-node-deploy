const express = require("express");
const https = require("https");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // Serves index.html from /public

// 🔹 Route: Handle form submission
app.post("/submit", (req, res) => {
  const userId = req.body.userId;
  const apiUrl = `http://localhost:${PORT}/mock-api/user?id=${userId}`;

  https.get(apiUrl, (apiRes) => {
    ...
    });

    apiRes.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        console.log("Received from mock API:", parsed);
        res.json({ message: "Data received successfully", data: parsed });
      } catch (err) {
        console.error("Failed to parse response:", err);
        res.status(500).json({ error: "Failed to parse API response" });
      }
    });
  }).on("error", (err) => {
    console.error("API request failed:", err.message);
    res.status(500).json({ error: "API request failed" });
  });
});

// 🔹 Simulated external API endpoint
app.get("/mock-api/user", (req, res) => {
  const userId = req.query.id;

  const data = {
    userId: userId,
    name: "Jane Doe",
    age: 30,
    status: "verified"
  };

  res.json(data);
});

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
