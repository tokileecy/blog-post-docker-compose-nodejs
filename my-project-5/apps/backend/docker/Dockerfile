FROM node:16 AS builder

COPY --chown=node:node . /srv/app

WORKDIR /srv/app

RUN yarn --silent 

RUN yarn prisma generate && \ 
  yarn build

RUN yarn --silent --production

FROM node:16-buster-slim

RUN apt-get update \
  && apt-get -y install openssl \
  && rm -rf /var/cache/apt/lists

COPY --from=builder --chown=node:node /srv/app/dist /srv/app/dist
COPY --from=builder --chown=node:node /srv/app/package.json /srv/app/package.json
COPY --from=builder --chown=node:node /srv/app/yarn.lock /srv/app/yarn.lock
COPY --from=builder --chown=node:node /srv/app/prisma /srv/app/prisma
COPY --from=builder --chown=node:node /srv/app/node_modules /srv/app/node_modules

ENV NODE_ENV=production

WORKDIR /srv/app

CMD yarn prisma migrate deploy && yarn start