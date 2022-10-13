FROM node:12.16.3 as base

WORKDIR /app



COPY package.json package-lock.json ./

ENV NODE_ENV development

RUN npm ci

RUN npm install react-scripts --save

COPY ./ ./

EXPOSE 3000