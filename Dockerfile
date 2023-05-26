FROM node:18-alpine

RUN echo "1" && ls

WORKDIR /app

COPY . .

RUN mv ./.env.production ./.env

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

ARG PORT
ENV PORT $PORT

RUN cat .env

RUN npm ci

RUN npx prisma generate

RUN npm run build

RUN cat .env

RUN npm install pm2 -g

USER node

# CMD ["npm", "run", "migrate", "&&", "pm2-runtime", "ecosystem.config.js"]
CMD npm run migrate && pm2-runtime pm2.config.js
