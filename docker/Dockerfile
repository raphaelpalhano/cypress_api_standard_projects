FROM node:16.14 as builder

WORKDIR /cy

#Executar apenas para OS Ubuntu/Debian
RUN apt-get update && apt-get install --yes libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

ENV NODE_ENV production

COPY package*.json ./

RUN npm ci

COPY . .

FROM cypress/base:16.13.0

ENV NODE_ENV=production

WORKDIR /cy

COPY --from=builder /cy /cy/

RUN npx cypress install

RUN npx cypress verify
