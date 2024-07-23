const express = require("express");
const app = express();
const urls = require("./data/urls-data")
const uses = require("./data/uses-data")

app.use(express.json());

let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);

// /urls
app.post("/urls", (req, res, next) => {
    const { data } = req.body;
    if (!data || !data.href) {
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
app.put("/urls", (req, res, next) => {
  
return res.status(405).json({ error: `PUT` });

});
app.delete("/urls", (req, res, next) => {
  
  return res.status(405).json({ error: `DELETE` });
    
});
app.get('/urls', (req, res) => {
    res.json({ data: urls });
})
  
// /urls/:urlId
app.get('/urls/:urlId', (req, res) => {
  const { urlId } = req.params;
  const foundUrl = urls.find(url => url.id === Number(urlId));

  if (foundUrl) {
    const useRecord = {
      id: uses.length + 1, // Or use another logic to generate unique IDs
      urlId: Number(urlId),
      time: Date.now(),
    };
    uses.push(useRecord);
    
    res.json({ data: foundUrl });
  } else {
    return res.status(404).json({ error: `URL with ID ${urlId} not found` });
  }
});
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
app.post("/urls/:urlId", (req, res, next) => {
  
  return res.status(405).json({ error: `POST` });
  
});
app.delete("/urls/:urlId", (req, res, next) => {
    
  return res.status(405).json({ error: `DELETE` });
      
});


// /urls/:urlId/uses - working on this:
app.get('/urls/:urlId/uses', (req, res) => {
    const { urlId } = req.params;
    const foundUse = uses.find(use => use.urlId === Number(urlId));

    if (foundUse) {
      res.json({ data: [foundUse] });
  } else {
      return res.status(404).json({ error: `URL with ID ${urlId} not found` });
  }
})
app.put('/urls/:urlId/uses', (req, res, next) => {
  
  return res.status(405).json({ error: `PUT` });
});
app.post('/urls/:urlId/uses', (req, res, next) => {
  
  return res.status(405).json({ error: `POST` });
});
app.delete('/urls/:urlId/uses', (req, res, next) => {
    
  return res.status(405).json({ error: `DELETE` });   
});

// /urls/:urlId/uses/:useId
app.get('/urls/:urlId/uses/:useId', (req, res) => {
  const { urlId, useId } = req.params;
  const foundUrl = urls.find(url => url.id === Number(urlId));
  const foundUse = uses.find(use => use.id === Number(useId) && use.urlId === Number(urlId)); // Ensure the use belongs to the URL

  if (!foundUrl) {
      return res.status(404).json({ error: `URL with ID ${urlId} not found` });
  }

  if (foundUse) {
      return res.json({ data: foundUse });
  } else {
      return res.status(404).json({ error: `Use with ID ${useId} not found` });
  }
});
app.put('/urls/:urlId/uses/:useId', (req, res, next) => {
  
  return res.status(405).json({ error: `PUT` });
});
app.post('/urls/:urlId/uses/:useId', (req, res, next) => {
  
  return res.status(405).json({ error: `POST` });
});
app.delete('/urls/:urlId/uses/:useId', (req, res, next) => {
    
  return res.status(204).json({ error: `DELETE` });   
});


// /uses
app.post('/uses', (req, res, next) => {
  
  return res.status(405).json({ error: `POST` });
});
app.get('/uses', (req, res) => {
  res.json({ data: uses });
})
app.put('/uses', (req, res, next) => {
  return res.status(405).json({ error: `PUT` });
});
app.delete('/uses', (req, res, next) => {
  return res.status(405).json({ error: `DELETE` });   
});

// /uses/:useId
app.post('/uses/:useId', (req, res, next) => {
  return res.status(405).json({ error: `POST` });
});
app.get('/uses/:useId', (req, res) => {
  const { useId } = req.params;
  const foundUse = uses.find(use => use.id === Number(useId));

  res.json({ data: foundUse });
})
app.put('/uses/:useId', (req, res, next) => {
  return res.status(405).json({ error: `PUT` });
});
app.delete('/uses/:useId', (req, res, next) => {
  const { useId } = req.params;
  const foundUse = uses.find(use => use.id === Number(useId));

  if (foundUse) {
    return res.status(204).json({ error: `DELETE` });
} else {
    return res.status(404).json({ error: `DELETE` });   
}
});

// non-existent URL
app.use((req, res) => {
  res.status(404).json({ error: `URL '${req.originalUrl}' not found` });
});

module.exports = app;