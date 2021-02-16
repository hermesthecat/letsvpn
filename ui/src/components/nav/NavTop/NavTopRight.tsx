import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
//import {useAuth} from "../components/AuthProvider";
//import copy from 'copy-to-clipboard';
import Tooltip from "@material-ui/core/Tooltip";
//import {useToasts} from "react-toast-notifications";


const useStyles = makeStyles(theme => ({
    root: {},
    avatar: {
        width: 40,
        height: 'auto',
        borderRadius: '50%',
    },
}));


export default function NavTopRight() {
    const classes = useStyles();

    //const { isAuthenticated, user, localToken } = useAuth();
    const user = null;
    //const { addToast } = useToasts();

    return (
        <Box className={classes.root}>
            <div>Avatar</div>
        </Box>
    );
}