# SoarNego

A textual negotiation support system

After Pulling from git the following steps should be followed in order to setup the
SoarNego Application:

1) npm install in order to get the required packages

2) After this has finished neavigate to application.properties:
SoarNego->backend->restful-web-services1.0->src->main->resources->application.properties

3) Once in the application.properties make sure to change spring.datasource.password to the password that you use in pgAdmin

4) Open pgAdmin and create a database titles SoarNego
*Please make sure the port you run your database on and the port in your application.properties under spring.datasource.url are matching*

5) Once pgAdmin has been configured please run the java application by running the application.java class.
*If the database is set up correctly then it should continue to run*

6) In your SoarNego database on pgAdmin you can drop the tables: *Insert table names*

7) Once the backened functionalities are running you can then navigate in your terminal to the frontend path: Ie cd frontend-> cd frontend-nego
your path should look along the lines of Soarnego/frontend/frontend-nego

8) Run the npm start command

if everything has run properly you should see the application launch in your browser. If the page you are brought to says
"An Error Occurred. I don't know what to do! Contact support at ####to be supplied###" then change your url to /login

Application use Instructions:

Once the application is up and running follow these steps in order to use it and its functionalities:

1) At the login page hit the "Sign in" button. This will lead you to a page where you will need to fill in login information
it does not need to be a working email at this time just something@example.com will work.
Please also note your password must be above 4 characters

2) Once you have this login information saved you will be back at the login page use the account you just
created in order to sign in.
*Please note if the information you have typed is incorrect you may need to sign up with a new account as the functionality
might be bugged and not let you sign in with that email after*

3) Once signed in you will be brought to a page with the editor on it, you are able to type on this editor right away
and make changes to your text, such as highlights, formatting, ect.

4) On the right side of the editor there is a option for you to select the files that you want to use for now the 2 options
that are provided are .json files or docx files.

5) Once you have loaded these files that you would like to use please use ctrl s to save them to the database and then
refresh the page.

6) If you would like to compare documents you should be able to select a file on the left, the name of the file you
are currently using should be on the top, then once you select seePrvious a file pane will open on the side where you
can select which file version you would like to compare to.
