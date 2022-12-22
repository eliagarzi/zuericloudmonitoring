FROM nginx

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY api /usr/share/nginx/html/api/

COPY start /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf