FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD /target/demo-0.0.1-SNAPSHOT.jar app.jar
RUN sh -c 'touch /app.jar'
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -Dspring.data.mongodb.host=$MONGO_URI \
-jar /app.jar" ]