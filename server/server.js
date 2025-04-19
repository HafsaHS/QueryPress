const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Proxy endpoint to fetch articles
app.get("/api/articles", async (req, res) => {
  try {
    const nyTimesApiKey = process.env.NY_TIMES_API_KEY;
    const response = await axios.get(
      `https://api.nytimes.com/svc/archive/v1/2025/4.json?api-key=${nyTimesApiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
