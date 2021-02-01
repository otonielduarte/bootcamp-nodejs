FROM node:12 as base
LABEL Author="Otoniel Duarte"
ENV NODE_ENV=development
WORKDIR /app
COPY . .


FROM base as install
WORKDIR /app
RUN yarn




