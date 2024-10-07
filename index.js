const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views"); // Make sure to create a 'views' folder

app.get('/', (req, res) => {
    res.render('index', { result: null });  // Pass result as null initially
});


// Select the model

const prompt = "Write is express.";

app.post("/generate", async (req, res) => {
  const userprompt = req.body.prompt;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  try {
    const result = await model.generateContent(userprompt);
    const aiResponse = result.response.text();
    res.render("index", { result: aiResponse });
  } catch (err) {
    console.error("Error generating content:", error);
    res.render("index", { result: "Error generating content" });
  }
});

app.listen(3000);
