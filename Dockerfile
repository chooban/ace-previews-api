FROM mhart/alpine-node:6.1.0
MAINTAINER Ross Hendry "rhendry@googlemail.com"

ARG env=production
ENV NODE_ENV=${env}

ADD . /opt/apps/previews-service
WORKDIR /opt/apps/previews-service

RUN npm install && npm cache clean
EXPOSE 8100
CMD ["npm", "start"]
