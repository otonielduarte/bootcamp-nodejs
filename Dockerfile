FROM node:12 as install
LABEL Author="Otoniel Duarte"
ENV NODE_ENV=development
WORKDIR /app
RUN yarn
COPY . .

