import json
import os
import requests
import time

url = "http://zuericloud.ddns.net/api/status?apikey=508262b7-c962-41f5-9aca-85a41e45f930"
services = ["firewalld", "nginx", "wg-quick@wg0"] #Name der exakten Services

jsonFull = {
    "identifier": "reverseproxy",
}

while True:
    json = {}

    for x in services:
        status = os.system("systemctl is-active --quiet " + x)
        if status == 0:
            json[x] = 1
        else:
            json[x] = 0   

    jsonFull["services"] = json
    
    try:
        x = requests.post(url, json = jsonFull)
    except:
        print("API ist nicht erreichbar")

    time.sleep(5)