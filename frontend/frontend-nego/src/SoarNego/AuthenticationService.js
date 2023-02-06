class AuthenticationService {

    registerSuccessfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser', username);
    }

    logout() {
        console.log('Logout called')
        sessionStorage.removeItem('authenticatedUser');
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
}

export default new AuthenticationService()