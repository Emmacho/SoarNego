import React, {useState} from "react";
import { Formik, Field,Form, ErrorMessage } from "formik";
import * as Yup from 'yup'
import AuthenticationService from "./AuthenticationService.js";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent.jsx";



function SignUpDetails () {
  const navigate = useNavigate();
  const [hasLoginFailed, sethasLoginFailed] = useState(false)
  const [showSuccessMessage, setshowSuccessMessage] = useState(false)

     function validationSchema() {
        return Yup.object().shape({
          firstname: Yup.string().required('firstname is required'),
          lastname: Yup.string()
            .required('lastname is required'),
          email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
          confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
          acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
        });
      }

      function handleSubmit(data) {
        console.log(JSON.stringify(data, null, 2));
        //console.log(data.firstname, data.lastname,data.email,data.password)

        
        // //firstname,lastname, email,password

        AuthenticationService
        . executeJwtReegisterService(data.firstname, data.lastname, data.email, data.password)
        .then((response) => {
            //AuthenticationService.registerSuccessfulLoginForJwt(data.firstname,response.data.token)
            //TODO: consider sending param with the link 
            //this.props.history.push(`/welcome/${this.state.username}`)
            navigate(`/login`)
        }).catch( () =>{
            //TODO: Set below as necessary
            setshowSuccessMessage(false)
            sethasLoginFailed(true)
            console.log("Registration failed")
        })

      }

    return(
      <div>

      <HeaderComponent />
        <br />
      {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
      {showSuccessMessage && <div>Sucessful Registration</div>}
      
        <Formik
            initialValues = {{
                firstname:'',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false,
          }}
          onSubmit={ handleSubmit}
          validationSchema = {validationSchema}
        >
            {({ errors, touched, resetForm }) => (
            <div className="container" >
            <Form>
              <div className="form-group">
                <label>First Name</label>
                <Field
                  name="firstname"
                  type="text"
                  className={
                    'form-control' +
                    (errors.firstname && touched.firstname ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname"> lastname </label>
                <Field
                  name="lastname"
                  type="text"
                  className={
                    'form-control' +
                    (errors.lastname && touched.lastname ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"> Email </label>
                <Field
                  name="email"
                  type="email"
                  className={
                    'form-control' +
                    (errors.email && touched.email ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"> Password </label>
                <Field
                  name="password"
                  type="password"
                  className={
                    'form-control' +
                    (errors.password && touched.password ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword"> Confirm Password </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={
                    'form-control' +
                    (errors.confirmPassword && touched.confirmPassword
                      ? ' is-invalid'
                      : '')
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group form-check">
                <Field
                  name="acceptTerms"
                  type="checkbox"
                  className={
                    'form-check-input' +
                    (errors.acceptTerms && touched.acceptTerms
                      ? ' is-invalid'
                      : '')
                  }
                />
                <label htmlFor="acceptTerms" className="form-check-label">
                  I have read and agree to the Terms
                </label>
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-warning float-right"
                >
                  Reset
                </button>
              </div>
            </Form>
            </div>

            
          )}

       
        </Formik>

        </div> 
    )
}

export default SignUpDetails 