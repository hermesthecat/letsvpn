import React from "react";
import PageWGUsers from "./pages/PageWGUsers";
import ProtectedRoute from "components/ProtectedRoute";


const PollsRoutes = (
    <>
        <ProtectedRoute path='/wgusers' exact><PageWGUsers/></ProtectedRoute>
    </>
)

export default PollsRoutes;


