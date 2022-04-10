const express = require("express");
const cors = require("cors");
const nodeCache = require("node-cache");

const server = new express();
const port = process.env.PORT || 8080;

const PROD = false;

//Die Daten die Empfangen werden, werden in einem non-persistent Cache gespeichert. Dieser wird also automatisch gelöscht, wenn der Server beendet wird.
const serverCache = new nodeCache();

//Express Middleware, die den Body des Request Objekt lesbar macht
server.use(express.json(
    {
        origin: "*",
        methods: "POST, GET"
    }
))    


server.use(cors());

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

//Middlewarefunktion die schaut, ob im Querystring ein gültiger Apikey mitgegeben wurde
//Next() gibt den Event an die nächste Middleware Funktion weiter 
function auth(req, res, next) {
    if(req.query.apikey != undefined) {
        if(apiKeyBase.includes(req.query.apikey)) {
            next();
        } else {
            res.sendStatus(403);
        } 
    } else {
        res.sendStatus(400);
    }
}

//Middlewarefunktion, die testet, ob der Body leer ist
//Next() gibt den Event an die nächste Middleware Funktion weiter 
function checkBody(req, res, next) {
    if(req.body != undefined && req.body != {}) {
        next();
    } else {
        res.sendStatus(404);
    }
}

server.post("/api/status", auth, checkBody, (req, res) => {
    if(services.includes(req.body.identifier)) {
        serverCache.set(req.body.identifier, req.body)
        res.sendStatus(200)
    } else {
        res.sendStatus(501);
    }
});

server.get("/api/status/all", auth, checkBody, (req, res) => {
    const send = []
    for(element in services) {
        if(serverCache.get(services[element]) != undefined) {
            send.push(serverCache.get(services[element]))
        } else {
            send.push({"Service": "No Data"})
        }
    }   
    res.json(send);
});

server.get("/api/status/:identifier", auth, (req, res) => {
    let identifier = req.params.identifier;
    if(services.includes(identifier)) {
        if (serverCache.get(identifier) != undefined) {
            res.json(serverCache.get(identifier))
        } else {
            res.sendStatus(404)
        }
    } else {
        res.sendStatus(404)
    }
});

server.post("/api/test", auth, (req, res) => {
    console.log(req.body);
    res.sendStatus(200)
})

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
//})
