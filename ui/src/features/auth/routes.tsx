import PageLogin from "./pages/PageLogin";
import {Route} from "react-router-dom";
import React from "react";


const AuthRoutes = (
    <>
        <Route path='/login' exact><PageLogin/></Route>
    </>
)
export default AuthRoutes
