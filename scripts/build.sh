#!/bin/bash
set -e

scripts="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

"$scripts/maybe-yarn.sh"

#################
# Build to dist #
npm run ng -- build -prod aot=true

cd dist
cp index.html 404.html
cp -R * ../../imo/public
