FROM node:9
MAINTAINER Karan Kapoor

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app
COPY . /usr/src/app/

CMD [ "pm2", "start", "index.js" ]
EXPOSE 80