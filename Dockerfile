FROM node:latest as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:alpine as production-stage

# Set the working directory
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy the build from the build-stage
COPY --from=build-stage /app/dist /app

# Expose the port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", ".", "-l", "3000"]
