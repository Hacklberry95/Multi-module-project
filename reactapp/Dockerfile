# Use Node.js as the base image for building the React app
FROM node:16 AS build

# Set a working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy the build files to Nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
