import React from 'react';
import ProtectedNavItem from "components/nav/NavLeft/ProtectedNavItem";


export default function NavLeftWGPeers() {
    return (
        <>
            <ProtectedNavItem to={'/wgpeers'} primary={'WireGuard Peers'} />
        </>
    );

}

