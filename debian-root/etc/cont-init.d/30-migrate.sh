#!/usr/bin/with-contenv bash

s6-echo "Running migrations..."
exec python api/manage.py migrate

