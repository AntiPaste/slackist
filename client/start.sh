#!/bin/bash

docker rm -f slackist-frontend-build
docker run -d -v /mnt/ssd/react-builds/slackist:/_build/client/ --name="slackist-frontend-build" -t slackist-frontend ./bundle.sh
