FROM node:latest as node
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:alpine
COPY --from=node Frontend/src/app/dist/mycardetails /usr/share/nginx/html
