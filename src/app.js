const express = require("express");
const app = express();
const urls = require("./data/urls-data")
const uses = require("./data/uses-data")

app.use(express.json());

// app.post("/urls", (req, res, next) => {
//     const { data: { href } = {} } = req.body;
//     if (text) {
//       const newUrl = {
//         id: ++lastUrlId, // Increment last ID, then assign as the current ID
//         href,
//       };
//       pastes.push(newUrl);
//       res.status(201).json({ data: newUrl });
//     } else {
//       res.sendStatus(400);
//     }
//   });
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
    const foundUse = uses.find(use => use.id === Number(urlId));

    console.log({ data: foundUse })
    // res.json({ data: foundUse })
})
// app.get('urls/:urlId/uses/:useId', (req, res) => {

// })



// TODO: Add code to meet the requirements and make the tests pass.

module.exports = app;
