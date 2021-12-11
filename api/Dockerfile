FROM node:17-alpine3.12

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install

# Add support for debugging
RUN npm install -g nodemon
EXPOSE 9229

# Copy source files
COPY . .

# Switch user
USER node

# Run app
EXPOSE 80
CMD [ "npm", "start"]
