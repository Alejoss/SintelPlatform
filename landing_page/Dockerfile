# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire landing page project to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port on which Next.js will run
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Start the Next.js production server
CMD ["npm", "start"]
