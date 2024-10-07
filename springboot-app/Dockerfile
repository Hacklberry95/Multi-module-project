# Use a lightweight Java image as the base image
FROM openjdk:21-jdk-slim

# Set a working directory
WORKDIR /app

# Copy the built jar file from the target directory into the image
COPY target/springboot-app-1.0.0.jar app.jar

#Copy credentials into image
COPY DBCredentials.env ./

# Set an entry point for the container
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Expose the port the app runs on
EXPOSE 8081
