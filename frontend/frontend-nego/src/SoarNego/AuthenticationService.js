import axios from "axios";

class AuthenticationService {

    registerSuccessfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser', username);
    }

    logout() {
        console.log('Logout called')
        //sessionStorage.removeItem('authenticatedUser');
        sessionStorage.clear()
        window.location.reload();
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return false
        return true
    }

    getUser() {
        return sessionStorage.getItem('authenticatedUser')
    }

    //Service to register new user by sending the parameters to the backend
    executeJwtReegisterService(firstname,lastname, email,password) {    
        return axios.post('http://localhost:8080/api/v1/auth/register', 
        {
            "firstname":firstname,
            "lastname":lastname,
            "email": email,
            "password":password
          }
        )
        //http://localhost:8080/authenticate
    }

    //
    registerSuccessfulLoginForJwt(firstname,token) {
        sessionStorage.setItem('authenticatedUser', firstname)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    //setting Axio interceptot 
    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    //Function to return JWT toke
    createJWTToken(token) {
        return 'Bearer ' +  token
    }

    executeJwtAuthenService(firstname,password){

        return axios.post('http://localhost:8080/api/v1/auth/authenticate', {
            "email":firstname,
            "password":password
         }
         )


        
    }
}

export default new AuthenticationService()