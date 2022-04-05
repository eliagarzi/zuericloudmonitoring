const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const nodeCache = require("node-cache");

const server = new express();
const port = 3000;

const PROD = false;

const serverCache = new nodeCache();

server.use(express.json())    

server.use(cors({
    origin: 'http://frontendweb.com'
  }));

//Speichert die Schlüssel die als Query Parameter mitgegeben werden, genutzt zur authentisierung.
let apiKeyBase = [
    "84da98d5-5e2b-4e62-a6fc-195eca0eb16d",
    "b4cd1279-6e99-440a-be5d-b24085dd4cf1",
    "508262b7-c962-41f5-9aca-85a41e45f930",
]

let services = [
    "nextcloud",
    "reverseproxy",
    "mailserver"
]

let mailserver =  {
    identifier: "mailserver",
    services: {
        "SMTP": 1,
        "IMAP": 0,
    }
}

let nextcloud =  {
    identifier: "nextcloud",
    services: {
        "SMTP": 1,
        "IMAP": 0,
    }
}

serverCache.set("nextcloud", nextcloud)
serverCache.set("mailserver", mailserver)

server.get("/api/status/all", (req, res) => {

    if(req.query.apikey != undefined) {
        if(apiKeyBase.includes(req.query.apikey)) {
                const send = []
                for(element in services) {
                    send.push(serverCache.get(services[element]))
                }   
                res.json(send);
        } else {
            res.sendStatus(404)
        }
    } else {
        res.sendStatus(404)
    }
});

server.post("/api/status/", (req, res) => {
    if(req.query.apikey != undefined) {
        if(apiKeyBase.includes(req.query.apikey)) {
            if(req.body != undefined && req.body != null) {


                serverCache.set(data.identifier, data);
                console.log(serverCache.get(data.identifier));
                res.sendStatus(200)
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }
    } else {
        res.sendStatus(404)
    }
});

server.listen(port, (error) => {
        if(error) {
            console.error(error)
        } else {
            console.log(`Node.js Server gestartet auf Port: ${port}`)
        }
    })

// https.createServer(server).listen(port, (error) => {
//         if(error) {
//             console.error(error)
//         } else {
//             console.log(`Node.js Server gestartet auf Port: ${port}`)
//         }
//     })
