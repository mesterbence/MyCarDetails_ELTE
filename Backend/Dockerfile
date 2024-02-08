ARG SQL_URL
ARG SQL_USER
ARG SQL_PASS
ARG JWT

FROM maven:3.6.0-jdk-11-slim AS build
COPY Backend/src /home/app/src
COPY Backend/pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean -Dmaven.test.skip package
COPY target/MyCarDetails-0.0.1-SNAPSHOT.jar /app/mycardetails.jar
CMD ["java", "-jar", "mycardetails.jar"]
