FROM node:latest as node

WORKDIR /Frontend
COPY . .
RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /Frontend/src/app/dist/mycardetails /usr/share/nginx/html
