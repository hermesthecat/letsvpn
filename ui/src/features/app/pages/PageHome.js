import React, {useEffect} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import FullPageLayout from "components/FullPageLayout";


const useStyles = makeStyles(theme => ({

}));

export default function PageHome() {
    const classes = useStyles();

    useEffect(() => {
    }, []);

    return (
        <FullPageLayout
            header={'Boilerplate Homepage'}
            title={'Home'}
        >
            <Typography variant={'body1'}>This is the homepage for your letsvpn app.  You can add more self contained pages under pages.</Typography>

        </FullPageLayout>
    );

}

