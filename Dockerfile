FROM node:18-alpine3.16

WORKDIR /app

COPY . /app

RUN npm ci

RUN npm run build && \
    npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start"]