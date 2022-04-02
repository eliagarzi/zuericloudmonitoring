const express = require("express");
const bodyParser = require("body-parser");
const nodeCache = require("node-cache");

const server = new express();
const port = 3000;

const serverCache = new nodeCache();

const jsonParser = bodyParser.json();

server.get("/api/status/all", (req, res) => {
    const data = {
        nextcloud: {
            identifier: "nextcloud",
            name: "Nextcloud",
            services: {
                "Nextcloud": 0,
                "MySql": 0,
                "Apache2": 0,
                "PHP": 1
            }    
        },
        reverseproxy: {
            identifier: "reverseproxy",
            name: "NGINX Reverse Proxy",
            services: {
                "nginx": 0,
            }
        },
        mailserver: {
            identifier: "mailserver",
            name: "Postfix Mailserver",
            services: {
                "SMTP": 1,
                "IMAP": 0,
            }
        }
    }

    res.json(data);
});

server.post("/api/status/", jsonParser,(req, res) => {
    let sender = req.body.sender;
    let status = req.body.status;

    serverCache.set(sender,status);
});

server.listen(port, (error) => {
    if(error) {
        console.error(error)
    } else {
        console.log(`Node.js Server gestartet auf Port: ${port}`)
    }
})