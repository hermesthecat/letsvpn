import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import FullPageLayout from "components/FullPageLayout";
import WGServerBlockInfo from "./WGServerBlockInfo";
import Divider from "@mui/material/Divider";


export default function PageHome() {

    useEffect(() => {
    }, []);

    return (
        <FullPageLayout
            header={'LetsVPN'}
            title={'Dashboard'}
        >
            <Typography variant={'body1'}>Welcome to LetsVPN.</Typography>
            <Divider/>
            <Typography variant={'body1'}>This app is still heavily under development (interface-wise).</Typography>
            <Typography variant={'body1'}>To get started, open the admin page, login with your LDAP credentials (someone in the admin group), and create a new 'Wireguard Server'.  </Typography>
            <WGServerBlockInfo />

        </FullPageLayout>
    );

}

