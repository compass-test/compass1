FROM node:12-slim as base
RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install --no-install-recommends -y dumb-init &&\
    apt-get clean &&\
    rm -rf /var/lib/apt/lists/*
FROM base as prod
WORKDIR /app
COPY ./dist /app

EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["/usr/bin/dumb-init", "--", "/usr/local/bin/node"]
CMD ["server/index.js"]
