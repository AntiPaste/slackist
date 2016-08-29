#!/bin/sh

npm run build
cp -R ./static/* ../_build/client/
