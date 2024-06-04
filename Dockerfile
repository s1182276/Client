# Build project with Node
FROM node:22.0.0-alpine3.19 as build

WORKDIR /app

COPY package.json ./

RUN npm install

ARG ENV
ARG API_URL
ARG AZURE_AD_REDIRECT_URI

COPY . .

RUN echo API_URL=$API_URL > .client.env
RUN echo ENV=$ENV >> .client.env
RUN echo AZURE_AD_REDIRECT_URI=$AZURE_AD_REDIRECT_URI >> .client.env
RUN echo ADMIN_PORTAL_URI=$ADMIN_PORTAL_URI >> .client.env

RUN rm -rf ./public

RUN npm run build

# Copy built files to Nginx
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/conf /etc/nginx

COPY --from=build /app/public /usr/share/nginx/html
