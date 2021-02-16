import React from "react";
import PagePolls from "./PagePolls";
import ProtectedRoute from "components/ProtectedRoute";


const PollsRoutes = (
    <>
        <ProtectedRoute path='/polls' exact><PagePolls/></ProtectedRoute>
    </>
)

export default PollsRoutes;


