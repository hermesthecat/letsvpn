import React from 'react';
import ProtectedNavItem from "../../components/nav/NavLeft/ProtectedNavItem";


export default function NavLeftWGServers() {
    return (
        <>
            <ProtectedNavItem to={'/wgservers'} primary={'WireGuard Servers'} />
        </>
    );

}

