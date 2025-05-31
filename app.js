const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// 🔹 Replace with call to Azure Function endpoint
app.post("/submit", async (req, res) => {
  const userId = req.body.userId;

  try {
    const response = await axios.post(
       "https://id-processor-func.azurewebsites.net/api/EnqueueID",
      { userId: userId },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ message: "User ID enqueued", functionResponse: response.data });
  } catch (error) {
    console.error("Azure Function call failed:", error.message);
    res.status(500).json({ error: "Failed to enqueue user ID" });
  }
});

app.listen(PORT, () => {
  console.log(`Web app running on port ${PORT}`);
});
