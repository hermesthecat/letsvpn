import React from 'react';
import NavTop from "../components/nav/NavTop/NavTop";
import AppContent from "./AppContent";
import NavLeft from "../components/nav/NavLeft/NavLeft";

export default function MaterialUIApp() {
    return (
        <>
            <NavLeft/>
            <NavTop/>
            <AppContent/>
        </>
    );
}
