# Step 1: Build the project
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy the pom.xml and the source code to the container
COPY pom.xml .
COPY src ./src

# Build the project (skip tests for now)
RUN mvn clean package -DskipTests

# Step 2: Run the application
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/todoapp-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]

