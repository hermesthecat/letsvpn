import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import FullPageLayout from "components/FullPageLayout";
import WGServerBlockInfo from "./WGServerBlockInfo";


export default function PageHome() {

    useEffect(() => {
    }, []);

    return (
        <FullPageLayout
            header={'LetsVPN'}
            title={'Dashboard'}
        >
            <Typography variant={'body1'}>Welcome to LetsVPN.  We will go through a quick setup process to let you start using this service.</Typography>
            <WGServerBlockInfo />

        </FullPageLayout>
    );

}

