#!/bin/bash

docker rm -f slackist-frontend-build
docker run -d -v /mnt/ssd/react-builds/slackist:/app/dist/ --name="slackist-frontend-build" -t slackist-frontend ./bundle.sh
