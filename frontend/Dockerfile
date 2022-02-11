FROM nginx:stable-alpine

# Create app directory
WORKDIR /usr/src/app

# Apply custom nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Download dependencies source files
COPY ./download_dependencies.sh .
RUN sh download_dependencies.sh

# Copy source files
COPY . .

# Remove non-web files
RUN rm nginx.conf download_dependencies.sh

# Run static http server as foreground process
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
