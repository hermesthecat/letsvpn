import React from 'react';
import NavItem from "components/nav/NavLeft/NavItem";


export default function NavLeftWGUsers() {
    return (
        <>
            <NavItem to={'/wgusers'} primary={'WireGuard Users'} />
        </>
    );

}

