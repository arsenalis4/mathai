const express = require('express');
const app = express();
const path = require("path");
const prompt = require('prompt-sync')();
require('dotenv').config();

const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post("/answer", async (req, res) => {
  try {
    const question = req.body.question;
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{role: "user", content: `${question}`}],
      temperature: 0.2
    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].message.content,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});
app.listen(PORT);