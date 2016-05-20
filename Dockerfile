FROM mhart/alpine-node:4.4.4
MAINTAINER Ross Hendry "rhendry@googlemail.com"

ADD . /opt/apps/previews-service
WORKDIR /opt/apps/previews-service

RUN npm install --production && npm cache clean
EXPOSE 8100
CMD ["npm", "start"]
