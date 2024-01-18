# ---------------------------------------------- #
#                      BASE                      #
# ---------------------------------------------- #
FROM node:18-alpine3.19 AS base
RUN npm install --global --no-update-notifier --no-fund pnpm@8.9.2
RUN apk add --no-cache g++ make py3-pip libc6-compat

# ---------------------------------------------- #
#                      DEPS                      #
# ---------------------------------------------- #
FROM base AS deps
RUN --mount=type=secret,id=npm_token npm config set @axieinfinity:registry https://npm.pkg.github.com \
  && npm config set '//npm.pkg.github.com/:_authToken' $(cat /run/secrets/npm_token)
WORKDIR /home/node/app

COPY pnpm-lock.yaml .npmr[c] ./
RUN pnpm fetch

# ---------------------------------------------- #
#                     BUILDER                    #
# ---------------------------------------------- #
FROM deps AS builder
WORKDIR /home/node/app
COPY --from=deps /home/node/app/node_modules ./node_modules
COPY .env.deploy .env
COPY . .

RUN pnpm install -r --offline
RUN pnpm build

# ---------------------------------------------- #
#                     RUNNER                     #
# ---------------------------------------------- #
FROM base as runner
WORKDIR /home/node/app

ENV NODE_ENV production

COPY --from=builder /home/node/app/next.config.js ./
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/package.json ./package.json
COPY --from=builder /home/node/app/csp-config ./csp-config
COPY --from=builder /home/node/app/entrypoint.sh ./entrypoint.sh

COPY --from=builder --chown=node:node /home/node/app/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/app/.next/static ./.next/static

RUN chmod +x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]

EXPOSE 3000

CMD ["pnpm", "run", "start"]
