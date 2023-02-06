
import React from 'react';
import { Field, Formik, Form } from "formik";
import { useState } from 'react';
import AuthenticationService from './AuthenticationService.js';
import { useNavigate } from "react-router-dom";
import { useUserContext } from './providers/UserProvider.jsx';
import HeaderComponent from "./HeaderComponent";


function LoginPage (){

    // const userContext = useUserContext()

    const [hasLoginFailed, sethasLoginFailed] = useState(false)
    const [showSuccessMessage, setshowSuccessMessage] = useState(false)
    const navigate = useNavigate();



 

    function handleLoginClicked(value){
        if(value.username==='user' && value.password==='dummy'){
            // userContext.setAuthUser(value.username)
            AuthenticationService.registerSuccessfulLogin(value.username,value.password)
            // console.log(AuthenticationService.isUserLoggedIn());
            navigate(`/`)
            
        }
        else {
            setshowSuccessMessage(false)
            sethasLoginFailed(true)
        }
    }


    return (
        <div>
            <HeaderComponent />
            <h1>Login</h1>
                {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {showSuccessMessage && <div>Login Sucessful</div>}
                <div className="container">

                    <Formik
                    initialValues={{
                        username: '',
                        password: '',
            
                      }}
                      onSubmit={handleLoginClicked}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>User Name</label>
                                        <Field className="form-control" type="text" name="username"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field className="form-control" type="password" name="password" ></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type='submit'>Login</button>


                                </Form>
                                
                            )
                        }
                    </Formik>



                </div>




        </div>
    )
}
export default LoginPage

