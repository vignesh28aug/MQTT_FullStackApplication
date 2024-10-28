# backend/Dockerfile
FROM node:16

# Set working directory inside the container
WORKDIR /server

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# RUN npm run dev

# Expose the port used by the backend (e.g., 5000)
EXPOSE 3001

# Run the backend service
CMD ["node", "server.js"]
