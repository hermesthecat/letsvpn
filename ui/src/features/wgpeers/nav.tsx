import React from 'react';
import NavItem from "components/nav/NavLeft/NavItem";


export default function NavLeftWGPeers() {
    return (
        <>
            <NavItem to={'/wgpeers'} primary={'WireGuard Peers'} />
        </>
    );

}

