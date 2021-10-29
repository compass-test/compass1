FROM node:12.22.6-alpine

ARG ARTIFACTORY_USERNAME
ARG ARTIFACTORY_PASSWORD

RUN apk update
RUN apk add --upgrade apk-tools
RUN apk add curl
RUN curl -u "$ARTIFACTORY_USERNAME:$ARTIFACTORY_PASSWORD" https://packages.atlassian.com/api/npm/atlassian-npm/auth/atlassian >> ~/.npmrc

WORKDIR /app
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock
RUN yarn --frozen-lockfile
ADD . /app
RUN yarn run build

EXPOSE 8080
ENV PORT=8080

CMD ["yarn", "start"]
