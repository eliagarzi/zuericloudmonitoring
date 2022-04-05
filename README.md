# zuericloudmonitoring

Für das Modul habe ich eine kleine Website programmiert. Diese ist sowohl die Startseite für die Züricloud AG, beinhaltet aber auch eine Status Website.

## Technologien

- Node.js (Runtime für Serverseitige Ausführung von JavaScript)
- JavaScript
- Express.js (Backend-Framework für JavaScript)

## Sicherheit

- Da das Frontend und die API nicht vom selben Server stammen, arbeitet die API mit CORS.

- Um die Clients zu authentisieren, werden einfache API-Keys, die per Querystring mitgegeben werden, genutzt

- Die API und das Frontend nutzen HTTPS

## Aufbau

API: (link), als Serverless Container auf Google Cloud.
Frontend: (link), wird per NGINX an die Clients ausgeliefert.
