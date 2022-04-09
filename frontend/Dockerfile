FROM NGINX;

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ../frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf