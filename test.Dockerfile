FROM cr.cclloyd.com/cclloyd/letsvpn:test-base

# Copy Django app to work directory
ADD app.tar /app/

# Generate static files for Django
RUN python /app/api/manage.py collectstatic --noinput

