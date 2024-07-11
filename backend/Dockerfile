FROM docker.io/node:17-alpine3.12

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install

# Add support for debugging
# RUN npm install -g nodemon
# EXPOSE 9229

# Switch user
USER node

# Copy source files
COPY . .


# Run app (use port above 1024 to avoid privilege issues)
EXPOSE 8080
ENV PORT 8080
CMD [ "npm", "start"]
