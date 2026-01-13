FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json ./

COPY apps ./apps
COPY packages ./packages

RUN pnpm install --frozen-lockfile

RUN pnpm turbo build --filter=client-web

FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/client-web ./apps/client-web
COPY --from=builder /app/packages ./packages

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000

CMD ["pnpm", "--filter=client-web", "start"]