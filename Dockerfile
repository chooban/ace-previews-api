FROM mhart/alpine-node:8.9.1
MAINTAINER Ross Hendry "rhendry@googlemail.com"

ARG env=production
ENV NODE_ENV=${env}

ADD . /opt/apps/previews-service
WORKDIR /opt/apps/previews-service

RUN yarn install && yarn cache clean
EXPOSE 8100
CMD ["yarn", "run", "start"]
