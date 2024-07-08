# Stage 0, Node, download deps & build the app
FROM node:20-alpine as builder

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add app
COPY . /usr/src/app

# install cli and deps
RUN npm i -g @angular/cli
RUN npm i --force

# add .bin to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# build app
RUN ng b

# Stage 1, Nginx, copy & serve
FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/performance/browser /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
