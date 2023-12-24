FROM node:alpine as build

WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:alpine

WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./.next/standalone
COPY --from=build /app/.next/static ./.next/static

ENV NODE_ENV=production

CMD ["node", ".next/standalone/server.js"]