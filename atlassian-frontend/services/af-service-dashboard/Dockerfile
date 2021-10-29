FROM node:12.21.0-slim AS base

ENV NODE_ENV=production

RUN apt-get update && \
  apt-get dist-upgrade -y && \
  apt-get install --no-install-recommends -y dumb-init &&\
  apt-get clean &&\
  rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/service
WORKDIR /opt/service

COPY package*.json ./

RUN npm install --production && rm -rf /home/node/.npm

COPY dist ./

EXPOSE 8080

ENTRYPOINT ["/usr/bin/dumb-init", "--", "/usr/local/bin/node"]
CMD ["server/index.js"]
