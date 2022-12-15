FROM node:16.14

WORKDIR /cy

#Executar apenas para OS Ubuntu/Debian
RUN apt-get update && apt-get install --yes libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

ENV NODE_ENV production


COPY package*.json ./

RUN npm install

COPY . .

RUN npx cypress verify
