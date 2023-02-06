import AuthenticationService
 from "./AuthenticationService"

import HeaderComponent from "./HeaderComponent";
 
function LogoutComponent (){

    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    
        return (
            <>
                <HeaderComponent/>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for Using Our Application.
                    {console.log(isUserLoggedIn)}
                </div>
            </>
        )
    
}

export default LogoutComponent