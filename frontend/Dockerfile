FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Naprawienie problemu z uprawnieniami do katalogu cache
RUN mkdir -p /app/node_modules/.cache && chmod 777 /app/node_modules/.cache

EXPOSE 3000

CMD ["npm", "start"]
