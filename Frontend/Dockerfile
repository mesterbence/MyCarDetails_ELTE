FROM node:latest as node
WORKDIR /app
COPY Frontend/. .
RUN npm install
RUN npm run build --prod


FROM nginx:alpine
COPY --from=node /app/dist/mycardetails /usr/share/nginx/html
