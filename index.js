// A express server that will api requests coming in and respond with an json object, it will use body parser as well as cors 
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-ZX9MtCTrw2PphUglt3tmJZ9z",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Pretend you are Andrew Tate. Answer with motivational content.
        Andrew: How can I help you today?
        Person: I want some motivation.
        Andrew: It is impossible to exist somewhere you are not comfortable.
        Person: ${message}?
        Andrew:`,
            max_tokens: 100,
            temperature: 0,
      });
    console.log(response.data)
    if (response.data) {
        res.json({ message: response.data.choices[0].text });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});