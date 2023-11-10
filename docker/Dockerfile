FROM node:20.8.1-slim

WORKDIR /app
RUN apt-get update  && apt-get install -y openssl
RUN npm install pm2@5.3.0 -g

COPY package.json package-lock.json ./

RUN npm install



COPY . .

RUN npm run build


EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]