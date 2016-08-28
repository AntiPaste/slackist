#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

DIR="$(dirname "$(readlink -f "$0")")"
NAME="$1"

cp -R "${DIR}/app/components/_Base" "${DIR}/app/components/${NAME}"
rename "Base" "${NAME}" "${DIR}/app/components/${NAME}/Base."*
sed -i "s/Base/${NAME}/g" "${DIR}/app/components/${NAME}/"*

echo "@import './components/${NAME}/${NAME}.scss';" >> "${DIR}/app/app.scss"
