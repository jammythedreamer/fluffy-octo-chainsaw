FROM node:14.16.0-alpine3.10

WORKDIR /usr/app

COPY package.json ./

RUN npm install --silent

RUN npm install -g nodemon

COPY . .

CMD [ "npm", "run", "dev"]

EXPOSE 4000
