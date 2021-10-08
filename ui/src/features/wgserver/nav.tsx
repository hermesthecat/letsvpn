import React from 'react';
import NavItem from "components/nav/NavLeft/NavItem";


export default function NavLeftWGServers() {
    return (
        <>
            <NavItem to={'/wgservers'} primary={'WireGuard Servers'} />
        </>
    );

}

