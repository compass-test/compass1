FROM node:12-alpine3.14 as base
RUN apk add dumb-init

FROM base as prod
WORKDIR /app
COPY ./dist /app
ENTRYPOINT ["/usr/bin/dumb-init", "--", "/usr/local/bin/node"]
CMD ["server/index.js"]

FROM base as dev
RUN yarn global add nodemon bunyan
COPY ./docker/dev/start-dev-server.sh /usr/local/scripts/start-dev-server.sh
RUN chmod +x /usr/local/scripts/start-dev-server.sh
ENTRYPOINT ["/usr/bin/dumb-init", "--", "/usr/local/scripts/start-dev-server.sh"]

