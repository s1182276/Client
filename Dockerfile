# Build project with Node
FROM node:22.0.0-alpine3.19 as build

WORKDIR /app

# Copy package.json and install dependencies with verbose logging
COPY package.json ./
RUN npm install --verbose

ARG API_URL

COPY . .

# Output the API_URL to ensure the environment variable is set correctly
RUN echo API_URL=$API_URL > .client.env

RUN rm -rf ./public

RUN npm run build

# Copy built files to Nginx
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/conf /etc/nginx

COPY --from=build /app/public /usr/share/nginx/html
