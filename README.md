# SoarNego

A textual negotiation support system

## Set Up

After Pulling from git the following steps should be followed in order to setup the
SoarNego Application:

1) npm install in order to get the required packages

2) Create a postgresql database named SoarNego, we used pgAdmin to achieve this

3) After this has finished neavigate to application.properties:

    SoarNego->backend->restful-web-services1.0->src->main->resources->application.properties

    [Found Here](backend/restful-web-services1.0/src/main/resources/application.properties)

4) Once in the application.properties make sure to change the following.

    ```java
    spring.datasource.url= jdbc:postgresql://localhost:{$DBport}/SoarNego
    spring.datasource.username= {$DBusername}
    spring.datasource.password= {$DBpassword}
    ```

    *Please make sure the port you run your database on and the port in your application.properties under spring.datasource.url are matching*

5) Once pgAdmin has been configured please run the java application by running the application.java class.
*If the database is set up correctly then it should continue to run*
    The terminal should have an output like this:

    ```bash
    2023-04-02 23:32:33.232  INFO 17748 --- [  restartedMain] c.b.restfulwebservices10.Application     : Started Application in 3.685 seconds (JVM running for 4.02)
    ```

6) Once the backened functionalities are running you can then navigate in your terminal to the frontend path: found at frontend\frontend-nego or found [here](frontend/frontend-nego)

7) Run the npm start command

    if everything has run properly you should see the application launch in your browser. If the page you are brought to says
    "An Error Occurred. I don't know what to do! Contact support at ####to be supplied###" this is the current functionality.

8) navigate to /login

## Application use Instructions

Once the application is up and running follow these steps in order to use it and its functionalities:

1) At the login page hit the "Sign up" button. This will lead you to a page where you will need to fill in login information

2) Once you have this login information saved you will be back at the login page use the account you just
created in order to sign in.

3) Once signed in you will be brought to a page with the editor on it, you are able to type on this editor right away
and make changes to your text, such as highlights, formatting, etc.

4) On the left side of the editor there is a option for you to select the files that you want to use, only .docx files are currently supported

5) Once you have loaded these files that you would like to use please click on them to load them then use ctrl-s to save them to the database and then
refresh the page. Currently it is the only way to convert from HTML to usable JSON file for the editor

6) If you would like to compare documents you should be able to select a file on the left, the name of the file you
are currently using should be on the top, then once you select seePrvious at the top of the screen, a file pane will open on the right where you
can select which file version you would like to compare to.
