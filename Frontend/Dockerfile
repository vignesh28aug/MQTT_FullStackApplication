# frontend/Dockerfile
# Use Node image for build step
FROM node:16 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app's code
COPY . .

# Build the React app
RUN npm run build

# Serve the build using nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to access frontend
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
