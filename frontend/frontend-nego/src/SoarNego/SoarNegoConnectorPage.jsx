
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React from 'react';
import SoarNegoAppPage from './SoarNegoAppPage'
import LoginPage from './LoginPage'
import AuthenticatedRoute from './AuthenticatedRoute';
import LogoutComponent from './LogoutComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import ErrorComponent from './ErrorComponent';
import Layout from './Layout';
import { UserProvider } from './providers/UserProvider';




function SoarNegoConnectorPage () {


    
    
    
        return (
            <>
                {/* <UserProvider child={ */}
                     <div className="SoarNegoConnectorPage">
                
                {/* <AuthenticatedRoute> */}

                    <Router>
                        

                            
                            <Routes>
                                
                                {/* <Route path="/" element={<Layout />}> */}
                                            {/* <Route path='/soarnego' element ={
                                                <AuthenticatedRoute>
                                                    <SoarNegoAppPage/>
                                                </AuthenticatedRoute>
                                            }/> */}
                                        
                                            <Route path="/" element ={<AuthenticatedRoute child={<SoarNegoAppPage/>}/>} />
                                                
                                
                                            {/* <Route path="/soarnego" element={<SoarNegoAppPage/>} /> */}

                                            <Route path="login" element={<LoginPage/>} />
                                            <Route path="logout" element={<LogoutComponent/>} />
                                            <Route path="*"  element = {<ErrorComponent/>} />
                                            
                                {/* </Route> */}
                            </Routes>
                            <FooterComponent/>
                        
                            
                    </Router>
                    {/* </AuthenticatedRoute> */}
            </div>
                {/* }>
                </UserProvider> */}
            </>
           


        )
       
}

export default SoarNegoConnectorPage

