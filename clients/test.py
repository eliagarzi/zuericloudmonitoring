import json
import os
import requests
import time

url = "http://127.0.0.1:3000/api/status?apikey=508262b7-c962-41f5-9aca-85a41e45f930"
services = ["nextcloud", "mysql", "apache"] #Name der exakten Services

jsonFull = {
    "identifier": "nextcloud",
}

while True:
    json = {}

    for x in services:
        status = 1 #os.system("systemctl is-active --quiet" + x)
        if status == 0:
            json[x] = 0
        else:
            json[x] = 1   

    jsonFull["services"] = json
    
    try:
        x = requests.post(url, json = jsonFull)
    except:
        print("API ist nicht erreichbar")

    time.sleep(5)