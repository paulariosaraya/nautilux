FROM node:22.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g http-server

EXPOSE 8001
CMD ["http-server", "app", "-p", "8001"]
