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

# Make port 3000 available to the world outside this container
EXPOSE 5173

# Define environment variable
ENV NODE_ENV=development


# Run the app when the container launches using the Vite command with --host
CMD ["npm", "run", "dev", "--", "--host"]
