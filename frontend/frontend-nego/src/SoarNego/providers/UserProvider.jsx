
/*

export interface UserProviderContextProps {
    isUserLoggedIn: boolean
    setAuthUser: (user: string) => void
    clearAuthUser: () => void
}

export interface UserProvderProps {
    child: ReactElement
}

*/

import React, { useState, useContext } from "react"
import AuthenticationService from "../AuthenticationService"

export const UserProviderContext = React.createContext() 


export const UserProvider = (props) => {

    // const [user, setUser] = useState(AuthenticationService.getUser())

    const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
    const user = AuthenticationService.getUser()
    const setAuthUser = (user) => {
        // setUser(user)
        console.log('Auth user set:', user)
        AuthenticationService.registerSuccessfulLogin(user)
        console.log('Auth user set val:', AuthenticationService.getUser())
    }
    const clearAuthUser = () => {
        // setUser(null)
        console.log('Auth user cleared')
        AuthenticationService.logout()
    }

    console.log('User, isLoggedIn', user, isUserLoggedIn)


    return <>
        <UserProviderContext.Provider
            value={{
                isUserLoggedIn, setAuthUser, clearAuthUser
            }}
        >
            {props.child}

        </UserProviderContext.Provider>
    </>
}

export const useUserContext = () => {
    return useContext(UserProviderContext)
}

// userContext.setAuthUser(value.username)


