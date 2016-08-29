#!/bin/bash

$(cd ./app/ && npm run build)
cp -R ./app/static/* ./_build/
