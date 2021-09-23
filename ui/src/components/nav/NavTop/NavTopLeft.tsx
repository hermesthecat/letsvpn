import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import {connect} from "react-redux";
import { toggleDrawer } from "../../../features/app/appSlice";

const useStyles = makeStyles(theme => ({
    root: {},
    navLink: {
        color: '#fff',
        textDecoration: 'none',
    },
    menuContent: {
        padding: 0,
    },
    menuContentBox: {
        padding: theme.spacing(2),
        minWidth: 600,
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    description: {
        paddingTop: theme.spacing(4),
    },
    hidden: {
        display: 'none',
    }
}));


function NavTopLeft(props: any) {
    const classes = useStyles();

    const { toggleDrawer } = props;

    return (
        <Box>
            <IconButton onClick={toggleDrawer} size="large">
                <MenuIcon />
            </IconButton>
        </Box>
    );
}

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = {
    toggleDrawer,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavTopLeft)
