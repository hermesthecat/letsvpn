import React from "react";
import ProtectedRoute from "components/ProtectedRoute";
import PageWGServers from "./pages/PageWGServers";


const WGServerRoutes = (
    <>
        <ProtectedRoute path='/wgservers' exact><PageWGServers/></ProtectedRoute>
    </>
)

export default WGServerRoutes;


