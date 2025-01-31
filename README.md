# vf-advanced-java-development
## Project: Make an E-commerce Website for Sporty Shoes

### Project objective:

As a Full Stack Developer, complete the features of the application by planning the development and pushing the source code to the GitHub repository.    

### Background of the problem statement:

Sporty Shoes is a company that manufactures and sells sports shoes. They have a walk-in store, and now, they wish to launch their e-commerce portal sportyshoes.com.
You’re asked to develop a prototype of the application. It will be then presented to the relevant stakeholders for budget approval. Your manager has set up a meeting where you’re asked to do the following: 

● Presenting the specification document which has the product’s capabilities, appearance, and user interactions
● Setting up Git and GitHub account to store and track your enhancements of the prototype 
● Explaining the Java concepts used in the project 
● Discussing the generic features of the product:
● There will be an admin to manage the website. An administrator login will be required to access the admin page. 

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
