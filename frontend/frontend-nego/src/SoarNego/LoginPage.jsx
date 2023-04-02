
import React from 'react';
import { Field, Formik, Form } from "formik";
import { useState } from 'react';
import AuthenticationService from './AuthenticationService.js';
import { useNavigate } from "react-router-dom";
import { useUserContext } from './providers/UserProvider.jsx';
import HeaderComponent from "./HeaderComponent";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function LoginPage (){

    // const userContext = useUserContext()

    const [hasLoginFailed, sethasLoginFailed] = useState(false)
    const [showSuccessMessage, setshowSuccessMessage] = useState(false)
    const navigate = useNavigate();



 

    function handleLoginClicked(value){
        // if(value.username==='user' && value.password==='dummy'){
        //     // userContext.setAuthUser(value.username)
        //     AuthenticationService.registerSuccessfulLogin(value.username,value.password)
        //     // console.log(AuthenticationService.isUserLoggedIn());
        //     navigate(`/`)
            
        // }
        // else {
        //     setshowSuccessMessage(false)
        //     sethasLoginFailed(true)
        // }

        AuthenticationService
        . executeJwtAuthenService(value.firstname, value.password)
        .then((response) => {
            AuthenticationService.registerSuccessfulLoginForJwt(value.firstname,response.data.token)
            //TODO: consider sending param with the link 
            //this.props.history.push(`/welcome/${this.state.username}`)
            navigate(`/soarnego`)
        }).catch( () =>{
            //TODO: Set below as necessary
            setshowSuccessMessage(false)
            sethasLoginFailed(true)
           
        })



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
                        firstname: '',
                        password: '',
            
                      }}
                      onSubmit={handleLoginClicked}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Email Supplied</label>
                                        <Field className="form-control" type="text" name="firstname"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field className="form-control" type="password" name="password" ></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type='submit'>Login</button>
                                    <div>
                                        
                                    <Link to="/signup" style={{
                                        display: 'inline-block',
                                        marginTop: '10px',
                                        padding: '10px 20px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '5px'
                                    }}>
                                        Sign Up
                                    </Link>

                                    </div>
                                    



                                </Form>
                                
                            )
                        }
                    </Formik>



                </div>




        </div>
    )
}
export default LoginPage

