FROM node:18.14.2-alpine

WORKDIR /app

# By installing dependencies first, we can cache them in separate Docker layers.
# Dependencies are changed less often than source code, so this will speed up builds.
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
COPY ./deployment/docker/entrypoint.sh .

RUN yarn build

ENV PORT=3002
EXPOSE 3002

HEALTHCHECK CMD curl --fail http://0.0.0.0:3002 || exit 1

# Accept build arguments for build metadata and Set build metadata as environment variables.
# It's useful when we need to determine which version of the app is running.
ARG BUILD_BRANCH
ARG BUILD_REV
ARG BUILD_TIME

ENV BUILD_BRANCH=${BUILD_BRANCH}
ENV BUILD_REV=${BUILD_REV}
ENV BUILD_TIME=${BUILD_TIME}

ENTRYPOINT ["./entrypoint.sh"]
