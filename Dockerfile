FROM node:0.12.7
MAINTAINER Ross Hendry "rhendry@googlemail.com"

ENV KEYS_FILE /etc/previews-server/parseKeys.json
ADD . /opt/apps/previews-server
WORKDIR /opt/apps/previews-server
RUN npm install
EXPOSE 8100
CMD npm start
