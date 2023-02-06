import React from 'react'
import {Route, Navigate} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import { useUserContext } from './providers/UserProvider.jsx'


/*
interface AuthenticatedRouteProps {
    child: ReactElement
}

*/


//Authenticated route to be refactored and implemented
function AuthenticatedRoute (props){    

    // const userContext = useUserContext()
    
        // if(AuthenticationService.isUserLoggedIn()) {
        //     return <Route {...props}/>
        // } else {
        //     return <Navigate to="/login"/>
        // }

        // console.log('AuthRoute isLoggedIn:', userContext.isUserLoggedIn)

        if(AuthenticationService.isUserLoggedIn()) {
            return <>{props.child}</>
        } else {
            return <Navigate to="/login"/>
        }

    
    
}

export default AuthenticatedRoute