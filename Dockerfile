FROM mhart/alpine-node:4.4.4
MAINTAINER Ross Hendry "rhendry@googlemail.com"

ADD . /opt/apps/previews-server
WORKDIR /opt/apps/previews-server

RUN npm install
EXPOSE 8100
CMD ["npm", "start"]
