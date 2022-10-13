FROM node:12.18.2-alpine as base

WORKDIR /app

COPY package.json package-lock.json ./
COPY ./ ./
RUN npm ci

# ENV NODE_ENV development
# RUN npm install react-scripts --save

EXPOSE 3000
