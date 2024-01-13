FROM node:18-alpine3.16

RUN apk update && \
    apk add --no-cache dumb-init

ENV DIR /app

WORKDIR $DIR

COPY package*.json $DIR

RUN npm ci

COPY tsconfig*.json $DIR

COPY src $DIR/src

RUN npm run build && \
    npm prune --production

ENV NODE_ENV=production

EXPOSE 3000

CMD ["dumb-init", "node", "dist/index.js"]