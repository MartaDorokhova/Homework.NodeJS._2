FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm i

EXPOSE 3009

CMD ["npm", "start"]