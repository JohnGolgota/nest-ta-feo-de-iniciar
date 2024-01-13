FROM node:18-alpine3.16

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY tsconfig*.json /app

COPY src /app/src

RUN npm run build && \
    npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start"]