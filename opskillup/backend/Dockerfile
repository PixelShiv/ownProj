# Use lightweight Node image
FROM node:18-alpine

# Create app directory inside container
WORKDIR /app

# Copy package.json first
COPY package.json ./

# Install dependencies (express, cors)
RUN npm install

# Copy application file
COPY server.js .

# Expose backend port (match server.js port)
EXPOSE 3000

# Start the backend
CMD ["node", "server.js"]

