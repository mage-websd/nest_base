FROM node:19.9.0 AS Builder

WORKDIR /app/

RUN apt update -y
COPY ./yarn.lock ./package.json ./
RUN yarn install
COPY . .
RUN yarn prebuild && yarn build

FROM node:19.9.0-alpine
WORKDIR /app/
COPY --from=Builder /app/node_modules /app/dist ./
COPY --from=Builder /app/src/views ./src/
CMD ["node", "dist/main"]
