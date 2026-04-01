# Simple Dockerfile for Greenbike backend (no DB dependency)
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files and install deps
COPY package*.json ./
RUN npm ci --only=production

# Copy backend source code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
