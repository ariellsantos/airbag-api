FROM node:20.8.1-slim

WORKDIR /app
RUN apt-get update
RUN npm install pm2@5.3.0 -g

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]