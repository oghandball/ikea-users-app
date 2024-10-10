FROM node:18
# This is the image we'll use as the base
# base image will use Node.js runtime based on Alpine Linux Distribution
# Alpine is a minimal, lightweight Docker image optimized for running applications in containers

WORKDIR /usr/src/app
# Create app directory
# WORKDIR sets the working directory inside the container where the following instructions will be executed

COPY . .
# Copy the app files/directories from local filesystem to the Docker container

RUN npm install
# Install dependencies

RUN npm run build
# Build the React App

EXPOSE 5000
# The port we want the container to open (i.e. run on)

CMD [ "npm", "run", "dev" ]
# The command to start the server inside the container
