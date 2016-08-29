#!/bin/bash

docker rm -f slackist-database
docker run -d -v /data --name="slackist-database" -t slackist-database
