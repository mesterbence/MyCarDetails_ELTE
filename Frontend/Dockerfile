FROM node:latest as node
WORKDIR Frontend/src/app
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:alpine
COPY --from=node Frontend/src/app/dist/mycardetails /usr/share/nginx/html
