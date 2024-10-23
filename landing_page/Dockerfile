# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application for production
RUN npm run build

# Expose the port on which Next.js will run
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV=production

# Start the Next.js production server
CMD ["npm", "start"]
