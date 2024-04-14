# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

FROM node:alpine

WORKDIR /usr/src/app
ENV NODE_ENV production

WORKDIR /usr/src/app
ENV NODE_ENV production
# Install app dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "start"]
