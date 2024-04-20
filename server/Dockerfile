# Use Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY . .


# Install dependencies
RUN npm install

RUN npm run build


# Copy tsconfig.json to the working directory
COPY ./tsconfig.json ./

# Copy server source code
COPY . .

EXPOSE 3006

# Set the command to run your application
CMD [ "npm", "run", "start"]  # Assuming you have a start script
