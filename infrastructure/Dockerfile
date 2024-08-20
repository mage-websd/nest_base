FROM node:20.6.1 AS Builder

WORKDIR /app/

RUN apt update -y && apt upgrade -y
COPY ./package-lock.json ./package.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "dist/main"]
