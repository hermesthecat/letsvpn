#!/bin/bash

cleanup ()
{
    kill -s SIGTERM $!
    echo "SIGTERM activated.  Exiting application..."
    exit 0
}

trap cleanup SIGINT SIGTERM SIGQUIT

while true; do
    # Check if NO_CLIENT is not set
    if [[ -z "${NO_CLIENT}" ]]; then
        # Run bot normally
        if ! pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t 2
        then
            echo "Cannot connect to database... retrying in 5 seconds"
            sleep 5 & wait $!
        else
            echo 'Starting app...'
            cd /app || exit;
            python api/manage.py migrate || exit;
            nginx;
            #python -m discordbot & wait $!
            gunicorn -b 0.0.0.0
        fi;
    else
        # Sleep indefinitely
        sleep 15 & wait $!
    fi;
done


