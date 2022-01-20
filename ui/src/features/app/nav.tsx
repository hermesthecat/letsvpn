import React from 'react';
import NavItem from "components/nav/NavLeft/NavItem";
import ProtectedNavItem from "../../components/nav/NavLeft/ProtectedNavItem";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {Typography} from "@mui/material";


export default function NavLeftApp() {
    return (
        <>
            <NavItem to={'/'} primary={'Home'} exact/>
            <ProtectedNavItem to={'/admin'} target={'_BLANK'} primary={<Typography sx={{display: 'flex', alignItems: 'center'}}>Admin Page <OpenInNewIcon sx={{transform: 'scale(0.7)'}}/></Typography>} exact external/>
        </>
    );

}

