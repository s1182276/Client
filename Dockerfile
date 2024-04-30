# Build project with Node
FROM node:22.0.0-alpine3.19 as build

WORKDIR /app

COPY package.json ./

RUN npm install

ARG API_URL

COPY . .

RUN echo API_URL=$API_URL > .client.env

RUN npm run build

# Copy built files to Nginx
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/conf/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/public /usr/share/nginx/html
