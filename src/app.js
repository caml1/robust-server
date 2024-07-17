const express = require("express");
const app = express();
const urls = require("./data/urls-data")
const uses = require("./data/uses-data")

app.use(express.json());

let lastUrlId = urls.reduce((maxId, url) => (Math.max(maxId, url), 0));

app.post("/urls", (req, res, next) => {
    const { data } = req.body;
    if (!data || !data.href) {
      // If href is missing, respond with a 400 status and an error message
      return res.status(400).json({ error: "The 'href' property is required." });
    }
    
    const { href } = data;
    const newUrl = {
      id: ++lastUrlId,
      href,
    };
    
    urls.push(newUrl);
    res.status(201).json({ data: newUrl });
});
  

app.get('/urls/:urlId', (req, res) => {
    const { urlId } = req.params;
    const foundUrl = urls.find(url => url.id === Number(urlId));

    res.json({ data: foundUrl })
})

app.put('/urls/:urlId', (req, res) => {
    const urlId = parseInt(req.params.urlId, 10);
    const { data } = req.body;
    
    if (!data || !data.href) {
      return res.status(400).json({ error: "The 'href' property is required." });
    }
  
    const url = urls.find(url => url.id === urlId);
  
    if (!url) {
      return res.status(404).json({ error: `URL with ID ${urlId} not found` });
    }
  
    // Update the URL's properties
    url.href = data.href;
  
    res.status(200).json({ data: url });
  });

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