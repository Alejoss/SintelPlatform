# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and possibly package-lock.json
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port 5173 available to the outside world
EXPOSE 5173

# Define environment variable
ENV NODE_ENV=development

# Run the app when the container launches using the Vite command with --host
CMD ["npm", "run", "dev", "--", "--host"]
