FROM node:10 as builder
RUN mkdir /build 
ADD . /build/
WORKDIR /build 
RUN yarn install
RUN yarn build:prod
FROM nginx:alpine
COPY --from=builder /build/dist/sa-todo-list-front-end /usr/share/nginx/html