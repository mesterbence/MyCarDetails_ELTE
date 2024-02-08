FROM maven:3.6.0-jdk-11-slim AS build
COPY Backend/src /home/app/src
COPY Backend/pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package
