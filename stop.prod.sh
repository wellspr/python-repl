#!/bin/bash

docker compose -f compose.prod.yaml down
docker system prune -f