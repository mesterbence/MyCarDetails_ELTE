FROM node:latest as node
WORKDIR Frontend/app
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:alpine
COPY --from=node Frontend/app/dist/mycardetails /usr/share/nginx/html
