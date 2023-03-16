ARG NODE_IMAGE=node:18-alpine

FROM ${NODE_IMAGE} AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=strapi --docker

# Add lockfile and package.json's of isolated subworkspace
FROM ${NODE_IMAGE} AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=strapi...

FROM ${NODE_IMAGE} AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 strapi
RUN adduser --system --uid 1001 strapi
USER strapi
COPY --from=installer --chown=1001:1001 /app .

WORKDIR /app/apps/strapi

VOLUME /app/apps/strapi/public

EXPOSE 1337
CMD yarn start