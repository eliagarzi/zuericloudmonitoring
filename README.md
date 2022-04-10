# Monitoring Dashboard für das Modul 239

Monitoring API zum abrufen des Status der verschiedenen Services der Züri Cloud AG.

## Technologien

- Node.js (Runtime für Serverseitige Ausführung von JavaScript)
- JavaScript
- Express.js (Backend-Framework für JavaScript)

## Sicherheit

- Um die Clients zu authentisieren, werden einfache API-Keys, die per Querystring mitgegeben werden, genutzt

## Aufbau & Arbeiten mit der API

API: Als Container auf der Google Cloud
Frontend: Ebenfalls als Container auf der Google Cloud

Authentifizierung: ?apikey=key

Alle Services abrufen: /api/status/all

Bestimmten Service abrufen: /api/status/SERVICENAME

Daten senden: /api/status
