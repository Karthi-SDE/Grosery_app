# Use Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

EXPOSE 5000
# Build the frontend code
RUN npm run build

# Set the command to run your application
# CMD [ "npm", "run","dev"]
CMD [ "npm", "run","dev","--","--host", "0.0.0.0" ]
