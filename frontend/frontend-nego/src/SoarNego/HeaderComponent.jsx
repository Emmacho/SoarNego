import {Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import { useUserContext } from './providers/UserProvider.jsx';


function HeaderComponent () {
    
       
        // const userContext  = useUserContext()

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        //console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/">SoarNego</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <div> <li><Link className="nav-link" to="/login">Login</Link></li></div>}
                        {isUserLoggedIn && <div> <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li></div>}
                        
                    </ul>
                </nav>
            </header>
        )
    
}

// {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}

export default HeaderComponent


