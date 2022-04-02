# requests

from datetime import datetime
from urllib import response
import requests
import json
import os

#Url
url = "http://api.googlecloud.com:3000/api/status"

#Aktuelle Zeit
time = datetime.now()

command = "systemctl is-active --quiet mysql-server"
reponse = os.system(command)

jsondata = {
    "identifier": "nextcloud",
    "time": time.strftime("%H:%M:%S"),
    "services": {
        "mysql": response,
        "php": 1,
        "apache": 1
    }
}

requests.post(url, jsondata)