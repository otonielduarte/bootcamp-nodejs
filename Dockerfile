FROM node:12 as app
LABEL Author="Otoniel Duarte"
ENV NODE_ENV=development
COPY . /var/www
WORKDIR /var/www
RUN yarn

