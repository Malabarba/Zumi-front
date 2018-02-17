#!/bin/bash -e

[ -z "$1" ] && (echo 'Directory argument needed!'; exit 1)

file="$1"

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)  mod_time=`stat -c %Y $file || echo 1`;;
    Darwin*) mod_time=`stat -f %m $file || echo 1`;;
    *)       echo "Unsupported system! ${unameOut}"; exit 1;;
esac
echo $mod_time
