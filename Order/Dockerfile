FROM node:10.17-alpine

RUN apk add --no-cache curl
RUN npm install pm2 -g --silent

COPY . /home/node/app
WORKDIR /home/node/app
ADD ./.env.production /home/node/app/.env
RUN npm install --silent

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
