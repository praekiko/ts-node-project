FROM node:lts-alpine as base-stage

WORKDIR /app

FROM base-stage as intermediary-builder-stage

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM base-stage
WORKDIR /app
COPY --from=intermediary-builder-stage /app/build ./build
COPY --from=intermediary-builder-stage /app/node_modules ./node_modules
EXPOSE 4000
ENV NODE_ENV production
CMD ["node", "build/index.js"]
