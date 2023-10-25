FROM node:18-alpine

WORKDIR /app

COPY . .

RUN mv ./.env.production ./.env

RUN npm ci

RUN npx prisma generate

RUN npm run build

USER node

CMD npm run start:prod
