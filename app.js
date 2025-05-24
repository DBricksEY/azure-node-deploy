const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // Serve HTML

// 🔹 POST /submit: Call internal API via 127.0.0.1
app.post("/submit", (req, res) => {
  const userId = req.body.userId;
  const apiUrl = `http://127.0.0.1:${PORT}/mock-api/user?id=${userId}`;

  http.get(apiUrl, (apiRes) => {
    let data = "";

    apiRes.on("data", (chunk) => {
      data += chunk;
    });

    apiRes.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        console.log("Received from mock API:", parsed);
        res.json({ message: "Data received successfully", data: parsed });
      } catch (err) {
        console.error("Parse error:", err);
        res.status(500).json({ error: "Failed to parse response" });
      }
    });
  }).on("error", (err) => {
    console.error("API call failed:", err.message);
    res.status(500).json({ error: "API call failed" });
  });
});

// 🔹 GET /mock-api/user: Simulated external API
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
