#!/bin/bash

scripts="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ `$scripts/modtime.sh package.json` -gt `$scripts/modtime.sh node_modules` ]; then
    (yarn --no-progress && npm rebuild puppeteer node-sass && touch node_modules) || (touch package.json; exit 1)
else
    echo "node_modules is already up to date."
fi
