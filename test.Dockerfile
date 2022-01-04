FROM cr.cclloyd.com/cclloyd/letsvpn:test-base

ENV PYTHONPATH "${PYTHONPATH}:/app/api"
ENV WEB_PORT=3000
# Copy Django app to work directory
ADD app.tar /app/

# Generate static files for Django
RUN python /app/api/manage.py collectstatic --noinput

