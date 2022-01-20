import React from 'react';
import {connect} from "react-redux";
import NavAuthProfile from "./components/NavAuthProfile";
import NavAuthForm from "./components/NavAuthForm";


function NavLeftAuth(props: any) {
    const { isAuthenticated } = props;

    return (
        <>{isAuthenticated ? <NavAuthProfile /> : <NavAuthForm />}</>
    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavLeftAuth)

