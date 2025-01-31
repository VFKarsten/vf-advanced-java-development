# vf-advanced-java-development
## Project: Make an E-commerce Website for Sporty Shoes

### Project objective:

As a Full Stack Developer, complete the features of the application by planning the development and pushing the source code to the GitHub repository.    

### Background of the problem statement:

Sporty Shoes is a company that manufactures and sells sports shoes. They have a walk-in store, and now, they wish to launch their e-commerce portal sportyshoes.com.
You’re asked to develop a prototype of the application. It will be then presented to the relevant stakeholders for budget approval. Your manager has set up a meeting where you’re asked to do the following: 

- Presenting the specification document which has the product’s capabilities, appearance, and user interactions
- Setting up Git and GitHub account to store and track your enhancements of the prototype
- Explaining the Java concepts used in the project
- Discussing the generic features of the product:
- There will be an admin to manage the website. An administrator login will be required to access the admin page.

### The admin should be able to change his password if he wants, he should be able to:

- Manage the products in the store including categorizing them
- Browse the list of users who have signed up and be able to search users
- See purchase reports filtered by date and category

![image](https://github.com/user-attachments/assets/2e83a3ed-f558-4cdd-8d69-d84009bc5b1c)

*click Generate* and Download.


## Prerequisites

### Start Intellij IDE project - spring initializr
To create a Springboot project in the IDE, go to the page https://start.spring.io/ to assemble the necessary components.
> Choose:
- Project = Maven
- Language = Java
- Spring Boot = 3.4.2
- Project Metatdata = Name ...
- Packaging = Jar
- Java = 17

> The following dependencies are needed:
1. Spring Web
2. Spring Boot Dev Tools
3. Spring Data JPA
4. MySQL Driver


> For test purposes with JUnit 5 we need to add JUnit as a dependency
1. Open pom.xml in the root directory of your project.
2. In pom.xml, press AltInsert and select Dependency.
3. In the dialog that opens, type org.junit.jupiter:junit-jupiter in the search field. Locate the necessary dependency in the search results and click Add.
4. When the dependency is added to pom.xml, click Reimport All Maven Projects in the Maven tool window to import the changes.


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
