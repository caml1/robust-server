const express = require("express");
const app = express();
const urls = require("./data/urls-data")
const uses = require("./data/uses-data")

app.use(express.json());

let lastUrlId = urls.reduce((maxId, url) => (Math.max(maxId, url), 0));

app.post("/urls", (req, res, next) => {
    const { href  = {} } = req.body;
    if (href) {
        const newUrl = {
            id: ++lastUrlId, // Increment last ID, then assign as the current ID
            href,
        };
        console.log(newUrl)
      urls.push(newUrl);
      res.status(201).json({ data: newUrl });
      console.log("Hello");
      console.log(res.body);
    } else {
      res.sendStatus(400);
    }
  });

app.get('/urls/:urlId', (req, res) => {
    const { urlId } = req.params;
    const foundUrl = urls.find(url => url.id === Number(urlId));

    res.json({ data: foundUrl })
})
// app.put('/urls/:urlId', (req, res) => {

// })
app.get('/urls', (req, res) => {
    res.json({ data: urls });
})

app.get('/urls/:urlId/uses', (req, res) => {
    const { urlId } = req.params;
    const foundUse = uses.find(use => use.urlId === Number(urlId));

    res.json({ data: [foundUse] });
})

app.get('urls/:urlId/uses/:useId', (req, res) => {
    const { useId } = req.params;
    const foundUse = uses.find(use => use.id === Number(useId));

    res.json({ data: foundUse })
})



// TODO: Add code to meet the requirements and make the tests pass.

module.exports = app;
