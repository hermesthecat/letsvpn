FROM pihole/pihole

ADD files/wireguard.list /etc/apt/sources.list.d/

# Add user
ARG APP_USER=abc
RUN groupadd -r ${APP_USER} && useradd --no-log-init -r -g ${APP_USER} ${APP_USER}

WORKDIR /app
ENV PYTHONUNBUFFERED=1 TERM=xterm
EXPOSE 8080

ADD api/requirements.txt /app/

RUN set -ex \
    && RUN_DEPS=" \
        wireguard \
        python3 \
        nginx \
    " \
    && apt-get update && apt-get install -y --no-install-recommends $RUN_DEPS \
    && rm -rf /var/lib/apt/lists/*

RUN cd /usr/local/bin \
	&& ln -s idle3 idle \
	&& ln -s pydoc3 pydoc \
	&& ln -s python3 python \
	&& ln -s python3-config python-config

COPY debian-root/ /

RUN mkdir -p /var/lib/nginx && chown www-data:www-data /var/lib/nginx

