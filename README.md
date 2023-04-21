# SoarNego

## Description 
SoarNego is a textual negotiation support system. After vast amounts of research and experience with performing negotiations in several contexts, it became apparent that there was a need for a tool that would cut down on time wastage and aid in the process of real-life give-and-take discussions about changes in agreements. The SoarNego application looks to address these needs by providing an application that can show changes and assist in negotiations by offering functionalities designed with these negotiations in mind.

By understanding the details of the negotiation process and the different roles that negotiators have, the SoarNego application aims to assist by providing an open-source space where one can find all the tools they need for successful negotiations.

A link to the Architecture of SoarNego [Architecture](https://github.com/umple/SoarNego/wiki/Architecture)

A textual negotiation support system
## Installing PostgreSQL

### For Mac:

1) Install brew if you do not have it already
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    ```
2) Then we update brew and install postgreSQL

    ```bash
    brew update 
    brew install postgresql@14
    ```
3) Start the server by running
    ```bash
    brew services start postgresql@14
    ```

    You can also stop the server by running
    ```bash
    brew services stop postgresql@14
    ```
4) Next we are going to connect to the server by running:
    ```bash
    psql postgres
    ```
5) Once you connect to the server we will create the db:
    ```sql
    create DATABASE SoarNego;
    ```
6) You can double check that this worked by running this command:
    ```sql
    \l
    ```
    This will display all existing databases and owners,
    
   *Note that the owner of the soarnego database will be your $DBusername and there is no default password so it will be an empty field*
7) To exit the database, use control-d

### For Linux:
1) Run the following commands in terminal
    ```bash
    sudo apt update
    sudo apt install postgresql
    ```
2) Verify the active status of PostgresSQL
   ```bash
   sudo systemctl status postgresql
   ```
   ![image](https://user-images.githubusercontent.com/55899878/233673653-30846544-095c-4371-908c-b10e9506728a.png)
3) Start PostgreSQL by Accessing its Server
    ```bash
    sudo –i –u postgres
    ```
4) Next we are going to connect to the server by running:
    ```bash
    psql postgres
    ```

5) Once you connect to the server we will create the db:
    ```sql
    create DATABASE SoarNego;
    ```
6) You can double check that this worked by running this command:
    ```sql
    \l
    ```
    This will display all existing databases and owners,
    
   *Note that the owner of the soarnego database will be your $DBusername and there is no default password so it will be an empty field*
7) To exit the database, use control-d

## Set Up

After creating the database the following steps should be followed in order to setup the
SoarNego Application:


1) Navigate to application.properties:

    Found here:
    [/backend/restful-web-services1.0/src/main/resources/application.properties](backend/restful-web-services1.0/src/main/resources/application.properties)

2) Once in the application.properties make sure to change the following.

    ```java
    spring.datasource.url= jdbc:postgresql://localhost:$DBport/SoarNego //default port is 5432
    spring.datasource.username= $DBusername // found in step 6) of how to install postgresql
    spring.datasource.password= $DBpassword //default is empty
    ```

    *Please make sure the port you run your database on and the port in your application.properties under spring.datasource.url are matching*

3) Once the database has been configured please run the java application by running application.java.

    Found here: [backend/restful-web-services1.0/src/main/java/com/bankend/restfulwebservices10/Application.java](backend/restful-web-services1.0/src/main/java/com/bankend/restfulwebservices10/Application.java)

    *If the database is set up correctly then it should continue to run*

    The terminal should have an output like this:

    ```bash
    2023-04-02 23:32:33.232  INFO 17748 --- [  restartedMain] c.b.restfulwebservices10.Application     : Started Application in 3.685 seconds (JVM running for 4.02)
    ```

4) Once the backened functionalities are running you can then navigate in your terminal to the frontend path: Found here [frontend/frontend-nego](frontend/frontend-nego)

5) Run the following commands

    ```bash
    npm install
    # then
    npm start
    ```

    If everything has run properly you should see the application launch in your browser. If the page you are brought to says
    "An Error Occurred. I don't know what to do! Contact support at ####to be supplied###" this is the current functionality.

6) Click Login at the top right of the screen

## Application use Instructions

Once the application is up and running follow these steps in order to use it and its functionalities:

1) At the login page hit the "Sign up" button. This will lead you to a page where you will need to fill in login information

2) Once you have this login information saved you will be back at the login page use the account you just
created in order to sign in.

3) Once signed in you will be brought to a page with the editor on it, you are able to type on this editor right away
and make changes to your text, such as highlights, formatting, etc.

4) On the left side of the editor there is a option for you to select the files that you want to use, only .docx files are currently supported

5) Once you have loaded these files that you would like to use please click on them to load them then use ctrl-s or cmd-s to save them to the database and then
refresh the page. Currently it is the only way to convert from HTML to a usable JSON file for the editor

6) If you would like to compare documents you should be able to select a file on the left, the name of the file you
are currently using should be on the top, then once you select seePrevious at the top of the screen, a file pane will open on the right where you
can select which file version you would like to compare to.
