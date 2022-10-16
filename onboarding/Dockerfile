FROM node:16

COPY . /
WORKDIR /

RUN yarn install --force
RUN yarn build
CMD yarn start