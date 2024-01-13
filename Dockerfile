FROM node:18-alpine3.16 as base

ENV DIR /app

WORKDIR $DIR

FROM base as build

RUN apk update && \
    apk add --no-cache dumb-init

COPY package*.json $DIR

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
    npm ci && \
    rm -f .npmrc

COPY tsconfig*.json $DIR

COPY src $DIR/src

RUN npm run build && \
    npm prune --production

FROM base as production

ENV USER node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

COPY --from=build $DIR/node_modules $DIR/node_modules

COPY --from=build $DIR/dist $DIR/dist

ENV NODE_ENV=production

EXPOSE 3000

USER $USER

CMD ["dumb-init", "node", "dist/index.js"]