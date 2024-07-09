const express = require("express");
const app = express();
const urls = require("./data/urls-data")

app.use(express.json());

app.get('/urls', (req, res) => {
    res.json({ data: urls });
})
app.get('/urls/:urlId', (req, res) => {
    const { urlId } = req.params;
    const foundUrl = urls.find(url => url.id === Number(urlId));

    res.json({ data: foundUrl })
})

// TODO: Add code to meet the requirements and make the tests pass.

module.exports = app;
