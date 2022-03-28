//Url für die API
let statusAPIURL = "http://127.0.0.1/api/status/all";

//Mit diesem Objekt können die Services bestimmt werden, die dargestellt werden
let services = {
    nextcloud: {
        identifier: "nextcloud",
        name: "Nextcloud",
        services: [
            "Nextcloud",
            "MySql",
            "Apache2",
            "PHP"
        ]
    },
    reverseproxy: {
        identifier: "reverseproxy",
        name: "NGINX Reverse Proxy",
        services: [
            "nginx"
        ]
    },
    mailserver: {
        identifier: "mailserver",
        name: "Postfix Mailserver",
        services: [
            "SMTP",
            "IMAP"
        ]
    }
}

const apiErrorElement = document.querySelector(".api-error");

function displayAPIError(error) {
    apiErrorElement.childNodes[0].textContent = `Fehler mit API-Verbindung ${error}`;
}

async function getStatusInfo(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        //Catch fängt nur Fehler auf, die unterhalb Layer 7 liegen. 
        //Für HTTP 400 und 500 Codes muss dies mit response.ok (http code = 200-299) geprüft werden
        if (!response.ok) {
            throw new Error
        } else {
            return response;
        }
    } catch (error) {
        displayAPIError(error)
        console.error(error);
    }
}

//Diese Funktionen stellt die JSON Daten im HTML dar. 
function renderStatusInfo(statusData) {

    //So sollen die übermittelnden JSON Daten strukturiert sein
    // let statusData = {
    //     identifier: nextcloud,
    //     services: {
    //         "Nextcloud": true,
    //         "MySql": true,
    //         "Apache2": true,
    //         "PHP": true
    //     }
    // }

    const allServiceStatusElements = document.querySelectorAll(".service-status__element");

    for(let i = 0; i < allServiceStatusElements.length; i++) {
        if (allServiceStatusElements[i].classList.contains(`service-status__element--${statusData.identifier}`)) {
            statusData.services.forEach(element => {
                let newTableRow = document.createElement("tr");
                let newTableData = document.createElement("td");
                newTableData.textContent = statusData.services[element];
                newTableRow.appendChild(newTableData);
                const elementStatusTable = document.querySelector(`service-status__element--body-table--${statusData.identifier}`);
                elementStatusTable.appendChild(newTableRow);
            })
           break
        }
    }
}

const body = document.querySelector("body");

function renderDOMHTML(serviceidentifier, headertext, services) {
    
    let serviceStatusDOMElement = document.createElement("div");
    serviceStatusDOMElement.classList.add(`service-status__element service-status__element--${serviceidentifier}`);

    let serviceStatusDOMElementHeader = document.createElement("div");
    serviceStatusDOMElementHeader.classList.add("service-status__element--header");
    
    let serviceStatusDOMElementHeaderH = document.createComment("H2");
    serviceStatusDOMElementHeaderH.classList.add("service-status__element--header-text");
    serviceStatusDOMElementHeaderH.textContent = headertext;
    serviceStatusDOMElementHeader.appendChild(serviceStatusDOMElementHeaderH);

    let serviceStatusDOMElementBody = document.createElement("div");
    serviceStatusDOMElementBody.classList.add("service-status__element--body");
    let serviceStatusDOMElementBodyTable = document.createElement("table");
    serviceStatusDOMElementBodyTable.classList.add(`service-status__element--body-table service-status__element--body-table--${serviceidentifier}`);
    serviceStatusDOMElementBody.appendChild(serviceStatusDOMElementBodyTable);

    //Generiert Tabelle beim laden der Website
    services.forEach(element => {
        let newTableRow = document.createElement("tr");
        let newTableData = document.createElement("td");
        newTableData.textContent = services[element];
        newTableRow.appendChild(newTableData);
        serviceStatusDOMElementBodyTable.appendChild(newTableRow);
    })
    
    serviceStatusDOMElement.appendChild(serviceStatusDOMElementHeader);
    serviceStatusDOMElement.appendChild(serviceStatusDOMElementBody);

    body.appendChild(serviceStatusDOMElement);
}

//Sobald das Dokument geladen ist, wird der Server nach Informationen angefragt
document.addEventListener("load", () => {

    //Die Seite wird dynamisch nach dem "services" Objekt generiert
    for(element in services) {
        renderDOMHTML(services[element].identifier ,services[element].name, services[element].services);
    }

    let interval = setInterval(() => {
        getStatusInfo() //Asynchrone Funktion gibt einen JavaScript Promise zurück
        .then((response) => response.json()) //Wandelt den Body des HTTP Response in lesbarers JavaScript Objekt um
        .then((data) => {
            renderStatusInfo(data)
            console.log("GET Data from Server")
        }); //Gibt die Informationen weiter an das Frontend
    }, 5000);

});
