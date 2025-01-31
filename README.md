# vf-advanced-java-development
Advanced Java Development

## Prerequisites

### Start Intellij IDE project - spring initializr
To create a Springboot project in the IDE, go to the page https://start.spring.io/ to assemble the necessary components.


### Start MySQL - database as a docker container
To start the database as a docker container, run the following command:
```
docker run \
  --name mysql-db \
  --env MYSQL_ROOT_PASSWORD=mypasswd \
  --env MYSQL_DATABASE=JavaProject \
  --env MYSQL_USER=Karsten \
  --env MYSQL_PASSWORD=12345 \
  --detach \
  --publish 3307:3306 \
mysql
```
