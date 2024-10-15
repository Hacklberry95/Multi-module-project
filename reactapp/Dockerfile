# Development Stage: Use Node.js for hot reloading
FROM node:16 AS dev

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port for the React app
EXPOSE 3000

# Set environment variable for Docker container polling
ENV CHOKIDAR_USEPOLLING=true

# Start the app in development mode with hot reloading
CMD ["npm", "start"]
