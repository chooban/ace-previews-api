FROM node:0.12.7
MAINTAINER Ross Hendry "rhendry@googlemail.com"

ENV APP_KEY foo
ENV API_KEY bar

ADD . /opt/apps/previews-server
WORKDIR /opt/apps/previews-server

RUN npm install
EXPOSE 8100
CMD npm start
