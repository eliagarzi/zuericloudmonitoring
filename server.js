const express = require("express");
const bodyParser = require("body-parser");
const nodeCache = require("node-cache");
const port = 3000;

const serverCache = new nodeCache();
const server = new Express();

const jsonParser = bodyParser.json();

server.get("/api/status/all", (req, res) => {
    
    if(serverCache.get("current"))
    
    serverCache.get("")
});

//Reverse Proxy
//Mail-Container
//Nextcloud-Container

server.post("/api/status/all", (req, res) => {
    
});

server.listen(port, (error) => {
    if(error) {
        console.error(error)
    } else {
        console.log(`Node.js Server gestartet auf Port: ${port}`)
    }
})