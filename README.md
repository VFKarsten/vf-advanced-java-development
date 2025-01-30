# vf-advanced-java-development
Advanced Java Development

## Prerequisites

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
