const express = require('express');
const app = express();
const path = require("path");
const prompt = require('prompt-sync')();
const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
    apiKey: "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"
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
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `${question}`}]
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