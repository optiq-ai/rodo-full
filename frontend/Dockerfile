FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Naprawienie problemu z uprawnieniami do katalogu cache
RUN mkdir -p /app/node_modules/.cache && chmod 777 /app/node_modules/.cache

# Instalacja biblioteki three
RUN npm install three --save

EXPOSE 3333

CMD ["npm", "start"]
