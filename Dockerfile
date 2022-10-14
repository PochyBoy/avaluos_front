FROM node:16

WORKDIR /usr/src/frontend
ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
