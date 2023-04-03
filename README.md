# SoarNego

A textual negotiation support system

## Set Up

After Pulling from git the following steps should be followed in order to setup the
SoarNego Application:

1) Create a postgresql database named SoarNego, we used pgAdmin to achieve this

2) After this has finished navigate to application.properties:

    Found here:
    [/backend/restful-web-services1.0/src/main/resources/application.properties](backend/restful-web-services1.0/src/main/resources/application.properties)

3) Once in the application.properties make sure to change the following.

    ```java
    spring.datasource.url= jdbc:postgresql://localhost:{$DBport}/SoarNego
    spring.datasource.username= {$DBusername}
    spring.datasource.password= {$DBpassword}
    ```

    *Please make sure the port you run your database on and the port in your application.properties under spring.datasource.url are matching*

4) Once the database has been configured please run the java application by running the application.java class.

    Found here: [backend/restful-web-services1.0/src/main/java/com/bankend/restfulwebservices10/Application.java](backend/restful-web-services1.0/src/main/java/com/bankend/restfulwebservices10/Application.java)

    *If the database is set up correctly then it should continue to run*

    The terminal should have an output like this:

    ```bash
    2023-04-02 23:32:33.232  INFO 17748 --- [  restartedMain] c.b.restfulwebservices10.Application     : Started Application in 3.685 seconds (JVM running for 4.02)
    ```

5) Once the backened functionalities are running you can then navigate in your terminal to the frontend path: Found here [frontend/frontend-nego](frontend/frontend-nego)

6) Run the following commands

    ```bash
    npm install
    # then
    npm start
    ```

    If everything has run properly you should see the application launch in your browser. If the page you are brought to says
    "An Error Occurred. I don't know what to do! Contact support at ####to be supplied###" this is the current functionality.

7) Navigate to /login by manually replacing the URL

    Example:

    ```text
    http://localhost:4200/login
    ```

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
are currently using should be on the top, then once you select seePrvious at the top of the screen, a file pane will open on the right where you
can select which file version you would like to compare to.
