import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom';


function ProtectedRoute(props: any) {
    const { isAuthenticated, path } = props;
    const history = useHistory();

    const { children, ...otherProps } = props;

    if (!isAuthenticated) {
        // Adds path that would've gone to to history so that it redirects to that once you login.
        history.push(path);
        return (<Redirect to={'/login'}/>);
    }

    return (
        <Route {...otherProps}>{children}</Route>
    );
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProtectedRoute)