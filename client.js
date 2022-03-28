//Url für die API
let statusAPIURL = "";

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
        console.error(error);
    }
}

function renderStatusInfo(data) {
    
}

//Sobald das Dokument geladen ist, wird der Server nach Informationen angefragt
document.addEventListener("load", () => {
    getStatusInfo() //Asynchrone Funktion gibt einen JavaScript Promise zurück
    .then((response) => response.json()) //Wandelt den Body des HTTP Response in lesbarers JavaScript Objekt um
    .then((data) => renderStatusInfo(data)); //Gibt die Informationen weiter an das Frontend
});
