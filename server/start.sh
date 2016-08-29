#!/bin/bash

docker rm -f slackist-server
docker run -d --name="slackist-server" --link slackist-database:database -t slackist-server
