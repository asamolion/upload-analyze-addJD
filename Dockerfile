# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.

FROM node:10
#ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install webpack -g
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN webpack
ENV NODE_ENV=production
ENV PORT=8081
CMD npm run start
EXPOSE 8081
