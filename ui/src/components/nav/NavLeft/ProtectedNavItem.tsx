import React from 'react';
import {connect} from "react-redux";
import NavItem from "./NavItem";


function ProtectedNavItem(props: any) {
    const { isAuthenticated, ...otherProps } = props;

    if (!isAuthenticated) return (<></>);
    else return <NavItem {...otherProps}/>
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProtectedNavItem)