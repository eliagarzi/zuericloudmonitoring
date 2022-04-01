const express = require("express");
const bodyParser = require("body-parser");
const nodeCache = require("node-cache");
const port = 3000;

const serverCache = new nodeCache();
const server = new Express();

const jsonParser = bodyParser.json();

server.get("/api/status/", jsonParser, (req, res) => {
   nodeCache.get() 
});

server.get("/api/status/all", jsonParser, (req, res) => {
    
});

server.post("/api/status/", jsonParser,(req, res) => {
    let sender = req.body.sender;
    let status = req.body.status;

    nodeCache.set(sender,status);
});

server.listen(port, (error) => {
    if(error) {
        console.error(error)
    } else {
        console.log(`Node.js Server gestartet auf Port: ${port}`)
    }
})