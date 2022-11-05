#!/bin/bash

docker-compose exec keycloak /opt/keycloak/bin/kc.sh export --realm autoflow --file /tmp/autoflow-realm.json

docker-compose cp keycloak:/tmp/autoflow-realm.json autoflow-realm.json
