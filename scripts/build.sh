#!/bin/bash
set -e

scripts="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

"$scripts/maybe-yarn.sh"

#################
# Build to dist #
npm run node -- build/build.js

cd dist
cp index.html 404.html
cp -R * ../../imo/public
