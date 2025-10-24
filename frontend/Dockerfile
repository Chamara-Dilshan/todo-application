# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . ./

# Build the React app
RUN npm run build

# Step 2: Serve the React app
FROM nginx:alpine

# Copy the built React app to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port for Nginx
EXPOSE 80

# Run Nginx server
CMD ["nginx", "-g", "daemon off;"]

