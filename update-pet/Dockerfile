FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY app.js .
COPY swagger.js .
COPY config ./config
COPY controllers ./controllers
COPY services ./services
COPY middlewares ./middlewares
COPY models ./models
COPY routes ./routes

EXPOSE 3002

CMD ["node", "app.js"]
