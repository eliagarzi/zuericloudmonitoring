import json
import os
import requests
import time

# URL an die die Daten per HTTP Post gesendet werden
url = "http://zuericloud.ddns.net/api/status?apikey=508262b7-c962-41f5-9aca-85a41e45f930"
#Array mit Namen der exakten Services auf dem Server
services = ["httpd", "php-fpm", "mysql"] 


jsonFull = {
    "identifier": "nextcloud",
}

#Solange die Bedingung True = True ist (also immer)
while True:
    # Leeres Objekt definieren
    json = {}

    # Für jeden Service x der im Array Services definiert wurde
    for x in services:
        # Für den aktuellen Service x wird geschaut ob dieser erreichbar ist
        status = os.system("systemctl is-active --quiet " + x)
        # Anschliessend wird der Status in das oben definierte Objekt geschrieben
        if status == 0:
            json[x] = 1
        else:
            json[x] = 0   

    jsonFull["services"] = json
    
    # Sobald die alle Services über die for-Schleife durchgearbeitet wurden, wird versucht, die Daten an die API zu senden durch einen HTTP Post
    try:
        x = requests.post(url, json = jsonFull)
    except:
        print("API ist nicht erreichbar")

    # Das Script wartet 5 Sekunden bevor es den Status aller Dienste wieder prüft
    time.sleep(5)