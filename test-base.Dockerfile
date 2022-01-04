FROM pihole/pihole

ADD files/wireguard.list /etc/apt/sources.list.d/

# Add user
#ARG APP_USER=abc
#RUN groupadd -r ${APP_USER} && useradd --no-log-init -r -g ${APP_USER} ${APP_USER}

WORKDIR /app
ENV PYTHONUNBUFFERED=1 TERM=xterm
EXPOSE 8080

ADD api/requirements.txt /app/

# Install apt and pip packages
RUN set -ex \
    && BUILD_DEPS=" \
        build-essential \
        gcc \
        python3-dev \
        libsasl2-dev libldap2-dev libssl-dev \
        libpq-dev \
        libffi-dev \
        python3 python3-pip python3-wheel python3-setuptools \
        zlib1g-dev libjpeg-dev libpng-dev \
    " \
    && RUN_DEPS=" \
        postgresql-client \
        nginx \
        libsasl2-dev libldap2-dev libssl-dev python3-dev \
        python3 python3-pip python3-setuptools python3-wheel python3-ldap \
        wireguard \
        gunicorn3 \
        curl \
        zlib1g-dev libjpeg-dev libpng-dev \
    " \
    && apt-get update && apt-get install -y $BUILD_DEPS \
    && pip3 install --no-cache-dir --default-timeout=100000 -r /app/requirements.txt \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false  $BUILD_DEPS \
    && apt-get update && apt-get install -y --no-install-recommends $RUN_DEPS \
    && rm -rf /var/lib/apt/lists/*

# Create useful aliases for python stuff
RUN cd /usr/bin \
	&& ln -s pydoc3 pydoc \
	&& ln -s python3 python

	#&& ln -s pip3 pip \
#    && ln -s gunicorn3 gunicorn

# Copy config files for nginx and s6
COPY debian-root/ /

# Fix permissions for nginx
RUN mkdir -p /var/lib/nginx && chown www-data:www-data /var/lib/nginx

