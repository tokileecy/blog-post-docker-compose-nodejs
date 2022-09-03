FROM node:16 AS builder

COPY --chown=node:node . /srv/app

WORKDIR /srv/app

RUN yarn --silent 

RUN export REACT_APP_BUILD_HASH=$(date | sha1sum | cut -c1-8) \
  && mkdir -p /usr/src/ \
  && echo "export REACT_APP_BUILD_HASH=\"$REACT_APP_BUILD_HASH\"" > /usr/src/app_build_hash

RUN . /usr/src/app_build_hash \
  && yarn build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app_build_hash /usr/src/app_build_hash
COPY --from=builder /srv/app/build /usr/share/nginx/html
COPY docker/generate-backend-url.sh /docker-entrypoint.d/generate-backend-url.sh