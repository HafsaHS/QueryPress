const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = 3000;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello from the server!</h1>");
});
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

app.post("/api/articles", async (req, res) => {
  try {
    const articleData = req.body;

    const { data, error } = await supabase
      .from("articles")
      .insert(articleData); // wrap in array if inserting one object

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Error inserting article:", error.message);
    res.status(500).json({ error: "Failed to insert article" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
