FROM python:3.7-slim

# Add user
ARG APP_USER=abc
RUN groupadd -r ${APP_USER} && useradd --no-log-init -r -g ${APP_USER} ${APP_USER}

WORKDIR /app
ENV PYTHONUNBUFFERED=1
EXPOSE 80
EXPOSE 8080

ADD api/requirements.txt /app/

RUN set -ex \
    && BUILD_DEPS=" \
        gcc \
        python3-dev \
        libsasl2-dev \
        libldap2-dev \
        libssl-dev \
    " \
    && RUN_DEPS=" \
        postgresql-client \
        nginx \
        dumb-init \
    " \
    && apt-get update && apt-get install -y $BUILD_DEPS \
    && pip install --no-cache-dir --default-timeout=100000 -r /app/requirements.txt \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false  $BUILD_DEPS \
    && apt-get update && apt-get install -y --no-install-recommends $RUN_DEPS \
    && rm -rf /var/lib/apt/lists/*

# Set uWSGI settings
ENV UWSGI_WSGI_FILE=/app/api/api/wsgi.py UWSGI_HTTP=:8000 UWSGI_MASTER=1 UWSGI_HTTP_AUTO_CHUNKED=1 UWSGI_HTTP_KEEPALIVE=1 UWSGI_LAZY_APPS=1 UWSGI_WSGI_ENV_BEHAVIOR=holy PYTHONUNBUFFERED=1 UWSGI_WORKERS=2 UWSGI_THREADS=4
ENV UWSGI_STATIC_EXPIRES_URI="/static/.*\.[a-f0-9]{12,}\.(css|js|png|jpg|jpeg|gif|ico|woff|ttf|otf|svg|scss|map|txt) 315360000"
ENV PYTHONPATH=$PYTHONPATH:/app/api:/app
ENV DB_PORT=5432 DB_NAME=shittywizard DB_USER=shittywizard DB_HOST=localhost

ADD files/nginx.conf /etc/nginx/nginx.conf

# Set entrypoint
ADD files/entrypoint.sh /
RUN chmod 755 /entrypoint.sh
ENTRYPOINT ["dumb-init", "--", "/entrypoint.sh"]

#COPY api discordbot helpers http /app/
ADD app.tar /app/

RUN python /app/api/manage.py collectstatic --noinput

