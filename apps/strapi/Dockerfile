FROM node:18-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk add --no-cache libc6-compat

WORKDIR /opt/
COPY ./package.json ./yarn.lock ./

ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn --frozen-lockfile
WORKDIR /opt/app
COPY ./ .
RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]