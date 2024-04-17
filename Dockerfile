FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/conf /etc/nginx

COPY ./public /usr/share/nginx/html