FROM node:14

WORKDIR /app/
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install

COPY . /app/
CMD yarn start:dev

VOLUME /app/data