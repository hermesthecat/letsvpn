import React from 'react';
import NavItem from "components/nav/NavLeft/NavItem";


export default function NavLeftApp() {
    return (
        <>
            <NavItem to={'/'} primary={'Home'} exact/>
            <NavItem to={'/admin'} primary={'Admin Page'} exact external/>
        </>
    );

}

