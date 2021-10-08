import React from "react";
import PageWGPeers from "./pages/PageWGPeers";
import ProtectedRoute from "components/ProtectedRoute";


const PollsRoutes = (
    <>
        <ProtectedRoute path='/wgpeers' exact><PageWGPeers/></ProtectedRoute>
    </>
)

export default PollsRoutes;


