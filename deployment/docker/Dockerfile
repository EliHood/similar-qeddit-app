FROM node:18.14.2-alpine

WORKDIR /app

COPY ./lerna.json .
COPY ./package.json .
COPY ./yarn.lock .
COPY ./tsconfig.base.json .
COPY ./packages ./packages

RUN yarn
RUN yarn run build

ENV PORT=3002
EXPOSE 3002

RUN apk add --no-cache bash curl

COPY ./deployment/docker/entrypoint.sh .

HEALTHCHECK CMD curl --fail http://0.0.0.0:3002/health || exit 1

# Accept build arguments for build metadata and Set build metadata as environment variables.
# It's useful when we need to determine which version of the app is running.
ARG BUILD_BRANCH
ARG BUILD_REV
ARG BUILD_TIME

ENV BUILD_BRANCH=${BUILD_BRANCH}
ENV BUILD_REV=${BUILD_REV}
ENV BUILD_TIME=${BUILD_TIME}

ENTRYPOINT ["./entrypoint.sh"]
