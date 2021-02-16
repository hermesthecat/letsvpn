import PageHome from "./pages/PageHome";
import {Route} from "react-router-dom";
import React from "react";


const AppRoutes = (
    <>
        <Route path='/' exact><PageHome/></Route>
    </>
)

export default AppRoutes;
