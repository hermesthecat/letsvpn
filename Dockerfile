FROM pihole/pihole:latest

# Add user
#ARG APP_USER=abc
#RUN groupadd -r ${APP_USER} && useradd --no-log-init -r -g ${APP_USER} ${APP_USER}

WORKDIR /app
ENV PYTHONUNBUFFERED=1 TERM=xterm
EXPOSE 8080
EXPOSE 8081

ADD api/requirements.txt /app/

RUN set -ex \
    && BUILD_DEPS=" \
        build-essential \
        gcc \
        python3-dev \
        libsasl2-dev \
        libldap2-dev \
        libpq-dev \
        libssl-dev \
        libffi-dev \
        python3 \
        python3-pip \
        python3-wheel \
        python3-setuptools \
    " \
    && RUN_DEPS=" \
        postgresql-client \
        nginx \
        python3 \
        python3-pip \
        wireguard \
        gunicorn \
    " \
    && apt-get update && apt-get install -y $BUILD_DEPS \
    && pip3 install --no-cache-dir --default-timeout=100000 -r /app/requirements.txt \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false  $BUILD_DEPS \
    && apt-get update && apt-get install -y --no-install-recommends $RUN_DEPS \
    && rm -rf /var/lib/apt/lists/*

# Set uWSGI settings
ENV PYTHONPATH=$PYTHONPATH:/app/api:/app
ENV UWSGI_WSGI_FILE=/app/api/api/wsgi.py UWSGI_HTTP=:8000 UWSGI_MASTER=1 UWSGI_HTTP_AUTO_CHUNKED=1 UWSGI_HTTP_KEEPALIVE=1 UWSGI_LAZY_APPS=1 UWSGI_WSGI_ENV_BEHAVIOR=holy PYTHONUNBUFFERED=1 UWSGI_WORKERS=2 UWSGI_THREADS=4
ENV UWSGI_STATIC_EXPIRES_URI="/static/.*\.[a-f0-9]{12,}\.(css|js|png|jpg|jpeg|gif|ico|woff|ttf|otf|svg|scss|map|txt) 315360000"
#ENV DB_PORT=5432 DB_NAME=shittywizard DB_USER=shittywizard DB_HOST=localhost

# Create useful aliases for python
#RUN cd /usr/local/bin \
#	&& ln -s idle3 idle \
#	&& ln -s pydoc3 pydoc \
#	&& ln -s python3 python \
#	&& ln -s python3-config python-config

# Create required folders for nginx
#RUN mkdir -p /var/lib/nginx && chown www-data:www-data /var/lib/nginx

# Copy all files to rootfs
#COPY debian-root/ /

# Copy Django app to work directory
ADD app.tar /app/

# Generate static files for Django
RUN python /app/api/manage.py collectstatic --noinput

