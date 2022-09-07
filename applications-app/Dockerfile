
FROM node:14

WORKDIR /app

COPY package.json ./

RUN npm set strict-ssl false
RUN npm install

CMD npm run server