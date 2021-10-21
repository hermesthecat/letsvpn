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
    && RUN_DEPS=" \
        wireguard \
        curl
    " \
    && apt-get update && apt-get install -y --no-install-recommends $RUN_DEPS \
    && rm -rf /var/lib/apt/lists/*

