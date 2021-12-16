#!/usr/bin/with-contenv bash

s6-echo "Running migrations..."
exec sleep 5
#exec python api/manage.py migrate || exit 1
