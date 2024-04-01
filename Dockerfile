FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/conf /etc/nginx

COPY ./src /usr/share/nginx/html
COPY ./lib /usr/share/nginx/html/lib