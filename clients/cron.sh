#!/usr/bin/env bash

# Name des Services, wird gebraucht um die Daten einem Service zuzuordnen
identifier=nextcloud

# Name der exakten Services ("mysql" "php" "apache")
services=("")

#apiserver Hostname des Server
apiserver = node.googlecloud.com

# API-Url
apiurl = "http://$apiserver:3000/api/all"



for i in "${services[@]}"; do
    systemctl is-active --quiet $i || curl -X POST $apiurl -H "Content-Type: application/json" -d '{"name": "test", "services": {"mysql":"running"}}
done


